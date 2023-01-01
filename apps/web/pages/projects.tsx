import { useEffect, useState, useRef } from "react";
import { PrivatePageLayout } from "@shared-components/layouts";
import ProjectCard from "shared/src/components/project-card/project-card";
// Components
import { Loader } from "@shared-components/status";
import { Box } from "@shared-components/box";
import { Paragraph } from "@shared-components/typography";
import { EditProjectModal, ShowUserModal, DeleteProjectModal } from "@shared-components/modals";

// type
import { ProjectTypes, BasicUserDetails } from "@shared-types";
// utils
import { fetchJSON, notify, updateToast } from "@shared-utils";

const Projects = (props: any) => {
  const myToast = useRef<any>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BasicUserDetails | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectTypes | null>(null);
  const [projects, setProjects] = useState<ProjectTypes[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectTypes[]>([]);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

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
  }, []);

  return (
    <PrivatePageLayout title="My projects" pathname={props.pathname}>
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
