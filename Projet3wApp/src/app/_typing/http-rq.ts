export interface Article {
    author: string,
    content: null|string,
    description: null|string,
    publishedAt: string //"2023-10-23T21:21:00Z"
    source: {
        id:   string,
        name: string,
    }
    title: string,
    url: string,
    urlToImage: string|null
}

export interface rqGetNews {
    articles: Array<Article>
    status: "ok"
    totalResults: number
}

export interface BodyUser{
    username:string,
    password:string,
}