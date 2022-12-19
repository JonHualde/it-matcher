import InputContainer from "@shared-components/input-container/input-container";
import { TextArea } from "@shared-components/text-area";

interface GeneralInformationProps {
  updateProject: (key: string, value: any) => void;
}

const AboutTheTeam = (props: GeneralInformationProps) => {
  return (
    <>
      <h5 className="mt-[49px] mb-[28px] text-blue-dimmed">ABOUT THE TEAM AND THE TECHNOLOGIES</h5>
      <div className="mb-[50px]">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="mb-4 mr-4 flex w-1/2 flex-col">
            <label htmlFor="searchingFor"> I'm searching for </label>
            <select
              value={""}
              name="searchingFor"
              id="searchingFor"
              className="border-2 border-gray-200 py-4 px-3 focus:outline-none"
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
            >
              <option value="" disabled>
                Select profile(s)
              </option>
              <option value="frontendDeveloper">Frontend developer</option>
              <option value="backendDeveloper">Backend developer</option>
              <option value="devOpsEngineer">DevOps Engineer</option>
              <option value="designer">UI/UX designer</option>
              <option value="copywriter">Copywriter</option>
              <option value="dataAnalyst">Data analyst</option>
              <option value="aiEngineer">AI Engineer</option>
              <option value="videoGameDeveloper">Video game developer</option>
              <option value="teamLeader">Team leader</option>
              <option value="productManager">Product manager</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4 flex w-1/2 flex-col">
            <InputContainer
              type="number"
              placeholder="1,2,3..."
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
              name="numberOfParticipant"
              label="How many people will be working on this project?"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="mb-4 mr-4 flex w-1/2 flex-col">
            <label htmlFor="initialInvestment">Is there an initial investment? (Servers, Subscription...)</label>
            <select
              value={""}
              name="initialInvestment"
              id="initialInvestment"
              className="border-2 border-gray-200 py-4 px-3 focus:outline-none"
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
            >
              <option value="" disabled>
                Initial Investment
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4 flex w-1/2 flex-col">
            <InputContainer
              type="number"
              name="initialInvestmentCost"
              placeholder="15"
              onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
              label="If yes, how much would that cost to every member? (approx. in $)"
            />
          </div>
        </div>

        <TextArea
          rows={5}
          name="toolsAndTechnologies"
          placeholder="React, Figma, Jira..."
          onChange={(e: any) => props.updateProject(e.target.name, e.target.value)}
          label="Tech stack (Brief overview of the tech stack you want to use on this project)"
        />
      </div>
    </>
  );
};

export default AboutTheTeam;
