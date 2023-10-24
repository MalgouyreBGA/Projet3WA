import {
    postWSI4PointRelaisRecherche,
} from "./main/requests.js";

export function testpostWSI4PointRelaisRecherche(){
    const testBody = "<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><WSI4_PointRelais_Recherche xmlns='http://www.mondialrelay.fr/webservice/'><Enseigne>BDTEST13</Enseigne><Pays>FR</Pays><CP>13100</CP><Security>5787cad2fa82250de5dfc6e4898ba9bc</Security></WSI4_PointRelais_Recherche></soap:Body></soap:Envelope>"
    return postWSI4PointRelaisRecherche(testBody)
}

console.log(await testpostWSI4PointRelaisRecherche())