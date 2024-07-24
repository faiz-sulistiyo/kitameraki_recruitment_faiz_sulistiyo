import { OperationInput } from "@azure/cosmos";
import { formSettingContainer } from "../config/config";
import { BaseResponse } from "../types/common";
import { FormSetting } from "../types/formSetting";


export const getFormSettings = async (): Promise<BaseResponse> => {
    const { resources: response } = await formSettingContainer.items.readAll().fetchAll();
    return { response }
}

export const insertBulkFormSetting = async (body: FormSetting[]): Promise<BaseResponse> => {
    const bulkInsert: OperationInput[] = body.map((item) => {
        return {
            operationType: "Create",
            resourceBody: item
        }
    });

    const res = await formSettingContainer.items.bulk(bulkInsert);
    return { response: res };
}

export const deleteAllFormSetting = async (): Promise<BaseResponse> => {
    const { resources: existingFormSetting } = await formSettingContainer.items.readAll().fetchAll();
    const bulkDelete: OperationInput[] = existingFormSetting.map((item) => {
        return {
            operationType: "Delete",
            id: item.id,
            partitionKey: item.id
        }
    });
    const res = await formSettingContainer.items.bulk(bulkDelete);
    return { response: res };
}