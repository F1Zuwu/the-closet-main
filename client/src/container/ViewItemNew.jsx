import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../api/Account";
import SharePop from "../components/SharePop";
import '../scrollbar_viewitem.css'
const ViewItemNew = () => {
    const [isShareOpen, setShareOpen] = useState(false)
    const { id } = useParams()
    const [data, setData] = useState({})
    const [tags, setTags] = useState([])
    const [clothing, setClothing] = useState([])
    const [accessory, setAccesory] = useState([])
    const [isOwner, setIsOwner] = useState(false)

    window.addEventListener("DOMContentLoaded", () => {
        fetchWithAuth("/api/sessions")
            .then(async (res_) => {
                const data_ = await res_.json()
                fetchWithAuth("/api/fit/" + id)
                    .then(async (res) => {
                        const data = await res.json()
                        if (data.success) {
                            setData(data.fit)
                            setTags(data.fit.tags)
                            setClothing(data.fit.clothings)
                            setAccesory(data.fit.accessories)

                            if (data_.user.id === data.fit.user_id) {
                                setIsOwner(true)
                            }
                        } else {
                            window.location.href = "/notfound"
                        }
                    })
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
            <img alt="" class="absolute input-pass" src={require('../assets/deco.png')}></img>
            <img alt="" class="absolute bottom-0 right-0 input-pass" src={require('../assets/deco_1.png')}></img>
            <div class="navbar-gradient input-pass">{/* Gradient Decoration */}</div>
            <div class="absolute w-screen h-screen items-center flex justify-center">
                <div class="">
                    <div>
                        <div class="flex">
                            <h1 class="font-w-title text-2xl">{data.name}</h1>
                            <button onClick={() => setShareOpen(true)} class="bg-TagsBackground rounded-md flex justify-center items-center ml-3 pl-1.5 pr-1.5 text-UnSelPrimary hover:text-primary" title="Share this outfit!"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                <path d="M19 22H5c-1.654 0-3-1.346-3-3V8h2v11c0 .552.449 1 1 1h14c.552 0 1-.448 1-1v-2h2v2C22 20.654 20.654 22 19 22zM16.707 11.707L15.293 10.293 18.586 7 15.293 3.707 16.707 2.293 21.414 7z"></path><path d="M8,18H6v-1c0-6.065,4.935-11,11-11h3v2h-3c-4.963,0-9,4.037-9,9V18z"></path>
                            </svg></button>
                            {isOwner && (
                                <div class="flex">
                                    <button onClick={() => deleteFit()} class="bg-TagsBackground rounded-md flex justify-center items-center ml-1.5 pl-1.5 pr-1.5 text-UnSelPrimary" title="Edit this outfit"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M14.3 5.7L3 17 3 21 7 21 18.3 9.7zM21.7 6.2l-2 2-3.9-3.9 2-2c.3-.4.9-.4 1.3-.1l1.3 1.3 1.3 1.3C22.1 5.3 22.1 5.9 21.7 6.2z"></path>
                                    </svg></button>
                                    <button onClick={() => deleteFit()} class="bg-TagsBackground rounded-md flex justify-center items-center ml-1.5 pl-1.5 pr-1.5 text-UnSelPrimary hover:bg-rose-500  duration-200" title="Delete this outfit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" /></svg></button>
                                </div>
                            )}
                        </div>
                        <div class="-ml-3 mt-2 flex tag-container pr-3 py-1 mb-3">
                            {tags.map((val, index) => {
                                return (
                                    <div class="flex ">
                                        <div class=" bg-TagsBackground rounded-md min-w-28 flex justify-center items-center ml-3 text-UnSelPrimary hover:text-primary" key={index}>
                                            {val.tag_name}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {tags.length === 0 && (
                            <h1 class="items-center font-w-light mb-3">This outfit has no tags</h1>
                        )}
                        <div>
                        </div>
                        <div class="flex">
                            <div class="items-center flex justify-center hover-container-img-prev cursor-pointer" onClick={() => window.location.href = data.image_url}>
                                <div class="dark-overlay bg-black h-72 w-64 rounded-md absolute opacity-0">{ }</div>
                                <img alt="preview" id="img" class="limit-img rounded-md" src={data.image_url}></img>

                                <svg class="absolute hover-icon-show opacity-0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="100" viewBox="0,0,256,256">
                                    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8.53333,8.53333)"><path d="M25.98047,2.99023c-0.03726,0.00118 -0.07443,0.00444 -0.11133,0.00977h-5.86914c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h3.58594l-10.29297,10.29297c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l10.29297,-10.29297v3.58594c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-5.87305c0.04031,-0.29141 -0.04973,-0.58579 -0.24615,-0.80479c-0.19643,-0.219 -0.47931,-0.34042 -0.77338,-0.33192zM6,7c-1.09306,0 -2,0.90694 -2,2v15c0,1.09306 0.90694,2 2,2h15c1.09306,0 2,-0.90694 2,-2v-10v-2.57812l-2,2v2.57813v8h-15v-15h8h2h0.57813l2,-2h-2.57812h-2z"></path></g></g>
                                </svg>


                            </div>
                            <div class="bg-TagsBackground rounded-md min-w-80 h-72 pl-4 pr-8 ml-8 mr-8 pt-4 overflow-y-scroll">

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
                                                    <div key={key} className={`fit-container-atrb flex h-12 items-center mb-2 rounded-md hover:bg-backgroundColor duration-100 cursor-pointer relative`}>
                                                        <img class="w-12 h-12 rounded-md" src={value.image_url}></img>
                                                        <h1 class="font-w-medium pl-1.5">{value.name}</h1>
                                                        {isOwner && (
                                                            <div class="absolute right-0 flex">
                                                                <button class="btns-show w-0 opacity-0 bg-backgroundColor h-12 flex justify-center items-center hover:bg-TagsBackground">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                                                        <path d="M14.3 5.7L3 17 3 21 7 21 18.3 9.7zM21.7 6.2l-2 2-3.9-3.9 2-2c.3-.4.9-.4 1.3-.1l1.3 1.3 1.3 1.3C22.1 5.3 22.1 5.9 21.7 6.2z"></path>
                                                                    </svg>
                                                                </button>
                                                                <button class="btns-show w-0 opacity-0 h-12  flex justify-center items-center hover:bg-TagsBackground">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" /></svg>
                                                                </button>

                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                }

                            </div>
                            <div class="bg-TagsBackground rounded-md min-w-80 pl-4 pr-8 mr-8 pt-4 overflow-y-scroll">
                                {
                                    accessory.length === 0 ? (
                                        <div class="w-full h-full flex items-center justify-center">
                                            <h1 class="font-w-light">No accessory components added.</h1>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 class="font-w-title text-2xl mb-2">Accessories</h1>

                                            {accessory.map((value, key) => {
                                                return (
                                                    <div key={key} className={`fit-container-atrb flex h-12 items-center mb-2 rounded-md hover:bg-backgroundColor duration-100 cursor-pointer`}>
                                                        <img class="w-12 h-12 rounded-md" src={value.image_url}></img>
                                                        <h1 class="font-w-medium pl-1.5">{value.name}</h1>
                                                        {isOwner && (
                                                            <div class="absolute right-0 flex">
                                                                <button class="btns-show w-0 opacity-0 bg-backgroundColor h-12 flex justify-center items-center hover:bg-TagsBackground">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                                                        <path d="M14.3 5.7L3 17 3 21 7 21 18.3 9.7zM21.7 6.2l-2 2-3.9-3.9 2-2c.3-.4.9-.4 1.3-.1l1.3 1.3 1.3 1.3C22.1 5.3 22.1 5.9 21.7 6.2z"></path>
                                                                    </svg>
                                                                </button>
                                                                <button class="btns-show w-0 opacity-0 h-12  flex justify-center items-center hover:bg-TagsBackground">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" /></svg>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>
                {!isOwner && (
                    <div class="absolute bottom-24">
                        <h1 class="text-center">Want this fit in your closet?</h1>
                        <button class="bg-TagsBackground rounded-md w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5">Copy fit!</button>
                    </div>
                )}
            </div>

            <div class="w-full absolute">
                <Navbar></Navbar>
            </div>
            {isShareOpen && (
                <SharePop setIsOpen={setShareOpen}></SharePop>
            )}
        </div>
    )
}

export default ViewItemNew;
