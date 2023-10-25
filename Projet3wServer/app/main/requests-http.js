import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// ------------- default values -------------------------------

const baseUrl = "https://newsapi.org/v2"
const apiKeyNews = process.env.API_KEY;

function addToBaseUrl(urlSection, toAdd){
    let add = Object.keys(toAdd).map(key => {
        return key + "=" + toAdd[key]
    })
    add.push("apiKey=" + apiKeyNews)
    add=add.join("&")
    return baseUrl + urlSection + '?' + add
}
//{ ...body,  }
// ------------- error ---------------------------------------

function errorHandling(status){
    console.log("ERROR :", status)
    if (status = 500){
        console.error("Internal Server Error")// when body is wrong or ... a completer
    }
    return status
}

// --------------- request --------------------


export async function getRequest(params, urlSection){
    console.log("body", params)
    const url = addToBaseUrl(urlSection, params);
    console.log('url :',url)

    return fetch(url)//,params
    .then(data => { // reception des données
        const status = data.status
        console.log("Get status", status)
        //console.log("data", data)
        if (status === 200){
            return data.text().then(res=>{ return res })
        } else { return errorHandling(status) }
    })
    .finally(res => { // upon completion
        console.log("END of Get ############")
    })  
    .catch(err => { // upon failure
        console.error("POST catch error");
        return err.status
    })
}

export async function postRequest(body, urlSection){
    console.log("body", body)
    const url = addToBaseUrl(urlSection, body);
    console.log('url :',url)

    //const params = 
    //console.log('params :',params)

    return fetch(url)//,params
    .then(data => { // reception des données
        console.log("POST is working #######")
        const status = data.status
        console.log("status", status)
        //console.log("data", data)
        /*
        if (status === 200){
            return data.text().then(res=>{ return res })
        } else { return errorHandling(status) }
        */
    })
    .finally(res => { // upon completion
        console.log("END of POST ############")
    })  
    .catch(err => { // upon failure
        console.error("POST catch error");
        return err.status
    })
}