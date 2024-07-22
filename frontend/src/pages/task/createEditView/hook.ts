import { useCallback, useEffect, useMemo, useState } from "react"
import { matchRoutes, useLocation, useNavigate, useParams } from "react-router-dom";
import { showErrorToast } from "../../../utils/showErrorToast";
import { createTask, getTaskById, updateTask } from "../../../services/api";
import { ITask } from "../../../types/task";
import { routes } from "../../../routes";
import { showSuccessToast } from "../../../utils/showSuccessToast";
import { useFormSettingsContext } from "../../../context/formSettingsContext";

export const useCreateEditViewTask = () => {
    const { id } = useParams();
    const location = useLocation();
    const matchedRoutes = matchRoutes(routes, location);
    const activeRoute = matchedRoutes?.[matchedRoutes.length - 1]?.route;
    const navigate = useNavigate();
    const { optionalFields } = useFormSettingsContext();

    const isReadOnly = useMemo(() => {
        return activeRoute?.path?.includes("detail");
    }, [activeRoute])

    const initialData = {
        description: "",
        title: "",
        ...optionalFields?.[0]?.items?.reduce((acc, curr) => {
            acc[curr.name || ""] = "";
            return acc;
        }, {} as Record<string, string>)
    }

    const [task, setTask] = useState<ITask>(initialData)

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getCurrentTask = useCallback(async () => {
        if (id) {
            setIsLoading(true);
            try {
                const response = await getTaskById(Number(id));
                if (!Array.isArray(response.data)) {
                    setTask((prev) => ({
                        ...prev,
                        ...response.data as Record<string, string>
                    }));
                }

            } catch (error) {
                setIsLoading(false);
                showErrorToast(error)
            }
            setIsLoading(false);
        }
    }, [id]);

    const handleChangeText = (key: string,val: string|number) => {
        setTask((prev) => ({ ...prev, [key]: val }));
    }

    const addNewTask = useCallback(async () => {
        setIsLoading(true);
        try {
            await createTask(task);
        } catch (error) {
            setIsLoading(false);
            showErrorToast(error);
        }
        setIsLoading(false);
    }, [task]);

    const editTask = useCallback(async () => {
        setIsLoading(true);
        try {
            await updateTask(Number(id), task);
        } catch (error) {
            setIsLoading(false);
            showErrorToast(error)
        }
        setIsLoading(false);
    }, [task]);

    const handleSubmit = useCallback(async () => {
        // return;
        if (!!id) {
            await editTask();
        } else {
            await addNewTask();
        }
        showSuccessToast("Successfully Submited", () => {
            navigate('/task');
        })
    }, [id, task])

    const handleResetForm = () => {
        setTask(initialData);
    }

    useEffect(() => {
        getCurrentTask();
    }, [getCurrentTask])

    return {
        data: { task, isReadOnly, isLoading, activeRoute, optionalFields },
        method: { handleSubmit, handleChangeText,handleResetForm }
    }
}