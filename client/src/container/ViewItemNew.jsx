import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../api/Account";
import SharePop from "../components/SharePop";

const ViewItemNew = () => {
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
        <div class="bg-backgroundColor h-screen">
            <div class="absolute w-screen h-screen items-center flex justify-center">
                <div class="">
                    <div>
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
                        <div>
                        </div>
                        <div>
                            <img alt="preview" id="img" class="limit-img rounded-md" src={data.image_url}></img>
                        </div>
                    </div>
                </div>

            </div>
            <img alt="" class="absolute input-pass" src={require('../assets/deco.png')}></img>
            <img alt="" class="absolute bottom-0 right-0 input-pass" src={require('../assets/deco_1.png')}></img>
            <div class="navbar-gradient input-pass">{/* Gradient Decoration */}</div>
            {isShareOpen && (
                <SharePop setIsOpen={setShareOpen}></SharePop>
            )}
        </div>
    )
}

export default ViewItemNew;
