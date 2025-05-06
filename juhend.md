**Juhend: Navigeerimise parandamine React Routeriga rakenduses (alamkataloogi toe jaoks)**

**Probleem:**
Kui Reacti rakenduses kasutatakse navigeerimiseks otse `window.location.href = "/minu-leht"`, siis see:
1.  Põhjustab terve lehe uuesti laadimise, mis on aeglane ja kaotab Reacti SPA (Single Page Application) eelised.
2.  Eirab React Routeri `BrowserRouter` komponendile määratud `basename` atribuuti (nt `basename="/alamkataloog"`). Selle tulemusena üritab rakendus navigeerida valele URL-ile (nt `https://sinudomeen.ee/minu-leht` asemel `https://sinudomeen.ee/alamkataloog/minu-leht`).

**Lahendus:**
Kasuta React Routeri pakutavat `useNavigate` hook\'i programmiliselt navigeerimiseks või `<Link>` komponenti deklaratiivsete linkide jaoks. Need arvestavad automaatselt `basename` seadistust ja teostavad navigeerimise korrektselt ilma lehte uuesti laadimata.

**Sammud `useNavigate` hook\'i kasutamiseks (kui navigeerimine toimub nupuvajutuse või muu sündmuse peale):**

1.  **Impordi `useNavigate`:**
    Lisa faili algusesse import-lause:
    ```javascript
    import { useNavigate } from \'react-router-dom\';
    ```

2.  **Initsialiseeri `navigate` funktsioon:**
    Oma Reacti komponendi sees (enne `return` lauset) kutsu `useNavigate()` hook:
    ```javascript
    const navigate = useNavigate();
    ```

3.  **Asenda `window.location.href`:**
    Kõikjal, kus varem kasutasid `window.location.href = "/sihtkoht"`, kasuta nüüd `navigate("/sihtkoht")`.
    Kui on vaja dünaamilist marsruuti, näiteks `window.location.href = "/kasutaja/" + userId`, siis asenda see `navigate("/kasutaja/" + userId)` või eelistatult `navigate(\`/kasutaja/\${userId}\`)`.

**Näide parandusest (failist `client/src/components/Navbar.jsx`):**

**Enne parandust:**
```javascript
// client/src/components/Navbar.jsx

import React, { useState } from "react";
import ErrorPop from "./ErrorPop";
// useNavigate import puudub

const Navbar = () => {
    const userData = localStorage.getItem("auth");
    // ...muu kood...
    // navigate funktsiooni initsialiseerimine puudub

    return (
        <div id="navbar" class="h-14">
            {/* Näide avalehele navigeerimisest */}
            <button onClick={() => window.location.href = "/"} class="flex items-center h-full pl-8">
                {/* ...ikoon ja tekst... */}
            </button>

            <div class="absolute flex right-8 top-4 font-w-medium text-UnSelPrimary">
                {/* Näide "/add" lehele navigeerimisest */}
                <button onClick={() => window.location.href = "/add"}><h3 class="hover:text-primary">Add new</h3></button>
                {!userData ? (
                    /* Näide "/login" lehele navigeerimisest */
                    <button class="pl-4" onClick={() => window.location.href = "/login"}><h3 class="hover:text-primary">Login</h3></button>
                ) : (
                    {/* ...logout nupp... */}
                )}
            </div>
            {/* ...muu kood... */}
        </div>
    );
}

export default Navbar;
```

**Pärast parandust:**
```javascript
// client/src/components/Navbar.jsx

import React, { useState } from "react";
import ErrorPop from "./ErrorPop";
import { useNavigate } from \'react-router-dom\'; // SAMM 1: Impordi useNavigate

const Navbar = () => {
    const userData = localStorage.getItem("auth");
    const [isErrorOpen, setErrorIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const navigate = useNavigate(); // SAMM 2: Initsialiseeri navigate funktsioon

    // ...logOut funktsioon...

    return (
        <div id="navbar" class="h-14">
            {/* SAMM 3: Asenda window.location.href */}
            <button onClick={() => navigate("/")} class="flex items-center h-full pl-8">
                {/* ...ikoon ja tekst... */}
            </button>

            <div class="absolute flex right-8 top-4 font-w-medium text-UnSelPrimary">
                {/* SAMM 3: Asenda window.location.href */}
                <button onClick={() => navigate("/add")}><h3 class="hover:text-primary">Add new</h3></button>
                {!userData ? (
                    /* SAMM 3: Asenda window.location.href */
                    <button class="pl-4" onClick={() => navigate("/login")}><h3 class="hover:text-primary">Login</h3></button>
                ) : (
                    <button class="pl-4" onClick={() => logOut()}><h3 class="hover:text-primary">Logout</h3></button>
                )}
            </div>
            {/* ...muu kood... */}
        </div>
    );
}

export default Navbar;
```

**Mida arendaja peaks tegema:**
Otsima koodibaasist (eriti `client/src` kaustast) kõiki kohti, kus kasutatakse `window.location.href = ` ja asendama need `navigate()` funktsiooni kutsega, järgides ülaltoodud samme. Erilist tähelepanu tuleks pöörata klikisündmustele (`onClick`). 
