import { useEffect, useState, useRef } from "react";
import { PrivatePageLayout } from "@shared-components/layouts";
import ProjectCard from "shared/src/components/project-card/project-card";
// Components
import { Loader } from "@shared-components/status";
import { Box } from "@shared-components/box";
import { Paragraph } from "@shared-components/typography";
import { EditProjectModal, ShowUserModal, DeleteProjectModal, CreateProjectModal } from "@shared-components/modals";
import { Button } from "@shared-components/buttons";
import { ErrorMessage } from "@shared-components/error-message";
// type
import { ProjectTypes, BasicUserDetails, JobTitlesTypes, ToolsAndTechnologiesTypes } from "@shared-types";
// utils
import { fetchJSON, notify, updateToast } from "@shared-utils";

const Projects = (props: any) => {
  const myToast = useRef<any>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BasicUserDetails | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectTypes | null>(null);
  const [projects, setProjects] = useState<ProjectTypes[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitlesTypes[]>([]);
  const [toolsAndTechnologies, setToolsAndTechnologies] = useState<ToolsAndTechnologiesTypes[]>([]);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

  const getJobTitles = async () => {
    fetchJSON("job-titles", "GET")
      .then((jobTitles: JobTitlesTypes[]) => {
        setJobTitles(jobTitles);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setErrorMessage(err.message);
      });
  };

  const getToolsAndTechnologies = async () => {
    fetchJSON("tools-and-technologies", "GET")
      .then((toolsAndTechnologies: ToolsAndTechnologiesTypes[]) => {
        setToolsAndTechnologies(toolsAndTechnologies);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setErrorMessage(err.message);
      });
  };

  const openDeleteProjectModal = () => {
    setShowDeleteProjectModal(true);
  };

  const openEditProjectModal = () => {
    setShowEditProjectModal(true);
  };

  const deleteProject = async (project: ProjectTypes) => {
    return "(hey";
  };

  const updateProject = async (project: ProjectTypes) => {
    return "hey";
  };

  const addCreatedProjectToList = (project: ProjectTypes) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const getProjects = async () => {
    fetchJSON("project/user", "GET")
      .then((projects: ProjectTypes[]) => {
        setProjects(projects);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProjects();
    getJobTitles();
    getToolsAndTechnologies();
  }, []);

  const cta = () => (
    <Button
      border="border border-blue-ocean"
      text="Create a new project"
      customClass="py-2 px-4 rounded"
      action={() => setOpenCreateProjectModal(true)}
      color="bg-blue-ocean"
    />
  );

  return (
    <PrivatePageLayout title="My projects" pathname={props.pathname} cta={cta()}>
      {error && <ErrorMessage errorMessage={errorMessage} />}
      {openCreateProjectModal && (
        <CreateProjectModal
          toolsAndTechnologies={toolsAndTechnologies}
          jobTitles={jobTitles}
          close={() => setOpenCreateProjectModal(false)}
          addCreatedProjectToList={addCreatedProjectToList}
        />
      )}
      {selectedUser && <ShowUserModal user={selectedUser} close={() => setSelectedUser(null)} />}
      {isLoading ? (
        <Box border="border border-blue-ocean">
          <>
            <Paragraph customClassName="flex items-center m-0 p-0 text-blue-dimmed italic text-xl font-semibold mb-4">
              Loading your projects...
            </Paragraph>
            <Loader size={10} />
          </>
        </Box>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {!!projects.length &&
            projects.map((project: any, index: number) => (
              <ProjectCard
                setSelectedUser={(user: BasicUserDetails) => setSelectedUser(user)}
                project={project}
                key={index}
                openDeleteProjectModal={openDeleteProjectModal}
                openEditProjectModal={openEditProjectModal}
              />
            ))}
          {showDeleteProjectModal && selectedProject && (
            <DeleteProjectModal
              title="Delete this project"
              subtitle="This operation is irreversible, we will not be able to recover your data."
              close={() => setShowDeleteProjectModal(false)}
              delete={(project: ProjectTypes) => deleteProject(project)}
              project={selectedProject}
            />
          )}

          {showEditProjectModal && selectedProject && (
            <EditProjectModal
              close={() => setShowEditProjectModal(false)}
              save={(project: ProjectTypes) => updateProject(project)}
              project={selectedProject}
            />
          )}
        </div>
      )}
    </PrivatePageLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      pathname: ctx.resolvedUrl,
    },
  };
}
export default Projects;
