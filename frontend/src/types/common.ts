import { ITask } from "./task"

export interface IPagination {
    page:number,
    perPage:number
}

export interface IBaseResponse extends Partial<IPaginationResponse> {
    message:string
    data: ITask | ITask[]
}

export interface IPaginationResponse {
    currentPage: number,
    perPage: number,
    totalItems: number,
    totalPages: number,
}