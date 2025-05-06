import React, { useState } from "react";
import ErrorPop from "./ErrorPop";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const userData = localStorage.getItem("auth")
    const [isErrorOpen, setErrorIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear()

        setErrorIsOpen(true)
        setErrorMessage({ message: "Logged out of your current session.", title: "Success!", reloadNeeded: true })

        navigate("/login")
    }

    return (
        <div id="navbar" class="h-14">
            <button onClick={() => navigate("/")} class="flex items-center h-full pl-8">
                <svg width="26" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8 25.4384L2 31V2H14.8M14.8 25.4384L24 31V2H14.8M14.8 25.4384V2" stroke="#352F2C" stroke-width="3" />
                </svg>
                <h1 class="font-w-title ml-2 text-primary">The Closet</h1>
                {userData && (
                    <h1 class="ml-1.5"> | {JSON.parse(userData).username}</h1>
                )
                }

            </button>

            <div class="absolute flex right-8 top-4 font-w-medium text-UnSelPrimary">
                <button onClick={() => navigate("/add")}><h3 class="hover:text-primary">Add new</h3></button>
                {!userData ? (
                    <button class="pl-4" onClick={() => navigate("/login")}><h3 class="hover:text-primary">Login</h3></button>
                ) : (
                    <button class="pl-4" onClick={() => logOut()}><h3 class="hover:text-primary">Logout</h3></button>
                )}
            </div>
            {isErrorOpen && (
                <ErrorPop message={errorMessage} setIsOpen={setErrorIsOpen}></ErrorPop>
            )}
        </div>
    )
}

export default Navbar;