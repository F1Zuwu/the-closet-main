import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div class="bg-backgroundColor h-screen">
            <img alt="" class="input-pass absolute" src={require('../assets/deco.png')}></img>
            <img alt="" class="input-pass absolute bottom-0 right-0" src={require('../assets/deco_1.png')}></img>
            <div class="navbar-gradient">{/* Gradient Decoration */}</div>
            <div class="w-screen h-screen flex items-center justify-center">
                <div>
                    <h1 class="text-center font-w-title text-2xl">Not Found!</h1>
                    <p>The page that you are looking for does not exist.</p>
                    <button onClick={() => navigate("/")} class="bg-TagsBackground rounded-md w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"><h1>Homepage</h1></button>
                </div>
            </div>
            <div class="w-full absolute top-0">
                <Navbar></Navbar>
            </div>
        </div>
    )
}

export default NotFound;