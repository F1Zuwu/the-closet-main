import React from "react";

const Footer = () => {
    return (
        <div class="bg-FooterColor w-full h-36 flex relative">
            <div class="pt-8 pl-8">
                <div class="flex items-center">
                    <svg width="26" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8 25.4384L2 31V2H14.8M14.8 25.4384L24 31V2H14.8M14.8 25.4384V2" stroke="#352F2C" stroke-width="3" />
                    </svg>
                    <h1 class="font-w-title ml-2 text-primary">The Closet</h1>

                </div>
                <h1 class="mt-0.5">Raimo Kivi & Kirstelle Tasane 💖</h1>
                <h1 class="mt-0.5">ITA23</h1>
            </div>
            <div class="absolute w-full  justify-center flex pt-12">
                <div class="">
                    <h1 class="font-w-title">Help</h1>
                    <a class="underline font-w-light" href="">Documentation</a>
                    <div>
                        <a class="underline font-w-light" href="">Feedback</a>
                    </div>
                </div>
                <div class="ml-12">
                    <h1 class="font-w-title">Links</h1>
                    <a class="underline font-w-light" href="https://icons8.com">Icons8</a>
                </div>

            </div>
            <button onClick={() => window.scrollTo(0, 0)} title="Back on top" class="bg-btnOnTagsBg rounded-md h-12 w-12 absolute right-8 top-8 flex items-center justify-center">
                <img class="h-8 w-8" src={require("../assets/icons8-arrow-up-48.png")}></img>
            </button>
        </div>
    )

}

export default Footer;