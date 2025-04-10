import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Tags from "../components/Tags";
import { fetchWithAuth } from "../api/Account";
import ErrorPop from "../components/ErrorPop";

const Add = () => {

    const [isErrorOpen, setErrorIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})

    const handleAddOutfit = () => {
        const outfit_name = document.getElementById("outfit-name").value
        const imageData = document.getElementById("outfit-image").value
        fetchWithAuth("/api/fit/", {method:"POST", body:JSON.stringify({
            name: outfit_name,
            image_url: imageData,
            tag_ids:[16],
            clothing_ids: [1],
            accessory_ids: [],
            user_id: 1
        })})
        .then(async (res)=> {
            const data = await res.json()

            setErrorMessage({message:JSON.stringify(data), title:"Info"})
            setErrorIsOpen(true)
        })
    }

    return (
        <div class="bg-backgroundColor h-screen">
            <div class="h-full w-full flex items-center justify-center absolute">
                <div class="relative">
                    <img alt="preview" id="img" class="limit-img rounded-md" src={require("../assets/placeholder.png")}></img>
                    <div class="w-full flex justify-center"><h2 class="font-w-light text-sm">Optimal image size is 1024x1024 (px)</h2></div>
                </div>

                <div class="pl-6">
                    <h1 class="font-w-title text-2xl mb-2">Lets add your outfit!</h1>
                    <input id="outfit-name" class="font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="You'r outfits name."></input>
                    <input  onChange={() => document.getElementById("img").src = document.getElementById("outfit-image").value} id="outfit-image" class="mt-4 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="You'r outfits image url."></input>
                    <h2 class="font-w-medium mt-4 -mb-3">Choose Tags that fit this outfit</h2>
                    <div class="">
                        <Tags></Tags>
                    </div>
                    <button onClick={() => handleAddOutfit()} class="bg-TagsBackground rounded-md w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"><h2 class="font-w-medium">Continue</h2></button>
                </div>
            </div>
            <img alt="" class="absolute input-pass" src={require('../assets/deco.png')}></img>
            <img alt="" class="absolute bottom-0 right-0 input-pass" src={require('../assets/deco_1.png')}></img>
            <div class="navbar-gradient">{/* Gradient Decoration */}</div>
            <div class="w-full absolute">
                <Navbar></Navbar>
            </div>

            {isErrorOpen && (
                <ErrorPop message={errorMessage} setIsOpen={setErrorIsOpen}></ErrorPop>
            )}
        </div>
    )
}

export default Add;