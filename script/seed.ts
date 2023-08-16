const {PrismaClient} = require("@prisma/client")

const db = new PrismaClient()

async function main(){
    try {
        await db.cetegory.createMany({
            data:[
                {name: "Famous People"},
                {name: "Animals"},
                {name: "Movies & TV"},
                {name: "Musicians"},
                {name: "Games"},
                {name: "Philosophy"},
                {name: "Scientists"},
            ]
        })
    } catch (error) {
        console.error("error sedding default cetegory", error)
    }finally{
        await db.$disconnect()
    }
}

main()