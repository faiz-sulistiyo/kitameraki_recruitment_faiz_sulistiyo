import { toast } from "react-toastify"

export const showSuccessToast = (msg:string,onClose:()=>void) =>{
    return toast.success(msg,{
        autoClose:1000,
        onClose
    })
}