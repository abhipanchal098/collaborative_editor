// export const BASE_URL = 'http://localhost:5005';
export const BASE_URL = 'https://collaborative-editor-uuon.onrender.com';

export const getApiService = async (endpoint) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
    try {
        const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
            method: 'GET',
            headers: headers
        });

        return await response.json();
    } catch (error) {
        console.error('Error in GET service:', error);
        return error;
    }
};

export const postApiService = async (endpoint, data) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        return await response.json();
    } catch (error) {
        console.error('Error in POST service:', error);
        return error;
    }
};

export const putApiService = async (endpoint, data) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        };
        const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });

        return await response.json();
    } catch (error) {
        console.error('Error in PUT service:', error);
        return error;
    }
};

export const deleteApiService = async (endpoint) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        };
        const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
            method: 'DELETE',
            headers: headers
        });

        return await response.json();
    } catch (error) {
        console.error('Error in DELETE service:', error);
        return error;
    }
};
