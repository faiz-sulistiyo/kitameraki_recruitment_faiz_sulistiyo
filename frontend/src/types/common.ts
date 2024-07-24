import { IOptionalField } from "../context/formSettingsContext"
import { ITask } from "./task"

export interface IPagination {
    continuationToken?:string,
    perPage:number
}

export interface IBaseResponse extends Partial<IPaginationResponse> {
    message:string
    data: ITask | ITask[] | IOptionalField[]
    continuationToken?:string
}

export interface IPaginationResponse {
    currentPage: number,
    perPage: number,
    totalItems: number,
    totalPages: number,
}