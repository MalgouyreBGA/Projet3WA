import dotenv from 'dotenv';

dotenv.config();
export const config = {
    baseUrl     : "https://newsapi.org/v2",
    apiKeyNews  : process.env.API_KEY,
    secretKey   : process.env.tokens_secret_key
}