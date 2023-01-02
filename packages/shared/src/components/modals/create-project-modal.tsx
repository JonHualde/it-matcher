import { useState, useEffect } from "react";
import Select from "react-select";
// Components
import Modal from "./modal";
import { Title } from "@shared-components/typography";
import { InputContainer, SelectContainer, CheckboxContainer, TextAreaContainer } from "@shared-components/containers";
import { MediaUpload } from "@shared-components/media";
// Types
import { ProjectTypes, JobTitlesTypes, ToolsAndTechnologiesTypes } from "@shared-types";

interface CreateProjectModalProps {
  jobTitles: JobTitlesTypes[];
  toolsAndTechnologies: ToolsAndTechnologiesTypes[];
  close: () => void;
}

const durationMetric = ["day", "week", "month"];
const difficulty = ["beginner", "intermediate", "advanced", "expert"];
const type = ["profitable", "non-profitable", "training project"];

const CreateProjectModal = (props: CreateProjectModalProps) => {
  const [project, setProject] = useState<ProjectTypes>({
    user_id: 0,
    created_at: "",
    updated_at: "",
    is_online: false,
    project_name: "",
    starting_on: "",
    full_name: "",
    estimated_time_duration: 0,
    estimated_time_duration_metric: "",
    description: "",
    difficulty: "",
    type: "",
    number_of_participants: 0,
    initial_investment: false,
    initial_investment_cost: 0,
    tools_and_technologies: [],
    participants_ids: [],
    job_titles_filled: [],
    job_titles_wanted: [],
    project_main_picture: "",
    attachments: [""],
  });

  const updateValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const updateValueWithCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.name]: e.target.checked });
  };

  const updateArray = (array: unknown, name: "job_titles_wanted" | "tools_and_technologies") => {
    setProject({ ...project, [name]: array });
  };

  const updateFiles = (files: File[], name: "project_main_picture" | "attachments" | string) => {
    if (name === "project_main_picture") {
      setProject({ ...project, [name]: files[0] });
    }

    if (name === "attachments") {
      setProject({ ...project, [name]: files });
    }
  };

  useEffect(() => {
    console.log(project);
  }, [project.job_titles_wanted, project.tools_and_technologies]);

  return (
    <Modal size="max-w-5xl" close={() => props.close()}>
      <Title type="h2" customClassName="text-blue-dimmed mt-6 mb-8">
        Create a new project
      </Title>
      <form>
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
              onChange={updateValue}
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
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
