import { useState, useEffect } from "react";

// Forms
import GeneralInformation from "./update-project/general-information";
import AboutTheTeam from "./update-project/about-the-team";
import Other from "./update-project/other";

const UpdateProjectForm = () => {
  const [project, setProject] = useState({
    mainPicture: null,
    projectName: "",
    startingOn: null,
    estimatedTimeDuration: null,
    estimatedTimeDurationMetric: null,
    description: "",
    difficulty: "",
    type: "",
    searchingFor: [],
    numberOfParticipant: null,
    initialInvestment: "",
    initialInvestmentCost: null,
    toolsAndTechnologies: "",
    attachments: null,
    putOnline: null,
    userId: null,
  });

  const updateProject = (key: string, value: any) => {
    setProject((project: any) => {
      project[key] = value;
      return project;
    });
  };

  return (
    <form className="mx-auto w-full px-6">
      {/* GENERAL INFORMATION */}
      <GeneralInformation updateProject={updateProject} />

      {/* ABOUT THE TEAM AND THE TECHNOLOGIES */}
      <AboutTheTeam updateProject={updateProject} />

      {/* OTHER */}
      <Other updateProject={updateProject} />
    </form>
  );
};

export default UpdateProjectForm;
