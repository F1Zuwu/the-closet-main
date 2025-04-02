import React from "react";
import Navbar from "../components/Navbar";
import Tags from "../components/Tags";

const Add = () => {

    const handleImageUpload = () => {
        const file = document.getElementById("fileUploadInput").files[0];
        const img = document.getElementById("img")
        if (file) {
            // Create a FileReader object
            const reader = new FileReader();

            // Set up a function to run when the file is loaded
            reader.onload = function (e) {
                // Set the src of the image to the file's data URL
                img.src = e.target.result;
            };

            // Read the file as a Data URL (this will trigger the onload function)
            reader.readAsDataURL(file);
        }
        document.getElementById("add-img-txt").style.display = "none"
    }

    return (
        <div class="bg-backgroundColor h-screen">
            <div class="h-full w-full flex items-center justify-center absolute">
                <input accept=".jpg,.png,.jpeg" onChange={() => handleImageUpload()} id="fileUploadInput" class="hidden" type="file"></input>
                <div class="relative cursor-pointer" onClick={() => { document.getElementById("fileUploadInput").click() }}>
                    <img alt="preview" id="img" class="limit-img rounded-md" src={require("../assets/placeholder.png")}></img>
                    <div class="absolute w-full h-full flex justify-center items-center top-0">
                        <div id="add-img-txt">
                            <div class="w-full flex justify-center">
                                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35 3V67" stroke="black" stroke-width="6" stroke-linecap="round" />
                                    <path d="M67 35L3 35" stroke="black" stroke-width="6" stroke-linecap="round" />
                                </svg>
                            </div>
                            <h1 class="font-w-medium mt-1.5">Click to add a photo</h1>
                        </div>
                    </div>
                    <div class="w-full flex justify-center"><h2 class="font-w-light text-sm">Optimal image size is 1024x1024 (px)</h2></div>
                </div>

                <div class="pl-6">
                    <h1 class="font-w-title text-2xl mb-2">Lets add your outfit!</h1>
                    <input class="font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="You'r outfits name."></input>
                    <h2 class="font-w-medium mt-4 -mb-3">Choose Tags that fit this outfit</h2>
                    <div class="-ml-3">
                        <Tags></Tags>
                    </div>
                    <button class="bg-TagsBackground rounded-md w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"><h2 class="font-w-medium">Continue</h2></button>
                </div>
            </div>
            <img alt="" class="absolute" src={require('../assets/deco.png')}></img>
            <img alt="" class="absolute bottom-0 right-0" src={require('../assets/deco_1.png')}></img>
            <div class="navbar-gradient">{/* Gradient Decoration */}</div>
            <div class="w-full absolute">
                <Navbar></Navbar>
            </div>
        </div>
    )
}

export default Add;