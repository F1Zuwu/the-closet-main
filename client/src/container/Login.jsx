import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { userLogin } from "../api/Account";
import ErrorPop from "../components/ErrorPop";

const Login = () => {

    const [isErrorOpen, setErrorIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})

    window.addEventListener("DOMContentLoaded" ,() => {
        const username = document.getElementById("name")
        const password = document.getElementById("password")
        username.focus()

        password.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                AuthUser()
            }
        })
    })

    const AuthUser = () => {
        const username = document.getElementById("name").value
        const password = document.getElementById("password").value

        userLogin(username, password)
            .then((res) => {
                if (res.success === true) {
                    console.log(res)
                    window.location.href = "/"
                } else {
                    setErrorMessage({message:res.error, title:"Failed!"})
                    setErrorIsOpen(true)
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

            <div class="flex justify-center items-center h-screen">
                <div>
                    <h1 class="font-w-title text-2xl mb-2">Login</h1>
                    <input id="name" type="name" class="font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="Username"></input>
                    <input id="password" type="password" class="mt-2 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="Password"></input>
                    <button onClick={() => AuthUser()} class="bg-TagsBackground rounded-full w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"><h2 class="font-w-medium">Login</h2></button>
                    <h1 class="text-center mt-1">Don't have an account yet? <button onClick={() => window.location.href = "/register"} class="underline cursor-pointer">Register</button></h1>
                </div>
            </div>

            {isErrorOpen && (
                <ErrorPop message={errorMessage} setIsOpen={setErrorIsOpen}></ErrorPop>
            )}
        </div>
    )
}

export default Login;