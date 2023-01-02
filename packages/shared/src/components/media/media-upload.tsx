import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
// Components
import { Italic, Paragraph } from "@shared-components/typography";
import { ErrorMessage } from "@shared-components/error-message";
import { TiDelete } from "react-icons/ti";
import { Badge } from "@shared-components/status";

interface MediaUploadProps {
  maxSize?: number;
  disabled?: boolean;
  multiple?: boolean;
  label?: string;
  maxFiles: number;
  name: string;
  accept: {
    [key: string]: string[];
  };
  previouslyUploaded?: string[];
  updateFiles: (files: any[], name: string) => void;
}
const MediaUpload = (props: MediaUploadProps) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [pastUploadedFiles, setPastUploadedFiles] = useState<string[] | null>(props.previouslyUploaded ? props.previouslyUploaded : null);

  const onDrop = (acceptedFiles: File[]) => {
    // Create a new file object with the "preview" property
    const newFiles = acceptedFiles.map((file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setError(false);

    // If multiple files are not allowed, reset the files array with the new file
    if (!props.multiple) {
      if (files.length > 0 || (pastUploadedFiles && pastUploadedFiles.length > 0)) {
        setError(true);
        setErrorMessage(`You can only upload 1 file. Delete the current file to upload a new one.`);
        return;
      }

      setPastUploadedFiles(null);
      setFiles(newFiles);
      props.updateFiles(newFiles, props.name);
    } else {
      const pastUploadedFilesLength = pastUploadedFiles ? pastUploadedFiles.length : 0;
      // If multiple files are allowed, check if the number of files is not greater than the maxFiles
      if (files.length + newFiles.length + pastUploadedFilesLength > props.maxFiles) {
        setError(true);
        setErrorMessage(`You can only upload ${props.maxFiles} files. Delete some files to upload new ones.`);
      } else {
        setError(false);
        setErrorMessage("");
        setFiles([...files, ...newFiles]);

        if (pastUploadedFiles !== null && pastUploadedFiles.length > 0) {
          props.updateFiles([...pastUploadedFiles, ...newFiles, ...files], props.name);
        } else {
          props.updateFiles([...newFiles, ...files], props.name);
        }
      }
    }
  };

  const deleteFile = (file: File) => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);

    if (pastUploadedFiles !== null && pastUploadedFiles.length > 0) {
      props.updateFiles([...pastUploadedFiles, ...newFiles], props.name);
    } else {
      props.updateFiles([...newFiles], props.name);
    }
  };

  const deletePreviouslyUploadedFile = (file: string) => {
    const pastUploadedFilesFiltered = pastUploadedFiles?.filter((f) => f !== file);
    setPastUploadedFiles(pastUploadedFilesFiltered ? pastUploadedFilesFiltered : null);

    if (pastUploadedFilesFiltered !== null && pastUploadedFilesFiltered !== undefined && pastUploadedFilesFiltered.length > 0) {
      props.updateFiles([...pastUploadedFilesFiltered, ...files], props.name);
    } else {
      props.updateFiles([...files], props.name);
    }
  };

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: props.accept,
    multiple: props.multiple ?? false,
    maxFiles: props.maxFiles ?? 1,
    maxSize: props.maxSize ? props.maxSize : 2000000,
    disabled: props.disabled ?? false,
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections.map(({ errors }: any) => {
        if (errors[0].code === "file-too-large") {
          let maxSize = props.maxSize ? props.maxSize : 2000000;
          return setError(true), setErrorMessage(`File size is too large. Max file size is exceeding ${maxSize / 1000 / 1000}Mb`);
        }
        return setError(true), setErrorMessage(errors[0].message);
      });
    }
  }, [fileRejections]);

  const prevUploads = () => {
    if (pastUploadedFiles) {
      return pastUploadedFiles.map((key: string, index: number) => (
        <div className="mb-4 flex items-center justify-center" key={index}>
          <div className="relative rounded-full bg-blue-dimmed p-1">
            <div
              onClick={() => deletePreviouslyUploadedFile(key)}
              className="absolute top-0 right-1 flex items-center justify-center rounded-full border border-red-600 bg-white"
            >
              <TiDelete size={20} className=" cursor-pointer text-red-600 text-white" />
            </div>
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={`${process.env.NEXT_PUBLIC_AWS_S3_LINK}${key}`}
              alt="upload preview"
            />
            <div className="absolute -bottom-2 right-1/2 flex translate-x-1/2 items-center justify-center">
              <Badge customClassName="text-xs px-1 py-0.5 w-24 break-words text-center" color="blue">
                {key.split("/")[1].slice(0, 20)}
              </Badge>
            </div>
          </div>
        </div>
      ));
    }
  };

  const thumbs = files.map((file: File, index: number) => (
    <div className="mb-4 flex items-center justify-center" key={file.name + "-" + index}>
      <div className="relative rounded-full bg-blue-dimmed p-1">
        <div
          onClick={() => deleteFile(file)}
          className="absolute top-0 right-1 flex items-center justify-center rounded-full border border-red-600 bg-white"
        >
          <TiDelete size={20} className=" cursor-pointer text-red-600 text-white" />
        </div>
        <img className="h-16 w-16 rounded-full object-cover" src={(file as any).preview} alt="upload preview" />
        <div className="absolute -bottom-2 right-1/2 flex translate-x-1/2 items-center justify-center">
          <Badge customClassName="text-xs px-1 py-0.5 w-24 break-words text-center" color="blue">
            {file.name.slice(0, 20)}
          </Badge>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="container mt-8">
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
        className="flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 hover:border-blue-500"
      >
        <input type="file" name={props.name} {...getInputProps()} />
        <div className="flex flex-col space-y-2">
          <Paragraph customClassName="text-center text-gray-600">Drag and drop some files here, or click to select files</Paragraph>
          <Paragraph customClassName="text-center text-gray-600">
            <>File upload limit: {props.maxFiles ? props.maxFiles : 1}</>
          </Paragraph>
        </div>
      </div>
      {pastUploadedFiles && pastUploadedFiles.length > 0 && (
        <aside className="mt-4 flex flex-col">
          <Italic customClassName="text-lg">
            <>{props.label} uploaded</>
          </Italic>
          <div className="mt-2 flex items-center space-x-8">{prevUploads()}</div>
        </aside>
      )}
      {thumbs.length > 0 && (
        <aside className="mt-4 flex flex-col">
          <Italic customClassName="text-lg">
            <>{props.label} to be uploaded</>
          </Italic>
          <div className="mt-2 flex items-center space-x-8">{thumbs}</div>
        </aside>
      )}
    </section>
  );
};

export default MediaUpload;
