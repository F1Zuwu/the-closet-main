import React from "react";
import Navbar from "../components/Navbar";
import Tags from "../components/Tags";
import Masonry from "react-layout-masonry";
import TiltComponent from "../components/TiltComponent";
import Footer from "../components/Footer";

const Home = () => {

    const data = [{"name": "wht", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=1"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=2"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=3"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=4"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=5"},
        {"name": "wht", image:"https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=600"},
        {"name": "i feel so sigma", image:"https://images-ext-1.discordapp.net/external/mcpMdtTXKHxgvY8yttN59h0yRjkiTYD2l-IRoAc6wys/https/lh6.googleusercontent.com/proxy/eg3X_bnt7s0NH_vly8iac6uRIVgWOxhSH4CWFCiLULerYTNkMP6AHWVWHT63eRgfrOAgPAGyVhWxNH2fV4wtlyRTSPqaMPMQ4Q?format=webp"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=1"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=2"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=3"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=4"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=7"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=1"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=4"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=10"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=9"},
        {"name": "wht", image:"https://picsum.photos/1080/1080/?blur=8"},
    ]

    return(
        <div class="bg-backgroundColor h-screen">
            <img alt="" class="absolute" src={require('../assets/deco.png')}></img>
            <img alt="" class="absolute bottom-0 right-0" src={require('../assets/deco_1.png')}></img>
            <div class="navbar-gradient">{/* Gradient Decoration */}</div>
            <div class="w-full absolute">
                <Navbar></Navbar>
            </div>

            <div class="flex justify-center w-full absolute top-32">
                <div class="w-full">
                    <h1 class="text-center text-base font-w-title pb-4">Find you’r perfect outfit for the day!</h1>
                    <div class="w-full flex justify-center relative">
                        <div class="w-2/3 relative">
                         <svg class="absolute right-6 top-2.5 cursor-pointer" width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18_5)"><circle cx="10" cy="10" r="9.5" stroke="#352F2C"/><path d="M16 17L23.5 25.5" stroke="#352F2C"/></g><defs><clipPath id="clip0_18_5"><rect width="24" height="26" fill="white"/></clipPath></defs></svg>
                         <input class="font-w-light w-full h-12 bg-transparent border-black text-primary border text-center rounded-full" placeholder="Search"></input>
                        </div>
                    </div>
                    <div class="w-full justify-center flex">
                        <Tags></Tags>
                    </div>
                    <div class="flex justify-center pt-12 pl-24 pr-24 pb-24">
                    <Masonry
                            columns={{ 640: 1, 768: 2, 1024: 3, 1280: 5 }}
                            gap={16}
                        >
                        {data.map((value, index) => {
                            return(
                                <div key={index} class="cursor-pointer hover:shadow-sm card-hover-name-show">
                                    <TiltComponent cardName={value.name}><img alt={value.name} class="rounded-md" src={value.image}></img></TiltComponent>
                                </div>
                            )
                        })}
                            
                        </Masonry>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    )
}

export default Home;