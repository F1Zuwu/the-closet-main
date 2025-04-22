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
    const [clothing, setClothing] = useState([])
    const [accessory, setAccesory] = useState([])
    window.addEventListener("DOMContentLoaded", () => {
        fetchWithAuth("/api/fit/" + id)
            .then(async (res) => {
                const data = await res.json()
                if (data.success) {
                    setData(data.fit)
                    setTags(data.fit.tags)
                    setClothing(data.fit.clothings)
                    setAccesory(data.fit.accessories)
                } else {
                    window.location.href = "/notfound"
                }
            })
    })


    const deleteFit = () => {
        fetchWithAuth("/api/fit", { method: "DELETE", body: JSON.stringify({ "fit_id": data.fit_id }) })
            .then(async (res) => {
                const data = await res.json()
                if (data.success) {
                    window.location.href = "/"
                } else {
                    alert(data.error)
                }
            })
    }

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
                        <img alt="preview" id="img" class="rounded-md h-full" src={data.image_url}></img>
                        <div class="absolute -bottom-20 left-0">
                            <div class="flex">
                                <h1 class="font-w-title text-2xl">{data.name}</h1>
                                <button onClick={() => setShareOpen(true)} class="bg-TagsBackground rounded-md flex justify-center items-center ml-3 pl-1.5 pr-1.5 text-UnSelPrimary hover:text-primary" title="Share this outfit!"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                    <path d="M19 22H5c-1.654 0-3-1.346-3-3V8h2v11c0 .552.449 1 1 1h14c.552 0 1-.448 1-1v-2h2v2C22 20.654 20.654 22 19 22zM16.707 11.707L15.293 10.293 18.586 7 15.293 3.707 16.707 2.293 21.414 7z"></path><path d="M8,18H6v-1c0-6.065,4.935-11,11-11h3v2h-3c-4.963,0-9,4.037-9,9V18z"></path>
                                </svg></button>
                                <button onClick={() => deleteFit()} class="bg-TagsBackground rounded-md flex justify-center items-center ml-1.5 pl-1.5 pr-1.5 text-UnSelPrimary hover:bg-rose-500  duration-200" title="Delete this outfit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" /></svg></button>
                            </div>
                            <div class="-ml-3 mt-2 flex tag-container pr-3 py-1">
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
                    <div class="bg-TagsBackground rounded-md min-w-80 pl-4 pr-8 ml-8 mr-8 pt-4">

                        {
                            clothing.length === 0 ? (
                                <div class="w-full h-full flex items-center justify-center">
                                    <h1>No clothing components added.</h1>
                                </div>

                            ) : (
                                <div>
                                    <h1 class="font-w-title text-2xl mb-2">Clothing</h1>

                                    {clothing.map((value, key) => {
                                        return (
                                            <div key={key} className={`flex h-12 items-center mb-2 rounded-md hover:bg-backgroundColor duration-100 cursor-pointer`}>
                                                <img class="w-12 h-12 rounded-md" src={value.image_url}></img>
                                                <h1 class="font-w-medium pl-1.5">{value.name}</h1>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }

                    </div>
                    <div class="bg-TagsBackground rounded-md min-w-80 pl-4 pr-8 mr-8 pt-4">
                        {
                            accessory.length === 0 ? (
                                <div class="w-full h-full flex items-center justify-center">
                                    <h1>No accessory components added.</h1>
                                </div>
                            ) : (
                                <div>
                                    <h1 class="font-w-title text-2xl mb-2">Accessories</h1>

                                    {accessory.map((value, key) => {
                                        return (
                                            <div key={key} className={`flex h-12 items-center mb-2 rounded-md hover:bg-backgroundColor duration-100 cursor-pointer`}>
                                                <img class="w-12 h-12 rounded-md" src={value.image_url}></img>
                                                <h1 class="font-w-medium pl-1.5">{value.name}</h1>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }
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