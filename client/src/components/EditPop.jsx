import React, { useEffect } from "react";
import gsap from "gsap";
import { fetchWithAuth } from "../api/Account";
const EditPop = ({ setIsEditOpen, editType, defaultValues }) => {

    useEffect(() => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0.2 })
        gsap.fromTo(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 }, { opacity: 1, scale: 1.0, translateY: 0 })
    }, [])

    const handleClose = () => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0 })
        gsap.to(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 })
        setTimeout(() => {
            setIsEditOpen(false)
        }, 300);
    }
    if (editType === 0) {
        const handleEdit = () => {
            const name = document.getElementById("edit-input-name").value
            const image_url = document.getElementById("edit-input-image").value
            fetchWithAuth("/api/fit", { method: "PUT", body: JSON.stringify({ fit_id: defaultValues.id, name: name, image_url: image_url }) })
                .then(async (res) => {
                    const data = await res.json()
                    if (data.success) { window.location.reload() } else { alert(data.message) }
                })
        }
        return (
            <div class="absolute top-0 h-screen w-screen flex items-center justify-center">
                <div class="bg-pop w-screen h-screen absolute top-0">{ }</div>
                <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 border-black opacity-0 min-w-96">
                    <h1 class="text-center font-w-title">Edit outfit</h1>
                    <input id="edit-input-name" defaultValue={defaultValues.name} placeholder="Outfit name" class="mt-4 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full"></input>
                    <input id="edit-input-image" defaultValue={defaultValues.image_url} placeholder="Outfit image url" class="mt-4 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full"></input>
                    <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleEdit()}>Edit</button>
                    <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-2 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleClose()}>Cancel</button>
                </div>
            </div>
        )
    } else if (editType === 1) {
        const handleEdit = () => {
            const name = document.getElementById("edit-input-name").value
            const image_url = document.getElementById("edit-input-image").value
            fetchWithAuth("/api/clothing", { method: "PUT", body: JSON.stringify({ clothing_id: defaultValues.id, name: name, image_url: image_url }) })
                .then(async (res) => {
                    const data = await res.json()
                    if (data.success) { window.location.reload() } else { alert(data.message) }
                })
        }
        return (
            <div class="absolute top-0 h-screen w-screen flex items-center justify-center">
                <div class="bg-pop w-screen h-screen absolute top-0">{ }</div>
                <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 border-black opacity-0 min-w-96">
                    <h1 class="text-center font-w-title">Edit clothing</h1>
                    <input id="edit-input-name" defaultValue={defaultValues.name} placeholder="Outfit name" class="mt-4 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full"></input>
                    <input id="edit-input-image" defaultValue={defaultValues.image_url} placeholder="Outfit image url" class="mt-4 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full"></input>
                    <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleEdit()}>Edit</button>
                    <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-2 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleClose()}>Cancel</button>
                </div>
            </div>
        )
    } else if (editType === 2) {
        const handleEdit = () => {
            const name = document.getElementById("edit-input-name").value
            const image_url = document.getElementById("edit-input-image").value
            fetchWithAuth("/api/accessory", { method: "PUT", body: JSON.stringify({ accessory_id: defaultValues.id, name: name, image_url: image_url }) })
                .then(async (res) => {
                    const data = await res.json()
                    if (data.success) { window.location.reload() } else { alert(data.message) }
                })
        }
        return (
            <div class="absolute top-0 h-screen w-screen flex items-center justify-center">
                <div class="bg-pop w-screen h-screen absolute top-0">{ }</div>
                <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 border-black opacity-0 min-w-96">
                    <h1 class="text-center font-w-title">Edit accessory</h1>
                    <input id="edit-input-name" defaultValue={defaultValues.name} placeholder="Outfit name" class="mt-4 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full"></input>
                    <input id="edit-input-image" defaultValue={defaultValues.image_url} placeholder="Outfit image url" class="mt-4 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full"></input>
                    <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleEdit()}>Edit</button>
                    <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-2 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleClose()}>Cancel</button>
                </div>
            </div>
        )
    } else throw new Error("EditPop | editType is missing or invalid");

}

export default EditPop;