const DomainUrl = "http://localhost:3005"


//HELPER FUNCTIONS
const saveToken = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('auth', JSON.stringify(userData));
}

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');
    const headers = {
        ...(options.headers || {}),
        'Authorization': `Bearer ` + token,
        'Content-Type': 'application/json'
    };
    return fetch(DomainUrl + url, {
        ...options,
        headers
    });
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('auth');
}

// ENDPOINT FUNCTIONS
const registerUser = async (username, email, password) => {
    try {
        const response = await fetch(DomainUrl + '/api/user/register',
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        username: username,
                        email: email,
                        password: password
                    }
                ),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
        );
        const data = await response.json();
        console.log(data)
        if (data.success) {
            saveToken(data.token, data.user)
            return data;
        } else {
            return data;
        }
    } catch (error) {
        console.error("CODE | LOGIN ERROR HAS OCCURED!", error)
        return false;
    }
}

const checkAuthStatus = async () => {
    try {
        const response = await fetchWithAuth(DomainUrl + '/api/sessions');
        const data = await response.json();
        if (data.success && data.user) {
            return true;
        } else {
            logout();
            return false;
        }
    } catch (error) {
        console.error('Autentimise kontrollimisel tekkis viga:', error);
        logout();
        return false;
    }
}

const userLogin = async (identifier, password) => {
    //console.log(identifier, password)
    try {
        const response = await fetch(DomainUrl + '/api/user/login',
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        username: identifier,
                        password: password
                    }
                ),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
        );
        const data = await response.json();

        if (data.success) {
            saveToken(data.token, data.user)
            return data;
        } else {
            console.log(data)
            return data;
        }
    } catch (error) {
        console.error("CODE | LOGIN ERROR HAS OCCURED!", error)
        return false;
    }
}

module.exports = { registerUser, checkAuthStatus, userLogin, fetchWithAuth }; 