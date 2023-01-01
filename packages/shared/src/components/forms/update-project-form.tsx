import { useState, useEffect } from "react";

// Forms
import GeneralInformation from "./update-project/general-information";
import AboutTheTeam from "./update-project/about-the-team";
import Other from "./update-project/other";

const UpdateProjectForm = () => {
  const [project, setProject] = useState({
    mainPicture: null,
    project_name: "",
    starting_on: null,
    estimated_time_duration: null,
    estimated_time_duration_metric: null,
    description: "",
    difficulty: "",
    type: "",
    searchingFor: [],
    number_of_participants: null,
    initial_investment: "",
    initial_investmentCost: null,
    tools_and_technologies: "",
    attachments: null,
    putOnline: null,
    user_id: null,
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
