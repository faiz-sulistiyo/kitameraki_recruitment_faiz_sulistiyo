import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getTask, insertTask, deleteTaskById, getTaskById, updateTaskById } from "../repositories/taskRepository";
import { Pagination } from "../types/common";
import { Task } from "../types/task";
import { sanitizeResponse } from "../utils/sanitizeResponse";
import { baseHttpHandler } from "../utils/baseHttpHandler";

export async function getTaskHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const perPage = parseInt(req.query.get('perPage') || '0', 0);
    const continuationToken = req.headers.get('Continuation-Token') || undefined;

    const pagination: Pagination = {
        perPage,
        continuationToken
    };

    const { response, token } = await getTask(pagination);

    return {
        jsonBody: {
            message: "Tasks fetched successfully",
            data: sanitizeResponse(response),
            continuationToken:token
        },
        headers: {
            'continuation-token': token || '',
        },
    };
}

export async function getTaskByIdHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const id = req.params.id;
    if (!id) {
        return {
            status: 400,
            jsonBody: {
                message: "Invalid Request: Missing task ID",
                data: null
            }
        };
    }

    const { response } = await getTaskById(id);

    if (!response) {
        return {
            status: 404,
            jsonBody: {
                message: `Data with id: ${id} doesn't exist`,
                data: null
            }
        };
    }

    return {
        jsonBody: {
            message: "Task fetched successfully",
            data: sanitizeResponse(response)
        }
    };
}

export async function postTaskHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const task: Task = await req.json() as Task;
    const { response: newTask } = await insertTask(task);

    return {
        jsonBody: {
            message: "Task created successfully",
            data: sanitizeResponse(newTask)
        }
    };
}

export async function putTaskHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const task: Task = await req.json() as Task;
    const id = req.params.id;
    if (!id) {
        return {
            status: 400,
            jsonBody: {
                message: "Invalid Request: Missing task ID",
                data: null
            }
        };
    }

    const existingTask = await getTaskById(id);

    if (!existingTask.response) {
        return {
            status: 404,
            jsonBody: {
                message: `Data with id: ${id} doesn't exist`,
                data: null
            }
        };
    }

    const { response: updatedTask } = await updateTaskById(id, task);

    return {
        jsonBody: {
            message: "Task updated successfully",
            data: sanitizeResponse(updatedTask)
        }
    };
}

export async function deleteTaskHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const id = req.params.id;
    if (!id) {
        return {
            status: 400,
            jsonBody: {
                message: "Invalid Request: Missing task ID",
                data: null
            }
        };
    }

    const existingTask = await getTaskById(id);

    if (!existingTask.response) {
        return {
            status: 404,
            jsonBody: {
                message: `Data with id: ${id} doesn't exist`,
                data: null
            }
        };
    }

    const { response } = await deleteTaskById(id);

    return {
        status: 200,
        jsonBody: {
            message: "Task deleted successfully",
            data: sanitizeResponse(response)
        }
    };
}

app.http('task', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'v1/task/',
    handler: (req, ctx) => baseHttpHandler(req, ctx, {
        get: getTaskHandler,
        post: postTaskHandler
    })
});

app.http('task_id', {
    methods: ['GET', 'DELETE', 'PUT'],
    authLevel: 'anonymous',
    route: 'v1/task/{id}',
    handler: (req, ctx) => baseHttpHandler(req, ctx, {
        get: getTaskByIdHandler,
        put: putTaskHandler,
        delete: deleteTaskHandler
    })
});
