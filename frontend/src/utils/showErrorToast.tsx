import { toast } from "react-toastify"

export const showErrorToast = (error:any) => {
    return toast.error(error?.message?.toString());
}