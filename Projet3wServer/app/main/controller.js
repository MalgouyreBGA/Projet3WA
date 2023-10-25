import {
    getNews,
} from "./requests.js";
import {
    newUser, findUser, updateUserCountry,
} from "./mongo.js"

export const postNewUser = async (req, res) => {
    console.log("controller postNewUser")
    res.send(await newUser(req.body.username, req.body.password));
}
export const login = async (req, res) => {
    console.log("controller login")
    res.send(await findUser(req.body.username, req.body.password));
}
export const putUser = async (req, res) => {
    //console.log("controller login")
    //res.send(await updateUserCountry(req.body.username, req.body.password));
}

export const getLastNews = async (req, res) => {
    console.log("controller getNews")
    res.send(await getNews());
}