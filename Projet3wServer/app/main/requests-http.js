import fetch from 'node-fetch';
//const fetch = require("fetch");

// ------------- error ----------------------

function errorHandling(status){
    console.log("ERROR : " + status)
    if (status = 500){
        console.error("Internal Server Error")// when body is wrong or ... a completer
    }
    return status
}

// ------------- default values -------------------

const baseUrl = "http://api.mondialrelay.com/Web_Services.asmx"
function addToBaseUrl(urlSection){ return baseUrl + "?op=" + urlSection}

const header = {
    "Content-Type"  :"text/xml",
    "MessageType"   :"CALL"
}

// --------------- mondial relay request --------------------

export function postRequest(body, urlSection){
    
    const url = addToBaseUrl(urlSection);
    console.log('url :',url)
    const params = { method: 'POST', headers: header, body: body }
    console.log("params :", params)

    return fetch(url,params)
    .then(data => {                           // reception des données
        console.log("POST is working #######")
        const status = data.status
        if (status === 200){
            return data.text().then(res=>{ return res })
        } else { return errorHandling(status) }
    })
    .finally(res => { // upon completion
        console.log("END of POST ############")
    })  
    .catch(err => { // upon failure
        console.error("POST catch error");
        return err.status
    })
}