// This file has functions for pinging the online API

import { SERVER_PATH } from "./Config";

export default function apiRequest(command, params, callback, failCallback) {
    fetch(SERVER_PATH + command + ".php", {
        method: 'POST',
        headers:  {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    }).then((response => { return response.json(); })).then((responseRaw) => {
        var responseJson = JSON.parse(responseRaw);
        console.log(responseJson);
        return callback(responseJson);
    }).catch((error) => {
        console.error(error);
        return failCallback(error);
    });
}

export function generateStars(stars) {
    var string = "";
    for (var i = 0; i < stars; i ++) {
        string += "★";
    }
    for (var j = i; j < 5; j ++) {
        string += "☆";
    }
    return string;
}