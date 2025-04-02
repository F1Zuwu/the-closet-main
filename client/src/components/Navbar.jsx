import React, { useState } from "react";

const Navbar = () => {
    const userData = localStorage.getItem("auth")

    const logOut = () => {
        localStorage.clear()

        alert("Log out was sucessful.")

        window.location.href = "/login"
    }

    return (
        <div id="navbar" class="h-14 pl-8 pr-8">
            <button onClick={() => window.location.href = "/"} class="flex items-center h-full">
                <svg width="26" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8 25.4384L2 31V2H14.8M14.8 25.4384L24 31V2H14.8M14.8 25.4384V2" stroke="#352F2C" stroke-width="3" />
                </svg>
                <h1 class="font-w-title ml-2 text-primary">The Closet</h1>
            </button>

            <div class="absolute flex right-8 top-4 font-w-medium text-UnSelPrimary">
                <button onClick={() => window.location.href = "/add"}><h3 class="hover:text-primary">Add new</h3></button>
                {!userData ? (
                    <button class="pl-4" onClick={() => window.location.href = "/login"}><h3 class="hover:text-primary">Login</h3></button>
                ) : (
                    <button class="pl-4" onClick={() => logOut()}><h3 class="hover:text-primary">Logout</h3></button>
                )}
            </div>
        </div>
    )
}

export default Navbar;