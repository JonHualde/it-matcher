import Modal from "./modal";
import { useState } from "react";
// Components
import { Title } from "@shared-components/typography";
import { InputContainer, SelectContainer, CheckboxContainer, TextAreaContainer } from "@shared-components/containers";
import { Badge } from "@shared-components/status";
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

  const addElementToArray = (item: JobTitlesTypes | ToolsAndTechnologiesTypes, name: "job_titles_wanted" | "tools_and_technologies") => {
    if ((project as ProjectTypes)[name].includes(item.id)) {
      const filteredArray = project[name].filter((element) => element !== item.id);
      setProject({ ...project, [name]: filteredArray });
    } else {
      setProject({ ...project, [name]: [...project[name], item.id] });
    }
  };

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
              label="Estimated time duration"
              type="number"
              name="estimated_time_duration"
              placeholder="Estimated time duration"
              value={project.estimated_time_duration}
              onChange={updateValue}
            />
            <SelectContainer
              label="Estimated time duration metric"
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
          </div>
          <CheckboxContainer
            label="Is online?"
            type="checkbox"
            name="is_online"
            placeholder="Is online?"
            value={project.is_online}
            onChange={updateValueWithCheckbox}
          />
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
          />

          <div className="mt-2">
            <label className="font-base text-lg capitalize">Select the tools and technologies you want to use</label>
            <div className="flex flex-wrap gap-2">
              {props.toolsAndTechnologies.map((tool: ToolsAndTechnologiesTypes) => (
                <Badge
                  click={() => addElementToArray(tool, "tools_and_technologies")}
                  key={tool.id}
                  customClassName="cursor-pointer transform hover:scale-110 transition duration-150 ease-in-out"
                  color={project.tools_and_technologies.includes(tool.id) ? "blue" : "gray"}
                >
                  {tool.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="font-base text-lg capitalize">Select the roles you want to fill</label>
            <div className="flex flex-wrap gap-2">
              {props.jobTitles.map((role: JobTitlesTypes) => (
                <Badge
                  click={() => addElementToArray(role, "tools_and_technologies")}
                  key={role.id}
                  customClassName="cursor-pointer transform hover:scale-110 transition duration-150 ease-in-out"
                  color={project.tools_and_technologies.includes(role.id) ? "blue" : "gray"}
                >
                  {role.name}
                </Badge>
              ))}
            </div>
          </div>

          <InputContainer
            label="Project main picture"
            type="text"
            name="project_main_picture"
            placeholder="Project main picture"
            value={project.project_main_picture}
            onChange={updateValue}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
