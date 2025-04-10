import React, { useState } from "react";
import { fetchWithAuth } from "../api/Account";

const TagsData = [
    { "name": "Casual" }, { "name": "Formal" }, { "name": "Alternative" }, { "name": "Kristelle" }
]

const Tags = ({ setIsTagWindowOpen }) => {

    const [tags, setTags] = useState([])

    window.addEventListener("DOMContentLoaded", () => {
        fetchWithAuth("/api/tag/getall").then(async (res) => {
            const data = await res.json()
            console.log(data)
            setTags(data.tags)
        })
    })

    return (
        <div class="flex items-center mt-4">
            {tags.map((val, index) => {
                return (
                    <div class="flex tag-container">
                        <button class="tag-container-select bg-TagsBackground rounded-md min-w-28 flex justify-center items-center ml-3 text-UnSelPrimary hover:text-primary" key={index}>
                            {val.tag_name}
                        </button>
                        <button class="tag-container-remove bg-TagsBackground rounded-md w-8 flex justify-center items-center -ml-2 text-UnSelPrimary hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px">    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" /></svg></button>
                    </div>
                )
            })}
            {tags.length === 0 && (
                <h1 class="items-center font-w-light">Add your first tag</h1>
            )}
            <button onClick={() => setIsTagWindowOpen(true)} class="bg-TagsBackground rounded-md w-6 flex justify-center items-center ml-4 text-UnSelPrimary hover:text-primary"><h1 class="font-w-title">+</h1></button>
        </div>
    )
}

export default Tags;