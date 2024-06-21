export interface ITask extends ITaskOptional {
    id:number,
    title:string,
    description:string
}

export interface ITaskOptional {
    [key:string]:string|number
}