import express from 'express';
import cors from 'cors';
//5import fs from 'fs';

import { router } from './app/router.js';

const serverPort = 5000
const corsOptions = {
    origin: 'https://localhost:4200',
};

// server _________________________________________
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/news', router)

app.listen(serverPort, () => console.log('Listening on port 5000...'));