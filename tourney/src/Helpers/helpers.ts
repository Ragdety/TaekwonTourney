const getHeaders = (cookieJWT: any) => {
    return {
        headers: {
            Authorization: `Bearer ${cookieJWT}`
        }
    };
}

const helpers = {
    getHeaders
}

export default helpers;