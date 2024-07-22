import { taskContainer } from "../config/config"
import { BaseResponse, Pagination } from "../types/common";
import { Task } from "../types/task"

export const insertTask = async (body: Task): Promise<BaseResponse> => {
    const { resource } = await taskContainer.items.create(body);
    return { response: resource };
}

export const getTask = async (req: Pagination): Promise<BaseResponse> => {
    const { resources: response, continuationToken: token } = await taskContainer.items.readAll({
        continuationToken: req.continuationToken,
        maxItemCount: req.perPage || 100
    }).fetchNext();

    return { response, token }
}

export const updateTaskById = async (id: string, body: Partial<Task>): Promise<BaseResponse> => {
    const { resource: existingTask } = await taskContainer.item(id, id).read();
    const updatedTask = { ...existingTask, ...body };
    const { resource: response } = await taskContainer.item(id, id).replace(updatedTask);
    return { response };
}

export const getTaskById = async (id: string): Promise<BaseResponse> => {
    const { resource: response } = await taskContainer.item(id, id).read();
    return { response };
}

export const deleteTaskById = async (id: string): Promise<BaseResponse> => {
    const { resource: response } = await taskContainer.item(id, id).delete();
    return { response }
}