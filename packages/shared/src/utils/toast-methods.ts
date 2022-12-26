import { toast } from "react-toastify";

export const notify = (myToast: any, message: string) =>
  (myToast.current = toast(message, {
    autoClose: false,
    closeButton: false,
    type: toast.TYPE.INFO,
  }));

export const updateToast = (myToast: any, type: "SUCCESS" | "ERROR" | "INFO", message: string) => {
  toast.update(myToast.current, {
    render: message,
    type: toast.TYPE[type],
    autoClose: 6000,
  });
};
