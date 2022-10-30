import InputContainer from "components/input-container/input-container";
import { TextArea } from "components/text-area";
import React from "react";

interface GeneralInformationProps {
  updateProject: (key: string, value: any) => void;
}

const GeneralInformation = (props: GeneralInformationProps) => {
  return (
    <>
      <h5 className="text-blue-dimmed mt-[43px] mb-[28px]">GENERAL INFORMATION</h5>
      <div className="mb-[50px] flex flex-col">
        <div className="w-full mb-5 mt-0">
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
          name="projectName"
          placeholder="Project name"
          label="Project Name"
          onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
        />

        <div className="flex flex-col lg:flex-row w-full">
          <InputContainer
            type="text"
            name="startingOn"
            placeholder="01/01/2023"
            label="Starting Date"
            onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
            width="1/2 lg:mr-4"
          />
          <div className="w-1/2 flex">
            <InputContainer
              type="number"
              name="estimatedTimeDuration"
              label="Estimated Duration (number)"
              placeholder="1"
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
              width="1/2 lg:mr-4"
            />
            <div className="flex flex-col mb-4 w-1/2">
              <label htmlFor="estimatedTimeDurationMetric"> Duration </label>
              <select
                value={""}
                name="estimatedTimeDurationMetric"
                id="estimatedTimeDurationMetric"
                onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
                className="focus:outline-none py-4 px-3 border-2 border-gray-200"
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
          <div className="flex flex-col mb-4 w-1/2 mr-4">
            <label htmlFor="difficulty"> Difficulty of the project </label>
            <select
              value={""}
              name="difficulty"
              id="difficulty"
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
              className="focus:outline-none py-3 px-3 border-2 border-gray-200"
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
          <div className="flex flex-col mb-4 w-1/2">
            <label htmlFor="type"> Type of the project </label>
            <select
              value={""}
              name="type"
              id="type"
              className="focus:outline-none py-3 px-3 border-2 border-gray-200"
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
