import { InputContainer } from "@shared-components/input-container";
import { TextArea } from "@shared-components/text-area";
import React from "react";

interface GeneralInformationProps {
  updateProject: (key: string, value: any) => void;
}

const GeneralInformation = (props: GeneralInformationProps) => {
  return (
    <>
      <h5 className="mt-[43px] mb-[28px] text-blue-dimmed">GENERAL INFORMATION</h5>
      <div className="mb-[50px] flex flex-col">
        <div className="mb-5 mt-0 w-full">
          <input
            accept="image/*"
            name="mainPicture"
            type="file"
            onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
            className="w-full"
          />
        </div>

        <InputContainer
          type="text"
          name="project_name"
          placeholder="Project name"
          label="Project Name"
          onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
        />

        <div className="flex w-full flex-col lg:flex-row">
          <InputContainer
            type="text"
            name="starting_on"
            placeholder="01/01/2023"
            label="Starting Date"
            onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
            width="1/2 lg:mr-4"
          />
          <div className="flex w-1/2">
            <InputContainer
              type="number"
              name="estimated_time_duration"
              label="Estimated Duration (number)"
              placeholder="1"
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
              width="1/2 lg:mr-4"
            />
            <div className="mb-4 flex w-1/2 flex-col">
              <label htmlFor="estimated_time_duration_metric"> Duration </label>
              <select
                value={""}
                name="estimated_time_duration_metric"
                id="estimated_time_duration_metric"
                onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
                className="border-2 border-gray-200 py-4 px-3 focus:outline-none"
              >
                <option value="" disabled>
                  Choose a duration
                </option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
          </div>
        </div>

        <TextArea
          rows={10}
          name="description"
          label="Description of the project"
          placeholder="Description"
          onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
        />

        <div className="flex flex-col lg:flex-row">
          <div className="mb-4 mr-4 flex w-1/2 flex-col">
            <label htmlFor="difficulty"> Difficulty of the project </label>
            <select
              value={""}
              name="difficulty"
              id="difficulty"
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
              className="border-2 border-gray-200 py-3 px-3 focus:outline-none"
            >
              <option value="" disabled>
                Set a difficulty level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="mb-4 flex w-1/2 flex-col">
            <label htmlFor="type"> Type of the project </label>
            <select
              value={""}
              name="type"
              id="type"
              className="border-2 border-gray-200 py-3 px-3 focus:outline-none"
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
            >
              <option value="" disabled>
                Set a type
              </option>
              <option value="Training">Training</option>
              <option value="Non-profitable">Non-profitable</option>
              <option value="Commercial">Commercial (profitable)</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInformation;
