import React from "react";
import Navbar from "../components/Navbar";

const Login = () => {
    return (
        <div>
            <img alt="" class="input-pass absolute" src={require('../assets/deco.png')}></img>
            <img alt="" class="input-pass absolute bottom-0 right-0" src={require('../assets/deco_1.png')}></img>
            <div class="input-pass navbar-gradient">{/* Gradient Decoration */}</div>
            <div class="w-full absolute">
                <Navbar></Navbar>
            </div>

            <div class="flex justify-center items-center h-screen">
                <div>
                    <h1 class="font-w-title text-2xl mb-2">Register</h1>
                    <input type="name" class="font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="Username"></input>
                    <input type="password" class="mt-2 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="Password"></input>
                    <button class="bg-TagsBackground rounded-full w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"><h2 class="font-w-medium">Login</h2></button>
                    <h1 class="text-center mt-1">Don't have an account yet? <button onClick={() => window.location.href = "/register"} class="underline cursor-pointer">Register</button></h1>
                </div>
            </div>
        </div>
    )
}

export default Login;