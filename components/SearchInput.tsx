'use client'

import { useDebounce } from "@/hooks/useDebounce"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { ChangeEventHandler, useEffect, useState } from "react"
import { Input } from "./ui/input"

const SearchInput = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const cetegoryId = searchParams.get("cetegoryId");
    const name = searchParams.get("name")

    const [value, setValue] = useState(name || "")
    const debounceValue = useDebounce<string>(value, 500)

    const onChange: ChangeEventHandler<HTMLInputElement> = (e)=>{
        setValue(e.target.value)
    }

    useEffect(()=>{
        const query = {
            name: debounceValue,
            cetegoryId: cetegoryId
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, {skipEmptyString: true, skipNull: true})

        router.push(url)
    },[cetegoryId, debounceValue, router])

  return (
    <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-muted-foreground" />
        <Input
            placeholder="Search..."
            className="pl-10 bg-primary/10"
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export default SearchInput