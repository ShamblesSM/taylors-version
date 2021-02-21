import config from "config";
import {isEmpty} from "lodash";
import queryString from "query-string";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {storeToken} from "../actions/AuthActions";
import useAuthToken from "../hooks/useAuthToken";
import useStickyState from "../hooks/useStickyState";
import ConfigurePage from "./ConfigurePage";

const redirectHome = () => window.location.replace(config.appUrl);

const SpotifyHandler = () => {
    const dispatch = useDispatch();

    const [state] = useStickyState("spotifyState");
    const token = useAuthToken();

    // detect incoming token
    const responseSearch = window.location.search && queryString.parse(window.location.search);
    const responseHash = window.location.hash && queryString.parse(window.location.hash);
    const accessToken = responseHash && responseHash.access_token;

    // check the response was good
    if ((accessToken && state !== responseHash.state) || !isEmpty(responseSearch.error)) {
        // returned token didn't match the token we have saved, likely the original API request didn't originate from this site.
        // or there was an error in the OAuth flow, the user probably declined the permissions

        // send the user back to the landing page where they can re-auth with spotify
        redirectHome();
    }

    useEffect(() => {
        // save incoming token with expiration time
        if (accessToken !== token && !isEmpty(accessToken)) {
            // a new token has just been received
            dispatch(storeToken(accessToken, Date.now() + (responseHash.expires_in * 1000)));
        }
    }, [accessToken]);

    return token && <ConfigurePage/>;
};

export default SpotifyHandler;