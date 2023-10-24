import md5 from "md5" //const md5 = require('md5');

export async function jsonToXml(body) {
console.log(body)
    let securityKey = md5(body.Enseigne +
        body.Pays +
        body.CP +
        "PrivateK").toUpperCase();

    const xmlBody = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
                        <Enseigne>${body.Enseigne}</Enseigne>
                        <Pays>${body.Pays}</Pays>
                        <CP>${body.CP}</CP>
                        <Security>${securityKey}</Security>
                        </WSI4_PointRelais_Recherche>
                    </soap:Body>
                    </soap:Envelope>`
    return xmlBody;
}