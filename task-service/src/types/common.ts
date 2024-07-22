export type Pagination = {
    perPage: number
    continuationToken:string
}

export type BaseResponse = {
    response:any
    token?:string
}