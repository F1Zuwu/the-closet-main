import React from "react";
import Navbar from "../components/Navbar";
import { registerUser } from "../api/Account";

const Register = () => {

    const RegisterUser = () => {
        const email = document.getElementById("email").value
        const username = document.getElementById("name").value
        const password = document.getElementById("password").value
        const passwordCheck = document.getElementById("passwordCheck").value

        if (!email || !username || !password || !passwordCheck) {
            alert("All fields need to be filled.")
            return false;
        }

        if (password === passwordCheck) {
            registerUser(username, email, password)
                .then((res) => {
                    if (res === true) {
                        console.log(res)
                        window.location.href = "/"
                    } else if (res === false) {
                        alert("User creation failed.")
                    } else {
                        console.error("Unexpected response.")
                    }
                })
        } else {
            alert("Password's do not match!")
            return false;
        }
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
                    <h1 class="font-w-title text-2xl mb-2">Register</h1>
                    <input id="name" type="name" class="font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="Username"></input>
                    <input id="email" type="Email" class=" mt-2 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="Email"></input>
                    <input id="password" type="password" class="mt-2 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="Password"></input>
                    <input id="passwordCheck" type="password" class="mt-2 font-w-light w-full h-12 bg-transparent border-black text-primary border pl-4 rounded-full" placeholder="Type your password again"></input>
                    <button onClick={() => RegisterUser()} class="bg-TagsBackground rounded-full w-full flex justify-center items-center mt-4 text-UnSelPrimary hover:text-primary pb-1.5 pt-1.5"><h2 class="font-w-medium">Register</h2></button>
                    <h1 class="text-center mt-1">Alerady have an account? <button onClick={() => window.location.href = "/login"} class="underline cursor-pointer">Log in!</button></h1>
                </div>
            </div>
        </div>
    )
}

export default Register;