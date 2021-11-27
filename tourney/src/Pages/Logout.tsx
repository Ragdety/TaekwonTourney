import React, {useEffect, useState} from "react";
import user from "../APICalls/user";
import {Redirect} from "react-router";
import {useCookies} from "react-cookie";

export default function Logout() {
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['jwt']);

    useEffect(() => {
        (
            () => {
                setCookie('jwt', '')
                setRedirect(true)
                removeCookie("jwt");
            })();
    });

    if(redirect) {
        return <Redirect to='/'/>;
    }
    
    return (
        <>
            <form>
                <input type={'hidden'}/>
            </form>
            <p>Logging out...</p>
        </>
    )
}