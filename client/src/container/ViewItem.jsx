import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../api/Account";
import SharePop from "../components/SharePop";

const ViewItem = () => {
    const [isShareOpen, setShareOpen] = useState(false)
    const { id } = useParams()
    const [data, setData] = useState({})
    const [tags, setTags] = useState([])
    window.addEventListener("DOMContentLoaded", () => {
        fetchWithAuth("/api/fit/" + id)
            .then(async (res) => {
                const data = await res.json()
                setData(data.fit)
                setTags(data.fit.tags)
            })
    })

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
                        <img alt="preview" id="img" class="limit-img rounded-md" src={data.image_url}></img>
                        <div class="absolute -bottom-16 left-0">
                        <div class="flex">
                            <h1 class="font-w-title text-2xl">{data.name}</h1>
                            <button onClick={()=> setShareOpen(true)} class="bg-TagsBackground rounded-md flex justify-center items-center ml-3 pl-1.5 pr-1.5 text-UnSelPrimary hover:text-primary" title="Share this outfit!"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
<path d="M19 22H5c-1.654 0-3-1.346-3-3V8h2v11c0 .552.449 1 1 1h14c.552 0 1-.448 1-1v-2h2v2C22 20.654 20.654 22 19 22zM16.707 11.707L15.293 10.293 18.586 7 15.293 3.707 16.707 2.293 21.414 7z"></path><path d="M8,18H6v-1c0-6.065,4.935-11,11-11h3v2h-3c-4.963,0-9,4.037-9,9V18z"></path>
</svg></button>
                            </div>
                            <div class="-ml-3 mt-2">
                            {tags.map((val, index) => {
                                return (
                                    <div class="flex ">
                                        <button class=" bg-TagsBackground rounded-md min-w-28 flex justify-center items-center ml-3 text-UnSelPrimary hover:text-primary" key={index}>
                                            {val.tag_name}
                                        </button>
                                    </div>
                                )
                            })}
                            </div>
                            {tags.length === 0 && (
                                <h1 class="items-center font-w-light">This outfit has no tags</h1>
                            )}
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
            {isShareOpen && (
                <SharePop setIsOpen={setShareOpen}></SharePop>
            )}
        </div>
    )
}

export default ViewItem;