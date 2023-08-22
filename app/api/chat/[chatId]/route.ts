import { LangChainStream, StreamingTextResponse } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rateLimit";
import { getServerSession } from "next-auth";

export async function POST(
  req: Request,
  {params}:  { params: { chatId: string } } 
) {
    try {
      console.log("first"  , params.chatId)

        const {prompt} = await req.json()
        const session = await getServerSession(authOptions)

        if(!session?.user){
            return new NextResponse("Unauthorize", {status: 401})
        }

        const indentifier = req.url + "-" + session?.user.id
        const {success} = await rateLimit(indentifier)

        if(!success){
            return new NextResponse("Rate limit exceeded", {status: 429})
        }

        const celebrity = await db.celebrity.update({
            where:{
                id: params.chatId,
            },
            data:{
                messages: {
                    create:{
                        content: prompt,
                        role: "user",
                        userId: session.user.id
                        
                    }
                }
            }
        })

        if(!celebrity){
            return new NextResponse("Celebrity not found", {status: 404})
        }

        const name = celebrity.id
        const celebrity_file_Name = name + ".txt"

        const celebrityKey = {
            celebrityName: name,
            userId: session.user.id,
            modelName: "llama2-13b"
        }

        const memoryManager = await MemoryManager.getInstance()
        const recods = await memoryManager.redisLatestHistory(celebrityKey)

        if(recods.length === 0){
            await memoryManager.seedHistory(celebrity.seed, "\n\n", celebrityKey)
        }

        await memoryManager.writeToHistroy("User: " + prompt + "\n\n", celebrityKey)
        const recentChatHistory = await memoryManager.redisLatestHistory(celebrityKey)

        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            celebrity_file_Name,
        )

        let releventHistory = ""

        if(!!similarDocs && similarDocs.length !== 0){
            releventHistory = similarDocs.map((doc)=> doc.pageContent).join("\n")
        }

        const { handlers } = LangChainStream();
    // Call Replicate for inference
    const model = new Replicate({
      model:
        "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    // Turn verbose on for debugging
    model.verbose = true;

    const resp = String(
      await model
        .call(
          `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${celebrity.name}: prefix. 

        ${celebrity.instruction}

        Below are relevant details about ${celebrity.name}'s past and the conversation you are in.
        ${releventHistory}


        ${recentChatHistory}\n${celebrity.name}:`
        )
        .catch(console.error)
    );

    const cleaned = resp.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0];

    await memoryManager.writeToHistroy("" + response.trim(), celebrityKey);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);
    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistroy("" + response.trim(), celebrityKey);
      await db.celebrity.update({
        where: {
          id: params.chatId
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: "system",
              userId: session.user.id,
            },
          },
        }
      });
    }

    return new StreamingTextResponse(s);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}
