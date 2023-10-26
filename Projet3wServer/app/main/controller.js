import {
    getNews,
} from "./requests.js";
import {
    errorCodes,
    newUser, findUser, updateUserCountry,
} from "./mongo.js"
import {
    generateToken, storeToken, verifyToken,
    authenticateRequest, revokeToken, isTokenRevoked
} from "./tokens.js" 

export const postNewUser = async (req, res) => {
    console.log("controller postNewUser")
    const result = await newUser(req.body.username, req.body.password)
    if (result === errorCodes.unique) {
        res.status(409).send("User already exist");
    } else if (result === errorCodes.mongoose) {
        res.status(500).send("Internal server error");
    } else {
        res.send(result); // Handle the successful case (user found) here.
    }
}
export const login = async (req, res) => {
    console.log("controller login");
    const result = await findUser(req.body.username, req.body.password);
    if (result === errorCodes.notFound) {
        res.status(404).send("User not found");
    } else if (result === errorCodes.mongoose) {
        res.status(500).send("Internal server error");
    } else {
        if (result){
            // Handle the successful case (user found) here.
            const token = generateToken(result)
            storeToken(result._id, token)
            console.log(token)
            res.send({token: token});
        } else {
            res.send(result); // <= false
        }
    }
  };
export const putUser = async (req, res) => {
    //console.log("controller login")
    //res.sendStatus(await updateUserCountry(req.body.username, req.body.password));
}

export const getLastNews = async (req, res) => {
    if (true) { //authenticateRequest(req, res, next)
        const result = await getNews()
        if (result){
            res.send(result);
        } else {
            res.status(500).send("Internal server error");
        }
    }
}