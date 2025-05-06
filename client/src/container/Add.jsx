import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tags from "../components/Tags";
import { fetchWithAuth } from "../api/Account";
import ErrorPop from "../components/ErrorPop";
import AddTag from "../components/AddTag";
import gsap from "gsap";
import ClothingSlectorPop from "../components/ClothingSelectorPop";
import AccessorySlectorPop from "../components/AccesorySelectorPop";
import { useNavigate } from "react-router-dom";
const Add = () => {
    const navigate = useNavigate();

    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [isErrorOpen, setErrorIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
    const [isAddTagWindowOpen, setIsTagWindowOpen] = useState(false)

    const [isClothingSelectorOpen, setIsClothingSelectorOpen] = useState(false)
    const [isAccessorySelectorOpen, setIsAccessorySelectorOpen] = useState(false)
    const [selectedClothingIds, setSelectedClothingIds] = useState([])
    const [selectedAccessoryids, setSelectedAccessoryIds] = useState([])

    useEffect(() => {
        console.log("DEBUG SELECTED IDS:")
        console.log("tags", selectedTagIds)
        console.log("clothing", selectedClothingIds)
        console.log("accessory", selectedAccessoryids)
    }, [selectedTagIds, selectedAccessoryids, selectedClothingIds])

    const handleAddOutfit = () => {
        const outfit_name = document.getElementById("outfit-name").value
        const imageData = document.getElementById("outfit-image").value
        fetchWithAuth("/api/fit/", {
            method: "POST", body: JSON.stringify({
                name: outfit_name,
                image_url: imageData,
                tag_ids: selectedTagIds,
                clothing_ids: selectedClothingIds,
                accessory_ids: selectedAccessoryids
            })
        })
            .then(async (res) => {
                const data = await res.json()
                if (data.success) { navigate("/outfit/" + data.fit.fit_id) } else {
                    setErrorMessage({ message: data.message, title: "Error" })
                    setErrorIsOpen(true)
                }
            })
    }

    const openSlectorPanel = () => {
        gsap.to(".first-panel", { width: 0, opacity: 0 })
        gsap.to(".secound-panel", { width: "auto", opacity: 1 })
    }

    const openFirstPanel = () => {
        gsap.to(".first-panel", { width: "auto", opacity: 1 })
        gsap.to(".secound-panel", { width: "0", opacity: 0 })
    }


    return (
        <div class="bg-backgroundColor h-screen">
            <img alt="" class="absolute input-pass" src={require('../assets/deco.png')}></img>
            <img alt="" class="absolute bottom-0 right-0 input-pass" src={require('../assets/deco_1.png')}></img>
            <div class="navbar-gradient input-pass">{/* Gradient Decoration */}</div>

            <div class="h-full w-full flex items-center justify-center absolute">
                <div class="relative">
                    <img alt="preview" id="img" class="limit-img rounded-md" src={require("../assets/placeholder.png")}></img>
                </div>

                <div class="pl-6 first-panel">
                    <h1 class="font-w-title text-2xl mb-2">Lets add your outfit!</h1>
                    <input id="outfit-name" class="font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="You'r outfits name."></input>
                    <input onChange={() => document.getElementById("img").src = document.getElementById("outfit-image").value} id="outfit-image" class="mt-4 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="You'r outfits image url."></input>
                    <h2 class="font-w-medium mt-4 -mb-3">Choose Tags that fit this outfit</h2>
                    <div class="">
                        <Tags isAddTagWindowOpen={isAddTagWindowOpen} setIsTagWindowOpen={setIsTagWindowOpen} setSelectedTagIds={setSelectedTagIds}></Tags>
                    </div>
                    <button onClick={() => openSlectorPanel()} class="bg-TagsBackground rounded-md w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"><h2 class="font-w-medium">Continue</h2></button>
                </div>

                <div class="pl-6 secound-panel w-0 opacity-0">
                    <h1 class="cursor-pointer underline" onClick={() => openFirstPanel()}>{"< Back "}</h1>
                    <h1 class="font-w-title text-2xl mb-2">Select components for this outfit</h1>
                    <button onClick={() => setIsClothingSelectorOpen(true)} class="bg-TagsBackground rounded-md w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5 ">
                        {selectedClothingIds.length === 0 ? (
                            <h1>Click to open Clothing selector.</h1>
                        ) : (
                            <h1>{selectedClothingIds.length} Clothing items selected.</h1>
                        )
                        }
                    </button>
                    <button onClick={() => setIsAccessorySelectorOpen(true)} class="bg-TagsBackground rounded-md w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5">
                        {selectedAccessoryids.length === 0 ? (
                            <h1>Click to open Accessories selector.</h1>
                        ) : (
                            <h1>{selectedAccessoryids.length} Accessories selected.</h1>
                        )
                        }
                    </button>
                    <button onClick={() => handleAddOutfit()} class="bg-TagsBackground rounded-md w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"><h2 class="font-w-medium">Add outfit</h2></button>
                </div>
            </div>
            <div class="w-full absolute">
                <Navbar></Navbar>
            </div>

            {isErrorOpen && (
                <ErrorPop message={errorMessage} setIsOpen={setErrorIsOpen}></ErrorPop>
            )}
            {isClothingSelectorOpen && (
                <ClothingSlectorPop selectedClothingId={selectedClothingIds} setSelectedClothingIds={setSelectedClothingIds} setIsClothingSelectorOpen={setIsClothingSelectorOpen}></ClothingSlectorPop>
            )}
            {isAccessorySelectorOpen && (
                <AccessorySlectorPop selectedAccessoryid={selectedAccessoryids} setSelectedAccessoryIds={setSelectedAccessoryIds} setIsAccessorySelectorOpen={setIsAccessorySelectorOpen}></AccessorySlectorPop>
            )}
            {isAddTagWindowOpen && (
                <AddTag setIsTagWindowOpen={setIsTagWindowOpen}></AddTag>
            )}
        </div>
    )
}

export default Add;