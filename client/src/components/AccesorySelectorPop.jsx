import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { fetchWithAuth } from "../api/Account";
const AccessorySlectorPop = ({ setIsAccessorySelectorOpen, setSelectedAccessoryIds, selectedAccessoryid }) => {
    const [accesoryData, setAccesoryData] = useState([])
    const [selectedAccesoryIds, setSelectedAccesoryId] = useState([])

    useEffect(() => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0.2 })

        gsap.fromTo(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 }, { opacity: 1, scale: 1.0, translateY: 0 })

        fetchWithAuth("/api/accessory/getAll").then(async (res) => {
            const data = await res.json()
            if (data.accessory.length === 0) {
                document.getElementById("loader").innerHTML = "No accessory components found."
            } else {
                setAccesoryData(data.accessory)
                if (selectedAccessoryid.length !== 0) {
                    setSelectedAccesoryId(selectedAccessoryid)
                }
                document.getElementById("loader").style.display = "none"
            }
        })
    }, [])

    const toggleTag = (tag_id) => {
        setSelectedAccessoryIds(prev =>
            prev.includes(tag_id) ? prev.filter(id => id !== tag_id) : [...prev, tag_id]
        );
        setSelectedAccesoryId(prev =>
            prev.includes(tag_id) ? prev.filter(id => id !== tag_id) : [...prev, tag_id]
        );
    };

    const addAccessory = () => {
        const name = document.getElementById("accessory-name-input").value
        const img_url = document.getElementById("accessory-img-input").value

        fetchWithAuth("/api/accessory", { "method": "POST", body: JSON.stringify({ "name": name, "image_url": img_url }) })
            .then(async (res) => {
                const data = await res.json()
                if (data.success) {
                    fetchWithAuth("/api/accessory/getAll").then(async (res) => {
                        const data = await res.json()
                        document.getElementById("accessory-name-input").value = ""
                        document.getElementById("accessory-img-input").value = ""
                        if (data.accessory.length === 0) {
                            document.getElementById("loader").innerHTML = "No accessory components found."
                        } else {
                            setAccesoryData(data.accessory)
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
            setIsAccessorySelectorOpen(false)
        }, 350);

    }

    const deleteAcessory = (id) => {
        fetchWithAuth("/api/accessory", { "method": "DELETE", body: JSON.stringify({ "accessory_id": id }) })
            .then(async (res) => {
                const data = await res.json()
                if (data.success) {
                    fetchWithAuth("/api/accessory/getAll").then(async (res) => {
                        const data = await res.json()
                        console.log(data)
                        setAccesoryData(data.accessory)
                    })
                } else {
                    alert(data.message)
                }
            })
    }
    return (
        <div class=" absolute top-0 h-screen w-screen flex items-center justify-center">
            <div class="bg-pop w-screen h-screen absolute top-0">{ }</div>
            <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 shadow-lg opacity-0 min-w-96">
                <h1 class="text-center font-w-title">Accessories selector</h1>
                <p class="text-center font-w-light">Add or select Accessories that are used in this outfit</p>
                <div class="bg-TagsBackground mb-2 mt-2 rounded-md">
                    <input id="accessory-name-input" placeholder="Accessory name" class="w-full bg-transparent text-text-primary outline-none text-center h-8 rounded-t-md"></input>
                    <input id="accessory-img-input" placeholder="image url" class="w-full bg-transparent text-text-primary outline-none text-center h-8 rounded-t-md"></input>
                    <button onClick={() => addAccessory()} class="bg-black rounded-b-lg w-full flex justify-center bg-opacity-10 items-center text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5">Add!</button>
                </div>
                <div class="w-full bg-TagsBackground rounded-md p-4 overflow-y-scroll h-96">

                    {accesoryData.map((value, key) => {
                        const isSelected = selectedAccesoryIds.includes(value.accessory_id);
                        return (
                            <div class="flex items-center w-full">
                                <div key={key} onClick={() => toggleTag(value.accessory_id)} className={`w-full relative flex h-12 items-center mb-2 rounded-md hover:bg-backgroundColor duration-100 cursor-pointer ${isSelected ? 'bg-primary border-t-2 border-r-2 border-b-2 border-black bg-backgroundColor' : ''}`}>
                                    <img class="w-12 h-12 rounded-md" src={value.image_url}></img>
                                    <h1 class="font-w-title pl-1.5">{value.name}</h1>
                                </div>
                                <button class="-mt-1.5 hover:bg-rose-500 rounded-md h-12 w-12 duration-200 flex justify-center items-center" onClick={() => deleteAcessory(value.accessory_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" /></svg>
                                </button>

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

export default AccessorySlectorPop;