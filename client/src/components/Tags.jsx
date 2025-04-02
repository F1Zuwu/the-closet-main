import React from "react";

const TagsData = [
    {"name": "Casual"},{"name": "Formal"},{"name": "Alternative"},{"name": "Kristelle"}
]

const Tags = () => {
    return(
        <div class="flex">
            {TagsData.map((val, index) => {
                return(
                    <button class="bg-TagsBackground rounded-md min-w-28 flex justify-center items-center ml-3 mt-4 text-UnSelPrimary hover:text-primary" key={index}>{val.name}</button>
                )
            })}
        </div>
    )
}

export default Tags;