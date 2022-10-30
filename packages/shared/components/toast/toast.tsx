interface ToastSuccessProps {
  successMessage: string;
}

const Toast = ({ successMessage }: ToastSuccessProps) => (
  <div className="flex items-center relative">{successMessage}</div>
);

export default Toast;
