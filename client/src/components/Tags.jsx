import React, { useState } from "react";
import { fetchWithAuth } from "../api/Account";

const Tags = ({ setIsTagWindowOpen, setSelectedTagIds }) => {

    const [tags, setTags] = useState([])

    const [selectedTagIds, setSelectedTagId] = useState([])

    const toggleTag = (tag_id) => {
        setSelectedTagIds(prev =>
            prev.includes(tag_id) ? prev.filter(id => id !== tag_id) : [...prev, tag_id]
        );
        setSelectedTagId(prev =>
            prev.includes(tag_id) ? prev.filter(id => id !== tag_id) : [...prev, tag_id]
        );
    };

    window.addEventListener("DOMContentLoaded", () => {
        fetchWithAuth("/api/tag/getall").then(async (res) => {
            const data = await res.json()
            if (data.success) {
                setTags(Array.isArray(data.tags) ? data.tags : []);
            }
        })
    })

    const deleteTag = (id) => {
        console.log(id)
        fetchWithAuth("/api/tag", { method: "DELETE", body: JSON.stringify({ "tag_id": id }) }).then(async (res) => {
            const data = await res.json()
            if (data.success) {
                window.location.reload()
            } else {
                console.log("Server error occured")
            }

        })
    }

    return (
        <div class="flex items-center mt-4">
            {tags.map((val, index) => {
                const isSelected = selectedTagIds.includes(val.tag_id);
                return (
                    <div class="flex tag-container">
                        <button onClick={() => toggleTag(val.tag_id)} className={`tag-container-select rounded-md min-w-28 flex justify-center items-center 
    ${isSelected
                                ? 'bg-primary border-2 border-black'
                                : 'bg-TagsBackground text-UnSelPrimary hover:text-primary border border-transparent'}`} key={index}>
                            {val.tag_name}
                        </button>
                        <button onClick={() => deleteTag(val.tag_id)} title="Delete" className={`bg-TagsBackground rounded-md w-0 -ml-2 mr-3 flex justify-center items-center 
    ${isSelected
                                ? ''
                                : 'tag-container-remove'}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px">    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" /></svg></button>
                    </div>
                )
            })}
            {tags.length === 0 && (
                <h1 class="items-center font-w-light">Add your first tag</h1>
            )}
            <button onClick={() => setIsTagWindowOpen(true)} class="bg-TagsBackground rounded-md w-6 flex justify-center items-center ml-1 text-UnSelPrimary hover:text-primary"><h1 class="font-w-title">+</h1></button>

        </div>
    )
}

export default Tags;