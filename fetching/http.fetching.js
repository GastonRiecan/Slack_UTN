

export const POST = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            ...params
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
        throw error

    }

}

export const GET = async (URL_API, params) => {
    try {
        const response = await fetch(
            URL_API,
            {
                method: 'GET',
                ...params
            }
        )
        return response.json()
    }
    catch (error) {
        console.log(error)
        throw error

    }
}

export const PUT = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'PUT',
            ...params
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log("Error en la solicitud PUT:", error);
        throw error;
    }
}

export const DELETE = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'DELETE',
            ...params
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log("Error en la solicitud DELETE:", error);
        throw error;
    }
}


const getUnnauthenticatedHeaders = () => {
    const unnauthenticatedHeaders = new Headers()
    unnauthenticatedHeaders.set('Content-Type', 'application/json')
    unnauthenticatedHeaders.set('x-api-key', '8e849ec1-2977-404c-88c0-c8d2246d498f')
    return unnauthenticatedHeaders
}

const getAuthenticatedHeaders = () => {
    const token = sessionStorage.getItem('access_token');
    if (!token) {
        throw new Error('No token found in sessionStorage');
    }

    const authenticatedHeaders = new Headers()
    authenticatedHeaders.set('Content-Type', 'application/json')
    authenticatedHeaders.set('x-api-key', '8e849ec1-2977-404c-88c0-c8d2246d498f')
    authenticatedHeaders.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
    authenticatedHeaders.set("Access-Control-Allow-Origin", "*", "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    return authenticatedHeaders
}



export { getAuthenticatedHeaders, getUnnauthenticatedHeaders }