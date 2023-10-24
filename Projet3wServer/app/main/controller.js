import {
    postWSI3PointRelaisRecherche,
} from "./requests.js";

export const recherchePointsRelais = async (req, res) => {
    console.log("controller req.body",req.body)
    res.send(await postWSI3PointRelaisRecherche(req.body));
}