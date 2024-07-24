import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { baseHttpHandler } from "../utils/baseHttpHandler";
import { deleteAllFormSetting, getFormSettings, insertBulkFormSetting } from "../repositories/formSettingRepository";
import { sanitizeResponse } from "../utils/sanitizeResponse";
import { FormSetting } from "../types/formSetting";

const getFormSettingHandler = async (req: HttpRequest): Promise<HttpResponseInit> => {
    const { response } = await getFormSettings();
    return {
        jsonBody: {
            message: "Form settings fetched successfully",
            data: sanitizeResponse(response)
        }
    };
}

const postFormSettingHandler = async (req: HttpRequest): Promise<HttpResponseInit> => {
    const body = await req.json() as FormSetting[];
    // Step 1: Delete all existing items
    await deleteAllFormSetting();

    // Step 2: Insert all new items
    const { response } = await insertBulkFormSetting(body);
    return {
        jsonBody: {
            message: "Form settings updated successfully",
            data: sanitizeResponse(response)
        }
    };
}

app.http('formSettings', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'v1/form-setting',
    handler: (req, ctx) => baseHttpHandler(req, ctx, {
        get: getFormSettingHandler,
        post: postFormSettingHandler
    })
});
