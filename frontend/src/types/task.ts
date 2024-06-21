export interface ITask extends Partial<ITaskOptional> {
    id?:number,
    title:string,
    description:string
}

export interface ITaskOptional {
    [key:string]:string|number
}