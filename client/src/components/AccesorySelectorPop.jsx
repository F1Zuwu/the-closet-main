import React, {useEffect} from "react";
import gsap from "gsap";
import { fetchWithAuth } from "../api/Account";
const AccessorySlectorPop = ({setIsAccessorySelectorOpen, setSelectedAccessoryIds}) => {
    useEffect(() => {
        gsap.to(".bg-pop", {backgroundColor:"#000000", opacity:0.2})

        gsap.fromTo(".bg-pop-container", {opacity:0, scale:1.1, translateY:50}, {opacity:1, scale:1.0, translateY:0})

        fetchWithAuth("/api/")
    }, [])

    const handleClose = () => {
        gsap.to(".bg-pop", {backgroundColor:"#000000", opacity:0})
        gsap.to(".bg-pop-container", {opacity:0, scale:1.1, translateY:50})
        setTimeout(() => {
            setIsAccessorySelectorOpen(false)
        }, 350);
       
    }
    return(
        <div class=" absolute top-0 h-screen w-screen flex items-center justify-center">
            <div class="bg-pop w-screen h-screen absolute top-0">{}</div>
            <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 border-black opacity-0 min-w-96">
                <h1 class="text-center font-w-title">Accessories selector</h1>
                <p class="text-center font-w-light">Add or select Accessories that are used in this outfit</p>
                <div class="bg-TagsBackground mb-2 mt-2 rounded-md">
                  <input placeholder="Clothing name" class="w-full bg-transparent text-text-primary outline-none text-center h-8 rounded-t-md"></input>
                  <input placeholder="image url" class="w-full bg-transparent text-text-primary outline-none text-center h-8 rounded-t-md"></input>
                  <button class="bg-black rounded-b-lg w-full flex justify-center bg-opacity-10 items-center text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5">Add!</button>
                </div>
                <div class="w-full bg-TagsBackground rounded-md">

                    <h1 class="text-center py-12">Loading...</h1>

                </div>
                <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleClose()}>Done!</button>
            </div>
            
        </div>
    )
}

export default AccessorySlectorPop;