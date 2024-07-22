import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

interface IBaseHandlerOptions {
    get?: (req: HttpRequest) => Promise<HttpResponseInit>;
    post?: (req: HttpRequest) => Promise<HttpResponseInit>;
    put?: (req: HttpRequest) => Promise<HttpResponseInit>;
    delete?: (req: HttpRequest) => Promise<HttpResponseInit>;
}

export const baseHttpHandler = async (req: HttpRequest, context:InvocationContext, options: IBaseHandlerOptions): Promise<HttpResponseInit> => {
    context.log(`[Process Request] "${req.method} ${req.url}"`);
    switch (req.method) {
        case "GET":
            if (options.get) return await options.get(req);
            break;
        case "POST":
            if (options.post) return await options.post(req);
            break;
        case "PUT":
            if (options.put) return await options.put(req);
            break;
        case "DELETE":
            if (options.delete) return await options.delete(req);
            break;
    }
    return {
        status: 405,
        jsonBody: { message: "Method Not Allowed" },
    };
};
