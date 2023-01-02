import { useState, useEffect, useRef } from "react";
import Select from "react-select";
// Components
import Modal from "./modal";
import { Title } from "@shared-components/typography";
import { DateContainer, InputContainer, SelectContainer, CheckboxContainer, TextAreaContainer } from "@shared-components/containers";
import { MediaUpload } from "@shared-components/media";
import { ErrorMessage } from "@shared-components/error-message";
import { Button } from "@shared-components/buttons";
import { Loader } from "@shared-components/status";
// Types
import { ProjectTypes, SubmitProjectTypes, JobTitlesTypes, ToolsAndTechnologiesTypes } from "@shared-types";
// utils
import { fetchFormData, updateToast, notify } from "@shared-utils";

interface CreateProjectModalProps {
  jobTitles: JobTitlesTypes[];
  toolsAndTechnologies: ToolsAndTechnologiesTypes[];
  close: () => void;
  addCreatedProjectToList: (project: ProjectTypes) => void;
}

const durationMetric = ["day", "week", "month"];
const difficulty = ["beginner", "intermediate", "advanced", "expert"];
const type = ["profitable", "non-profitable", "training project"];

const CreateProjectModal = (props: CreateProjectModalProps) => {
  const myToast = useRef<any>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [project, setProject] = useState<SubmitProjectTypes>({
    is_online: false,
    project_name: "",
    starting_on: new Date(),
    estimated_time_duration: 0,
    estimated_time_duration_metric: "",
    description: "",
    difficulty: "",
    type: "",
    initial_investment: false,
    initial_investment_cost: 0,
    tools_and_technologies: [],
    job_titles_wanted: [],
    project_main_picture: "",
    attachments: [""],
  });

  const createProject = async () => {
    setIsSubmitting(true);
    setError(false);
    notify({ myToast, toastId: 2, message: "Creating project..." });

    // Generate a form data object with the project data
    const formData = new FormData();
    formData.append("is_online", project.is_online.toString());
    formData.append("project_name", project.project_name);
    formData.append("starting_on", project.starting_on.toString());
    formData.append("estimated_time_duration", project.estimated_time_duration.toString());
    formData.append("estimated_time_duration_metric", project.estimated_time_duration_metric);
    formData.append("description", project.description);
    formData.append("difficulty", project.difficulty);
    formData.append("type", project.type);
    formData.append("initial_investment", project.initial_investment.toString());
    formData.append("initial_investment_cost", project.initial_investment_cost.toString());
    formData.append("tools_and_technologies", JSON.stringify(project.tools_and_technologies));
    formData.append("job_titles_wanted", JSON.stringify(project.job_titles_wanted));
    formData.append("project_main_picture", project.project_main_picture);

    project.attachments.forEach((attachment) => {
      formData.append("attachments", attachment);
    });

    await fetchFormData("project", "POST", formData)
      .then((project: ProjectTypes) => {
        props.addCreatedProjectToList(project);
        updateToast({ myToast, toastId: 2, message: "Project created successfully", type: "SUCCESS" });
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
        updateToast({ myToast, toastId: 2, message: err.message, type: "ERROR" });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const updateValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const updateValueWithCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.name]: e.target.checked });
  };

  const updateArray = (array: any, name: "job_titles_wanted" | "tools_and_technologies") => {
    const newArray = array.map((item: { value: number; label: string }) => item.value);
    setProject({ ...project, [name]: newArray });
  };

  const updateFiles = (files: File[], name: "project_main_picture" | "attachments" | string) => {
    console.log("files", files);
    if (name === "project_main_picture") {
      setProject({ ...project, [name as "project_main_picture"]: files.length ? files[0] : "" });
    }

    if (name === "attachments") {
      setProject({ ...project, [name as "attachments"]: files });
    }
  };

  useEffect(() => {
    console.log(project);
  }, [project]);

  return (
    <Modal size="max-w-5xl" close={() => props.close()}>
      <Title type="h2" customClassName="text-blue-dimmed mt-6 mb-8">
        Create a new project
      </Title>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProject();
        }}
      >
        <div className="flex flex-col">
          {/* Project name and description */}
          <div className="grid grid-cols-3 gap-x-4">
            <InputContainer
              label="Project name"
              type="text"
              name="project_name"
              placeholder="Project name"
              value={project.project_name}
              onChange={updateValue}
            />
            <InputContainer
              label="Duration estimation"
              type="number"
              name="estimated_time_duration"
              placeholder="Estimated time duration"
              value={project.estimated_time_duration}
              onChange={updateValue}
            />
            <SelectContainer
              label="Duration estimation metric"
              name="estimated_time_duration_metric"
              value={project.estimated_time_duration_metric}
              onChange={updateValue}
              optionsList={durationMetric}
            />
          </div>

          <div className="grid grid-cols-3 gap-x-4">
            <SelectContainer
              label="Difficulty"
              name="difficulty"
              value={project.difficulty}
              onChange={updateValue}
              optionsList={difficulty}
            />
            <SelectContainer label="Project type" name="type" value={project.type} onChange={updateValue} optionsList={type} />
            <SelectContainer
              label="Status"
              name="is_online"
              placeholder="Is online?"
              value={project.is_online ? "Online" : "Offline"}
              onChange={(e) => {
                setProject({ ...project, is_online: e.target.value === "Online" });
              }}
              optionsList={["Online", "Offline"]}
            />
          </div>

          <div className="grid grid-cols-2">
            <DateContainer label="Starting on" name="starting_on" onChange={updateValue} value={project.starting_on.toString()} />
          </div>

          <CheckboxContainer
            label="Initial investment"
            type="checkbox"
            name="initial_investment"
            placeholder="Initial investment"
            value={project.initial_investment}
            onChange={updateValueWithCheckbox}
          />

          {project.initial_investment && (
            <InputContainer
              customClass="transition duration-500 ease-in-out"
              label="Initial investment cost (in $, approximately)"
              type="number"
              name="initial_investment_cost"
              placeholder="Initial investment cost"
              value={project.initial_investment_cost}
              onChange={(e) => setProject({ ...project, [e.target.name]: +e.target.value })}
            />
          )}

          <TextAreaContainer
            label="Project description"
            rows={8}
            name="description"
            placeholder="Project description"
            value={project.description}
            onChange={updateValue}
            counterLimit={2000}
            error={project.description.length < 2000 ? "" : "You have exceeded the 2000 character limit. Please shorten your input."}
          />

          <div className="mt-2">
            <label htmlFor="tools_and_technologies" className="font-base text-lg capitalize">
              Tools and technologies
            </label>
            <Select
              onChange={(array) => updateArray(array, "tools_and_technologies")}
              name="tools_and_technologies"
              isMulti
              isSearchable={true}
              options={props.toolsAndTechnologies.map((tool) => ({ value: tool.id, label: tool.name }))}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="job_titles_wanted" className="font-base text-lg capitalize">
              Roles
            </label>
            <Select
              onChange={(array) => updateArray(array, "job_titles_wanted")}
              name="job_titles_wanted"
              isMulti
              isSearchable={true}
              options={props.jobTitles.map((tool) => ({ value: tool.id, label: tool.name }))}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <MediaUpload
            accept={{
              "image/*": [".png", ".jpg", ".jpeg"],
            }}
            updateFiles={updateFiles}
            label="Project main picture"
            name="project_main_picture"
            maxFiles={1}
          />
          <MediaUpload
            accept={{
              "image/*": [".png", ".jpg", ".jpeg"],
              "application/pdf": [".pdf"],
              "application/msword": [".doc", ".docx"],
              "application/vnd.ms-excel": [".xls", ".xlsx"],
              "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              "application/vnd.oasis.opendocument.presentation": [".odp"],
              "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
            }}
            updateFiles={updateFiles}
            label="Project attachments"
            name="attachments"
            maxFiles={5}
            multiple={true}
          />
        </div>
        {/* Add a gray line */}
        <div className="mt-8 border-b border-gray-300" />

        {/* Add a button to submit the form */}
        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            border="border border-blue-ocean"
            text={isSubmitting ? <Loader border="border-b-2 border-r-2 border-white" /> : "Create"}
            customClass="py-2 px-4 rounded w-24 h-12 flex justify-center items-center"
            color="bg-blue-ocean"
          />
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
