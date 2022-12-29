import { toast, Zoom } from "react-toastify";

interface NotifyArguments {
  myToast: any;
  message: string;
  toastId?: number;
  autoClose?: number;
}

export const notify = (params: NotifyArguments) => {
  const { myToast, message, toastId, autoClose } = params;

  myToast.current = toast(message, {
    autoClose: autoClose ? autoClose : false,
    closeButton: true,
    type: toast.TYPE.INFO,
    transition: Zoom,
    toastId,
  });
};

interface UpdateToastArguments {
  myToast: any;
  type: "SUCCESS" | "ERROR" | "INFO";
  message: string;
  toastId?: number;
}

export const updateToast = (params: UpdateToastArguments) => {
  const { myToast, type, message, toastId } = params;

  toast.update(myToast.current, {
    render: message,
    type: toast.TYPE[type],
    autoClose: 5000,
    transition: Zoom,
    toastId,
  });
};

export const dismissAll = () => toast.dismiss();
