import { useCallback, useEffect, useState } from "react";
import { ITask } from "../../types/task";
import { IPagination } from "../../types/common";
import { deleteTask, getListTask } from "../../services/api";
import { showErrorToast } from "../../utils/showErrorToast";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../utils/showSuccessToast";

export const useListTask = () => {
    const navigate = useNavigate();
    const [listTask, setListTask] = useState<ITask[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<IPagination>({
        perPage: 10,
        continuationToken: undefined,
    });

    const [token,setToken] = useState<string|undefined>();

    // Function to fetch tasks
    const getListTasks = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getListTask(pagination);

            if (Array.isArray(response.data)) {
                const newData = response.data as ITask[];

                setListTask((prev) => {
                    return (response.continuationToken && listTask.length >= pagination.perPage) || listTask.length >= pagination.perPage ? [...prev, ...newData] : newData    
                });

            }
            setToken(response.continuationToken);
        } catch (error) {
            showErrorToast(error);
        } finally {
            setIsLoading(false);
        }
    }, [pagination]);

    // Fetch tasks on component mount or pagination change
    useEffect(() => {
        getListTasks();
    }, [getListTasks]);

    // Handle scroll event to trigger fetching more tasks
    const handleScroll = useCallback(() => {
        const scrollPosition = Math.ceil(window.innerHeight + document.documentElement.scrollTop);
        const offsetHeight = document.documentElement.offsetHeight - 10;
        console.log("position",scrollPosition);
        console.log("offset",offsetHeight);

        if (scrollPosition >= offsetHeight && !isLoading && token) {
            setPagination((prev) => ({
                ...prev,
                continuationToken: token
            }));
        }
    }, [isLoading, token]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // Handle delete task
    const handleConfirmDelete = useCallback(async (id: number) => {
        setIsLoading(true);
        try {
            await deleteTask(id);
            showSuccessToast("Successfully deleted", () => {
                // Optionally refetch tasks or update state
                setPagination({ perPage: 10, continuationToken: undefined });
            });
        } catch (error) {
            showErrorToast(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Navigation handlers
    const handleClickEdit = (id: number) => navigate(`edit/${id}`);
    const handleClickView = (id: number) => navigate(`detail/${id}`);
    const handleClickAdd = () => navigate("create");

    return {
        data: { listTask, isLoading },
        method: { handleConfirmDelete, handleClickView, handleClickEdit, handleClickAdd }
    };
};
