import { FiAlertCircle } from "react-icons/fi";

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <div className="my-3 py-3 px-6 text-lg bg-red rounded-sm text-white text-sm flex items-center">
      <FiAlertCircle className="mr-3" />
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
