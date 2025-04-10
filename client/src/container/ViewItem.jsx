import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../api/Account";

const ViewItem = () => {
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
                            <h1 class="font-w-title text-2xl">{data.name}</h1>
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
        </div>
    )
}

export default ViewItem;