export type Task = Partial<TaskOptional> & {
    id?:string,
    title:string,
    description:string
}

export type TaskOptional = {
    [key:string]:string|number
}