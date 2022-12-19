import { useState, useEffect } from "react";

// store
import { useStoreActions, useStoreState } from "easy-peasy";

// Components
import Button from "../button/button";

const ListOfProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loader, setLoader] = useState(true);

  let isLoggedIn = useStoreState((state: any) => state.loggedIn);
  const updateProject = useStoreActions((actions: any) => actions.updateProject);

  useEffect(() => {
    const getData = async () => {
      await fetch("/api/project/getProjects")
        .then((res) => res.json())
        .then(async (results) => {
          if (results.error) throw new Error(results.errorMessage);

          let res = await fetch("/api/auth/getToken");
          let { user } = await res.json();

          let projects;

          console.log(results.projects);

          if (user === undefined || user.error) {
            projects = results.projects;
          } else {
            projects = results.projects.filter((item: any) => item.userId !== user.id);
          }

          setProjects(projects);
          setLoader(false);
        })
        .catch((err) => {
          console.error(err);
          setLoader(false);
        });
    };

    getData();
  }, [setProjects, setLoader, isLoggedIn]);

  if (loader) {
    return <div>Loading...</div>;
  }

  const getDate = (ISODateFormat: string) => {
    let date = new Date(ISODateFormat);
    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let dt: any = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + dt;
  };

  return (
    <div className="col-span-1 grid grid-cols-1 gap-y-8 overflow-y-auto" style={{ height: "calc(100vh - 150px)" }}>
      {!loader && projects.length
        ? projects.map((project) => (
            <div
              key={project.projectName}
              onClick={() => updateProject(project)}
              className="relative flex cursor-pointer flex-col rounded-md border border-gray-200 p-4 shadow-xl transition-all hover:px-3"
            >
              <div className="relative flex h-12 w-12 items-center">
                <img src="/images/login.png" alt="" className="rounded-md" />
              </div>
              <h5 className="mb-0 mt-3">{project.projectName}</h5>
              <p className="mt-0 mb-6">{project.type}</p>
              <div className="flex items-end justify-between">
                <p>{getDate(project.createdAt)}</p>
                <Button
                  text="Details"
                  color="bg-blue-ocean"
                  textColor="text-white"
                  hover="text-blue-800"
                  rounded="rounded-md"
                  padding="px-3 py-1"
                  borderColor="border-blue-ocean"
                  action={() => () => updateProject(project)}
                />
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ListOfProjects;
