import { CosmosClient } from "@azure/cosmos";

export const connectionString = process.env.CosmosDBConnectionString;
export const taskDb = process.env.TaskDb;
export const taskContainerName = process.env.TasksContainer;
export const formSettingContainerName = process.env.TaskFormSettings;

export const client = new CosmosClient(connectionString);
export const taskContainer = client.database(taskDb).container(taskContainerName);
export const formSettingContainer = client.database(taskDb).container(formSettingContainerName);
