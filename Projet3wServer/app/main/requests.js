import { postRequest } from "./requests-http.js";
import { jsonToXml } from "../convert/jsonToXml.js"
import { xmlToJson } from "../convert/xmlToJson.js";

function isNotErrorStatus(res) {
  if (typeof res != "number") {
    console.log("res not number : is xml");
    return xmlToJson(res);
  } else {
    console.error('res is number : is error status :', res)
    return res;
  }
}

export async function postWSI3PointRelaisRecherche(body){
    const urlSection = "WSI3_PointRelais_Recherche";
    // ToDo : add conversion json to xml here
    const xmlBody = await jsonToXml(body);
    console.log("xmlBody", xmlBody)
    const result = await postRequest(xmlBody, urlSection);
    //console.log("result", result)
    return isNotErrorStatus(result)
}