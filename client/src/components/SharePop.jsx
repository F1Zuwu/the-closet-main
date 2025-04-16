import React, { useEffect } from "react";
import gsap from "gsap";
const SharePop = ({ setIsOpen }) => {
    useEffect(() => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0.2 })

        gsap.fromTo(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 }, { opacity: 1, scale: 1.0, translateY: 0 })

        navigator.permissions.query({ name: "clipboard-write" })
            .then(({ state }) => {
                console.log(`permission response: ${state}`);
                if (state === "granted") {
                    const data = [new ClipboardItem({ "text/plain": new Blob([
                        `${JSON.parse(localStorage.getItem("auth")).username} shared his outfit with you\nCheck it out here: ⭐ ${window.location.href} ⭐`
                    ], { type: "text/plain" }) })];
                    navigator.clipboard.write(data).then(
                        () => {
                            console.log("Clipboard write succeeded");
                        },
                        () => {
                            console.error("Clipboard write failed");
                        }
                    );
                }
            });
    }, [])

    const handleClose = () => {
        gsap.to(".bg-pop", { backgroundColor: "#000000", opacity: 0 })
        gsap.to(".bg-pop-container", { opacity: 0, scale: 1.1, translateY: 50 })

        setTimeout(() => {
            setIsOpen(false)
        }, 300);
    }
    return (
        <div class=" absolute top-0 h-screen w-screen flex items-center justify-center">
            <div class="bg-pop w-screen h-screen absolute top-0">{ }</div>
            <div class="bg-pop-container absolute bg-backgroundColor rounded-md p-6 border-black opacity-0 min-w-96">
                <h1 class="text-center font-w-title">Share this outfit!</h1>
                <p class="text-center font-w-light bg-TagsBackground rounded-md mt-1.5">{window.location.href}</p>
                <p class="text-center mt-1.5 -mb-1.5">Link copied to clipboard.</p>
                <button class="bg-TagsBackground rounded-lg w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5" onClick={() => handleClose()}>Close</button>
            </div>

        </div>
    )
}

export default SharePop;