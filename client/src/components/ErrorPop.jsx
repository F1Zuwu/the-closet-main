import React, { useEffect } from "react";
import gsap from "gsap";

const ErrorPop = ({setIsOpen, message}) => {

    useEffect(() => {
        gsap.to(".bg-pop", {backgroundColor:"#000000", opacity:0.2})

        gsap.fromTo(".bg-pop-container", {opacity:0, scale:1.1, translateY:50}, {opacity:1, scale:1.0, translateY:0})
    }, [])

    const handleClose = () => {
        gsap.to(".bg-pop", {backgroundColor:"#000000", opacity:0})
        gsap.to(".bg-pop-container", {opacity:0, scale:1.1, translateY:50})

        setTimeout(() => {
            setIsOpen(false)
            if(message.reloadNeeded) {
                window.location.reload()
            }
        }, 300);

        
    }
    

    return(
        <div class=" absolute top-0 h-screen w-screen flex items-center justify-center">
            <div class="bg-pop w-screen h-screen absolute top-0">{}</div>
            <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 border-black opacity-0 min-w-96">
                <h1 class="text-center font-w-title">{message.title}</h1>
                <p class="text-center font-w-light">{message.message}</p>
                <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleClose()}>Close</button>
            </div>
            
        </div>
    )
}

export default ErrorPop;