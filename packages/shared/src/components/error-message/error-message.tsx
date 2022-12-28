import { FiAlertCircle } from "react-icons/fi";

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <div className="my-3 flex items-center rounded-sm bg-red-600 py-3 px-6 text-lg text-sm text-white">
      <FiAlertCircle className="mr-3" />
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
