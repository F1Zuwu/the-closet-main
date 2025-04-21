import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { fetchWithAuth } from "../api/Account";

const ClothingSlectorPop = ({ setIsClothingSelectorOpen, setSelectedClothingIds }) => {
    const [clothingData, setClothingData] = useState([])
    useEffect(() => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0.2 })

        gsap.fromTo(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 }, { opacity: 1, scale: 1.0, translateY: 0 })

        fetchWithAuth("/api/clothing/getAll").then(async (res) => {
            const data = await res.json()
            if (data.clothing.length === 0) {
                document.getElementById("loader").innerHTML = "No clothing components found."
            } else {
                setClothingData(data.clothing)
                document.getElementById("loader").style.display = "none"
            }
        })
    }, [])

    const addClothing = () => {
        const name = document.getElementById("clothing-name-input").value
        const img_url = document.getElementById("clothing-img-input").value

        fetchWithAuth("/api/clothing", { "method": "POST", body: JSON.stringify({ "name": name, "image_url": img_url }) })
            .then(async (res) => {
                const data = await res.json()
                if (data.success) {
                    fetchWithAuth("/api/clothing/getAll").then(async (res) => {
                        const data = await res.json()
                        if (data.clothing.length === 0) {
                            document.getElementById("loader").innerHTML = "No clothing components found."
                        } else {
                            setClothingData(data.clothing)
                            document.getElementById("loader").style.display = "none"
                        }
                    })
                }
            })
    }

    const handleClose = () => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0 })
        gsap.to(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 })
        setTimeout(() => {
            setIsClothingSelectorOpen(false)
        }, 350);

    }
    return (
        <div class=" absolute top-0 h-screen w-screen flex items-center justify-center">
            <div class="bg-pop w-screen h-screen absolute top-0">{ }</div>
            <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 border-black opacity-0 min-w-96">
                <h1 class="text-center font-w-title">Clothing selector</h1>
                <p class="text-center font-w-light">Add or select clothing pices that are used in this outfit</p>
                <div class="bg-TagsBackground mb-2 mt-2 rounded-md">
                    <input id="clothing-name-input" placeholder="Clothing name" class="w-full bg-transparent text-text-primary outline-none text-center h-8 rounded-t-md"></input>
                    <input id="clothing-img-input" placeholder="image url" class="w-full bg-transparent text-text-primary outline-none text-center h-8 rounded-t-md"></input>
                    <button onClick={() => addClothing()} class="bg-black rounded-b-lg w-full flex justify-center bg-opacity-10 items-center text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5">Add!</button>
                </div>
                <div class="w-full bg-TagsBackground rounded-md p-4">
                    {clothingData.map((value, key) => {
                        return (
                            <div class="flex h-12 items-center mb-2 hover:bg-footerBackground">
                                <img class="w-12 h-12 rounded-md" src={value.image_url}></img>
                                <h1 class="font-w-title pl-1.5">{value.name}</h1>
                            </div>
                        )
                    })}
                    <h1 id="loader" class="text-center py-12">Loading...</h1>



                </div>
                <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleClose()}>Done!</button>
            </div>

        </div>
    )
}

export default ClothingSlectorPop;