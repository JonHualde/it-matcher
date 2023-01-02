import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
// Components
import { Italic, Paragraph } from "@shared-components/typography";
import { ErrorMessage } from "@shared-components/error-message";

interface ImageUploadProps {
  maxSize?: number;
  disabled?: boolean;
  multiple?: boolean;
  label?: string;
  maxFiles?: number;
  name: string;
}
const ImageUpload = (props: ImageUploadProps) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Create a new file object with the "preview" property
    const newFiles = acceptedFiles.map((file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // If

    console.log("acceptedFiles", acceptedFiles);
    setFiles(
      acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );

    // Add new files to existing files, adding the "preview" property to every acceptedFiles
  }, []);

  useEffect(() => {
    console.log("files", files);
  }, [files]);

  const { open, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    multiple: props.multiple ?? false,
    maxFiles: props.maxFiles ?? 1,
    maxSize: props.maxSize ? props.maxSize : 2000000,
    disabled: props.disabled ?? false,
  });

  const thumbs = files.map((file: File) => (
    <div className="mb-4 flex items-center justify-center" key={file.name}>
      <div className="rounded-full bg-gray-400 p-1">
        <img className="h-12 w-12 rounded-full object-cover" src={(file as any).preview} alt="upload preview" />
      </div>
    </div>
  ));

  return (
    <section className="container mt-8" onClick={open}>
      {props.label && (
        <label htmlFor={props.name} className="font-base text-lg capitalize">
          {props.label}
        </label>
      )}
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <div
        {...getRootProps({
          className: "dropzone",
        })}
        onClick={open}
        className="flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed hover:border-green-600"
      >
        <input type="file" name={props.name} {...getInputProps()} />
        <div className="flex flex-col space-y-2" onClick={open}>
          <Paragraph customClassName="text-center text-gray-600">Drag 'n' drop some files here, or click to select files</Paragraph>
          <Paragraph customClassName="text-center text-gray-600">
            <>File upload limit: {props.maxFiles ? props.maxFiles : 1}</>
          </Paragraph>
        </div>
      </div>
      {thumbs.length > 0 && (
        <aside className="mt-4 flex flex-col">
          <Italic customClassName="text-lg">
            <>{props.label} uploaded</>
          </Italic>
          <div className="mt-2 flex items-center space-x-4">{thumbs}</div>
        </aside>
      )}
    </section>
  );
};

export default ImageUpload;
