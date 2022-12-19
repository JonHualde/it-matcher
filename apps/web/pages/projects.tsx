import { useEffect, useState, useRef } from "react";
import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";
import { ToastContainer, toast, Zoom } from "react-toastify";
import ProjectCard from "shared/src/components/project-card/project-card";

// helpers
import Jwt from "../utils/jwt";
// Components
import Toast from "shared/src/components/toast/toast";
import DeleteProjectModal from "shared/src/components/modals/delete-project-modal";
// Hooks
import { getUserProjects } from "../hooks/projects";
import EditProjectModal from "components/modals/edit-project-modal";
// type
import { ProjectProps } from "@types";

const Projects = (props: any) => {
  const myToast = useRef<any>();
  const [projects, setProjects] = useState([]);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [toDeleteProjectId, setToDeleteProjectId] = useState<number>(0);

  const { data, isLoading, isError } = getUserProjects();

  const openDeleteProjectModal = (id: number) => {
    setToDeleteProjectId(() => id);
    setShowDeleteProjectModal(true);
  };

  const openEditProjectModal = (id: number) => {
    setShowEditProjectModal(true);
  };

  const updateProjectData = (projectData: ProjectProps) => {};

  useEffect(() => {
    if (!isLoading && !data && isError.error) {
      myToast.current = toast(<Toast successMessage="Something wrong happen while getting the requests, please reload the page." />, {
        autoClose: 5000,
        closeButton: false,
        type: toast.TYPE.ERROR,
        transition: Zoom,
        toastId: Math.floor(Math.random() * 10),
      });
    }

    if (!isLoading && data && !isError?.error) {
      if (!toast.isActive(myToast.current)) {
        myToast.current = toast(<Toast successMessage="Table updated" />, {
          autoClose: 5000,
          closeButton: false,
          type: toast.TYPE.SUCCESS,
          transition: Zoom,
          toastId: Math.floor(Math.random() * 10),
        });
      }

      setProjects(data.projects);
    }
  }, [data, isLoading, isError]);

  return (
    <PrivatePageLayout title="Projects" pathname={props.pathname}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} rtl={false} pauseOnFocusLoss />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {!!projects.length &&
          projects.map((project: any, index: number) => (
            <ProjectCard
              project={project}
              key={index}
              openDeleteProjectModal={openDeleteProjectModal}
              openEditProjectModal={openEditProjectModal}
            />
          ))}
      </div>
      {showDeleteProjectModal && (
        <DeleteProjectModal
          title="Delete this project"
          subtitle="This operation is irreversible, we will not be able to recover your data."
          close={() => setShowDeleteProjectModal(false)}
          projectId={toDeleteProjectId}
          projects={projects}
          setProjects={setProjects}
        />
      )}

      {showEditProjectModal && (
        <EditProjectModal
          close={() => setShowEditProjectModal(false)}
          save={(projectData: ProjectProps) => updateProjectData(projectData)}
          projectId={toDeleteProjectId}
          projects={projects}
          setProjects={setProjects}
        />
      )}
    </PrivatePageLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  let user;

  try {
    user = new Jwt(ctx.req.cookies.access_token).verifyToken();

    if (user.error) {
      throw new Error();
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      user: {
        id: user.id,
        email: user.email,
        permission: user.permission,
      },
      pathname: ctx.resolvedUrl,
    },
  };
}

export default Projects;
