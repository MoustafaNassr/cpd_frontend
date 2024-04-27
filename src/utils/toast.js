import { toast } from "react-toastify";

export const TOAST_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  INFO: 'info',
  ERROR: 'error'
}

export const showToast = (type, content) => {
  return toast[type](content, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}