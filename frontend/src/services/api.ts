import { IOptionalField } from "../context/formSettingsContext";
import axiosInstance from "../lib/axiosInstance";
import { IBaseResponse, IPagination } from "../types/common";
import { ITask } from "../types/task";

export const getListTask = async (pagination: IPagination): Promise<IBaseResponse> => {
    try {
        const response = await axiosInstance.get("/task", {
            params: {
                page: pagination.page,
                per_page: pagination.perPage
            }
        });
        return response.data as IBaseResponse;
    } catch (error) {
        throw error;
    }
}

export const getTaskById = async (id: number): Promise<IBaseResponse> => {
    try {
        const response = await axiosInstance.get(`/task/${id}`);
        return response.data as IBaseResponse;
    } catch (error) {
        throw error;
    }
}

export const createTask = async (task: ITask): Promise<IBaseResponse> => {
    try {
        const response = await axiosInstance.post("/task", task);
        return response.data as IBaseResponse;
    } catch (error) {
        throw error;
    }
}

export const deleteTask = async (id: number): Promise<IBaseResponse> => {
    try {
        const response = await axiosInstance.delete(`/task/${id}`);
        return response.data as IBaseResponse;
    } catch (error) {
        throw error;
    }
}

export const updateTask = async (id: number, task: Partial<ITask>): Promise<IBaseResponse> => {
    try {
        const response = await axiosInstance.put(`/task/${id}`, task);
        return response.data as IBaseResponse;
    } catch (error) {
        throw error;
    }
}

export const getFormSettings = async (): Promise<IBaseResponse> => {
    try {
      const response = await axiosInstance.get("/form-settings");
      return response.data as IBaseResponse;
    } catch (error) {
      throw error;
    }
  }

  export const postFormSetting = async (settings:IOptionalField[]): Promise<IBaseResponse> => {
    try {
      const response = await axiosInstance.post("/form-settings", settings);
      return response.data as IBaseResponse;
    } catch (error) {
      throw error;
    }
  }