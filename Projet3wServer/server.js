import express from 'express';
import cors from 'cors';
//5import fs from 'fs';

import { router } from './app/router.js';

const serverPort = 5000
const corsOptions = {
    origin: 'https://localhost:4200',
};
// configuration SSL_______________________________
/*
const serverOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};
*/
// server _________________________________________
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/json_pointrelais', router)

//const server = https.createServer(serverOptions, app);

app.listen(serverPort, () => console.log('Listening on port 5000...'));

//import {testpostWSI4PointRelaisRecherche} from './app/test-requests.js'
//console.log(testpostWSI4PointRelaisRecherche())
