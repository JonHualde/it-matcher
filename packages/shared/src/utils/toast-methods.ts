import { toast, Zoom } from "react-toastify";

export const notify = (myToast: any, message: string, autoClose?: boolean) =>
  (myToast.current = toast(message, {
    autoClose: autoClose ? 4000 : false,
    closeButton: true,
    type: toast.TYPE.INFO,
    transition: Zoom,
  }));

export const updateToast = (myToast: any, type: "SUCCESS" | "ERROR" | "INFO", message: string) => {
  toast.update(myToast.current, {
    render: message,
    type: toast.TYPE[type],
    autoClose: 4000,
    transition: Zoom,
  });
};

export const dismiss = (myToast: any) => toast.dismiss(myToast.current);
