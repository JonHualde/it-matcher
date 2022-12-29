import { Paragraph } from "@shared-components/typography";
import { FiAlertCircle } from "react-icons/fi";

interface ErrorMessageProps {
  errorMessage: string[] | string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <div className="my-3 flex flex-col items-center rounded-sm bg-red-600 py-2 px-6 text-lg text-sm text-white">
      <FiAlertCircle className="sm:text-md my-2 text-xl" />
      {Array.isArray(errorMessage) ? (
        <ul className="list-disc">
          {errorMessage.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : (
        <Paragraph>{errorMessage as string}</Paragraph>
      )}
    </div>
  );
};

export default ErrorMessage;
