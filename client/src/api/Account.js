const DomainUrl = "http://localhost:3005"

const saveToken = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('auth', JSON.stringify(userData));
}

const registerUser = async (username, email, password) => {
    try {
        const response = await fetch(DomainUrl + '/api/user',
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
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("CODE | LOGIN ERROR HAS OCCURED!", error)
        return false;
    }
}

module.exports = { registerUser }; 