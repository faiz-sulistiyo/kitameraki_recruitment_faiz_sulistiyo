import { useCallback, useEffect, useState } from "react"
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
        page: 1,
        perPage: 10,
    })

    const getListTasks = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getListTask(pagination);
            if (Array.isArray(response.data)) {
                const newData = response.data as ITask[];

                setListTask((prev) => {
                    return pagination.page > 1 ? [...prev, ...newData] : newData;
                });
            }
        } catch (error) {
            setIsLoading(false);
            showErrorToast(error);
        }
        setIsLoading(false);
    }, [pagination]);

    useEffect(() => {
        getListTasks();
    }, [getListTasks]);

    const handleScroll = () => {
        const scrollPostition = Math.ceil(window.innerHeight + document.documentElement.scrollTop) + 1;
        const offsetHeight = document.documentElement.offsetHeight;
        if (scrollPostition >= offsetHeight && !isLoading) {
            setPagination((prev) => ({
                ...prev,
                page: prev.page + 1
            }))
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleConfirmDelete = useCallback(async (id: number) => {
        setIsLoading(true);
        try {
            await deleteTask(id);
        } catch (error) {
            setIsLoading(false)
            showErrorToast(error);
        }
        setIsLoading(false);
        showSuccessToast("Success Delete", () => {
            setPagination((prev) => ({ ...prev, page: 1 }));
        })
    }, [])

    const handleClickEdit = (id: number) => {
        navigate(`edit/${id}`)
    }

    const handleClickView = (id: number) => {
        navigate(`detail/${id}`)
    }

    const handleClickAdd = () => {
        navigate("create")
    }

    return {
        data: { listTask, isLoading },
        method: { handleConfirmDelete, handleClickView, handleClickEdit, handleClickAdd }
    }
}