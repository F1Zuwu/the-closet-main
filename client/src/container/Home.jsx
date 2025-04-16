import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tags from "../components/Tags";
import Masonry from "react-layout-masonry";
import TiltComponent from "../components/TiltComponent";
import Footer from "../components/Footer";
import gsap from "gsap";
import { fetchWithAuth } from "../api/Account";
import AddTag from "../components/AddTag";

const Home = () => {
    const userData = localStorage.getItem("auth");
    const [isAddTagWindowOpen, setIsTagWindowOpen] = useState(false)
    const [fitsData, setFitsData] = useState([])

    useEffect(() => {
        fetchWithAuth("/api/fit/getall").then(async (res) => {
            const data = await res.json()
            console.log(data)
            setFitsData(Array.isArray(data.fits) ? data.fits : []);
            gsap.fromTo(".container-closet", { opacity: 0, scale: 1.1, translateY: 50 }, { opacity: 1, scale: 1.0, translateY: 0 })
        })
    }, [])

    const HandleTransistion = (val) => {
        gsap.to(".container-closet", { opacity: 0, scale: 1.1, translateY: 50 })

        setTimeout(() => {
            window.location.href = "/outfit/" + val
        }, 350);

    }

    return (
        <div class="bg-backgroundColor h-screen">
            <img alt="" class="input-pass absolute" src={require('../assets/deco.png')}></img>
            <img alt="" class="input-pass absolute bottom-0 right-0" src={require('../assets/deco_1.png')}></img>
            <div class="navbar-gradient">{/* Gradient Decoration */}</div>


            <div class="flex justify-center w-full absolute top-32">
                <div class="w-full overflow-x-hidden">
                    <h1 class="text-center text-base font-w-title pb-4">Find you’r perfect outfit for the day!</h1>
                    <div class="w-full flex justify-center relative">
                        <div class="w-2/3 relative">
                            <svg class="absolute right-6 top-2.5 cursor-pointer" width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18_5)"><circle cx="10" cy="10" r="9.5" stroke="#352F2C" /><path d="M16 17L23.5 25.5" stroke="#352F2C" /></g><defs><clipPath id="clip0_18_5"><rect width="24" height="26" fill="white" /></clipPath></defs></svg>
                            <input class="font-w-light w-full h-12 bg-transparent border-black text-primary border text-center rounded-full" placeholder="Search"></input>
                        </div>
                    </div>
                    <div class="w-full justify-center flex">
                        <Tags setIsTagWindowOpen={setIsTagWindowOpen}></Tags>
                    </div>
                    <div id="container-fits-" class="flex justify-center pt-12 pl-24 pr-24 pb-24 container-closet opacity-0 overflow-x-hidden">
                        {fitsData.length === 0 && userData && (
                            <h1><button class="underline" onClick={() => window.location.href = "/add"}>Add</button> fits to your collection to start viewing them!</h1>
                        )}
                        {!userData ? (
                            <h1><button class="underline" onClick={() => window.location.href = "/login"}>Login</button> to start viewing your outfits!</h1>
                        ) : (
                            <Masonry
                                columns={{ 640: 1, 768: 2, 1024: 3, 1280: 5 }}
                                gap={16}
                            >
                                {fitsData.map((value, index) => {
                                    return (
                                        <div key={index} class="cursor-pointer hover:shadow-sm card-hover-name-show" onClick={() => HandleTransistion(value.fit_id)}>
                                            <TiltComponent cardName={value.name}><img alt={value.name} class="rounded-md" src={value.image_url}></img></TiltComponent>
                                        </div>
                                    )
                                })}

                            </Masonry>
                        )}

                    </div>
                    {fitsData.length > 0 && (
                        <Footer></Footer>
                    )}
                </div>

            </div>
            {fitsData.length === 0 && (
                <div class="absolute bottom-0 w-full">
                    <Footer></Footer>
                </div>
            )}


            <div class="w-full absolute">
                <Navbar></Navbar>
            </div>
            {isAddTagWindowOpen && (
                <AddTag setIsTagWindowOpen={setIsTagWindowOpen}></AddTag>
            )}
        </div>
    )
}

export default Home;