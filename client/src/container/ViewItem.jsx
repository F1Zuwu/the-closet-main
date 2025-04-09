import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ViewItem = () => {
    const { id } = useParams()
    return (
        <div>
            <img alt="" class="input-pass absolute" src={require('../assets/deco.png')}></img>
            <img alt="" class="input-pass absolute bottom-0 right-0" src={require('../assets/deco_1.png')}></img>
            <div class="input-pass navbar-gradient">{/* Gradient Decoration */}</div>
            <div class="w-full absolute">
                <Navbar></Navbar>
            </div>

            <div class="flex items-center h-screen pl-32">
                <div class="h-1/3 flex">
                <div class="relative flex items-center justify-center">
                    <img alt="preview" id="img" class="limit-img rounded-md" src={require("../assets/placeholder.png")}></img>
                    <div class="absolute -bottom-5 left-0">
                    <h1 class="font-w-title text-2xl">{id}</h1>
                    </div>
                </div>
                <div class="bg-TagsBackground rounded-md flex items-center pl-8 pr-8 ml-8 mr-8">
                    <h1>No clothing components added.</h1>
                </div>
                <div class="bg-TagsBackground rounded-md flex items-center pl-8 pr-8">
                    <h1>No jewlery components added.</h1>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ViewItem;