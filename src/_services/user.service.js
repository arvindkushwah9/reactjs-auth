// import config from '../_helpers';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll
};

function login(username, password) {

    var params = {
        user: {
            username: username,
            password: password,
        }
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };

    console.log("Params", params)
    return fetch(`https://vegetables-api.herokuapp.com/api/v1/sign_in`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log("login successful ")
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://vegetables-api.herokuapp.com/api/v1/vegetables`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
                window.location="/"
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}