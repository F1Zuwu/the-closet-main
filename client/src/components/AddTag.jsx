import React, { useEffect } from "react";
import gsap from "gsap";
import { fetchWithAuth } from "../api/Account";
const AddTag = ({ setIsTagWindowOpen }) => {

    useEffect(() => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0.2 })

        gsap.fromTo(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 }, { opacity: 1, scale: 1.0, translateY: 0 })

        const input = document.getElementById("tag-name-input")
        input.focus()
        input.addEventListener("keydown", (e) => {
            console.log(e.key)
            if (e.key === "Enter") {
                handleAddTag()
            }
        })
    }, [])

    const handleAddTag = () => {
        const input = document.getElementById("tag-name-input")
        fetchWithAuth("/api/tag/", { method: "POST", body: JSON.stringify({ "tag_name": input.value }) }).then(async (res) => {
            const data = await res.json()
            if (data.success) {
                gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0.0 })
                gsap.to(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 })
                setTimeout(() => {
                    window.location.reload()
                }, 300);
            } else {
                alert(data.message)
            }
        })
    }

    const HandleClose = () => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0.0 })
        gsap.to(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 })
        setTimeout(() => {
            setIsTagWindowOpen(false)
        }, 250);
    }

    return (
        <div class=" absolute top-0 h-screen w-screen flex items-center justify-center">
            <div class="bg-pop w-screen h-screen absolute top-0">{ }</div>
            <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 border-black opacity-0 min-w-96">
                <h1 class="text-center font-w-title">Add tag</h1>
                <p class="text-center font-w-light">Type your tag name to add</p>
                <input placeholder="My cool summer outfits." maxLength={50} id="tag-name-input" class="pl-1 rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"></input>
                <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleAddTag()}>Add</button>
                <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-2 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => HandleClose()}>Close</button>
            </div>

        </div>
    )
}

export default AddTag;