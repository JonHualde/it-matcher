import { useState, useRef } from "react";
// Components
import { Modal } from "@shared-components/modals";
import { Button } from "@shared-components/buttons";
import { DateTag, Title, Paragraph } from "@shared-components/typography";
import { Badge } from "@shared-components/status";
// Store
import { useStoreState } from "easy-peasy";
// types
import { ProjectTypes, JobTitlesTypes, UserSentApplicationsResponse, bgOpacity } from "@shared-types";
// Utils
import { fetchJSON, notify, updateToast } from "@shared-utils";

interface LogInModalProps {
  selectedProject: ProjectTypes;
  applications?: UserSentApplicationsResponse[];
  jobTitles: JobTitlesTypes[];
  close: () => void;
  openLogInModal?: () => void;
  setApplications?: (applications: UserSentApplicationsResponse[]) => void;
}

const ShowProjectModal = (props: LogInModalProps) => {
  const [jobSelected, setJobSelected] = useState<string>("default");
  let isLoggedIn = useStoreState((state: any) => state.user.isLoggedIn);
  const myToast = useRef<any>();

  const sendApplication = async (shownProject: ProjectTypes, jobSelected: number) => {
    if (!isLoggedIn && props.openLogInModal) {
      props.openLogInModal();
      return;
    }

    notify({ myToast, toastId: 3, message: "Processing your application request..." });

    // @TODO - Add job_title_id
    fetchJSON("application", "POST", {
      project_id: shownProject.id,
      job_title_id: jobSelected,
    })
      .then((res: UserSentApplicationsResponse) => {
        if (props.setApplications && props.applications) {
          props.setApplications([...props.applications, res]);
        }
        updateToast({
          myToast,
          toastId: 3,
          type: "SUCCESS",
          message: `Your application for ${props.selectedProject.project_name} has been sent correctly.`,
        });
      })
      .catch((err) => {
        console.error(err);
        updateToast({ myToast, toastId: 3, type: "ERROR", message: err.message[0] });
      });
  };

  const getStatus = (is_online: boolean) => {
    return is_online ? <Badge color="green">Online</Badge> : <Badge color="red">Offline</Badge>;
  };

  const isApplicationSent = () => {
    if (props.applications) {
      return props.applications.some((app) => app.project_id === props.selectedProject.id);
    }
    return false;
  };

  return (
    <Modal size="max-w-4xl" zIndex="z-20" close={() => props.close()}>
      <div className="rounded-md" style={{ height: "calc(100vh - 150px)" }}>
        <div className="mb-8 flex flex-col items-center">
          {/* Main Picture */}
          <div className="relative my-4 flex h-80 w-full items-center">
            <img
              src={`${process.env.NEXT_PUBLIC_AWS_S3_LINK}${
                props.selectedProject.project_main_picture
                  ? "/" + props.selectedProject.project_main_picture
                  : "/pictures/Generic-Profile-1600x1600.png"
              } `}
              alt="project_main_picture"
              className="h-full w-full rounded-md object-cover"
            />
          </div>

          {/* Title and general info */}
          <div className="flex flex-col items-center pl-5">
            <Title type="h3" customClassName="my-0 capitalize">
              {props.selectedProject.project_name}
            </Title>
            <div className="mt-4 capitalize">{getStatus(props.selectedProject.is_online)}</div>
          </div>
        </div>

        <div className="absolute left-0 w-full border border-gray-200"></div>

        <div className="flex flex-col pb-8">
          <div className="mb-2 flex flex-col items-center justify-between border-b-2 border-gray-200">
            <div className="flex w-full items-center justify-between ">
              <Paragraph customClassName="py-1.5 font-sm text-md">Creator</Paragraph>
              <Paragraph customClassName="capitalize font-semibold text-lg">{props.selectedProject.full_name}</Paragraph>
            </div>
            <div className="my-0 flex w-full items-center justify-between py-0">
              <Paragraph customClassName="py-1.5 font-sm text-md">Posted</Paragraph>
              <DateTag customClassName="font-semibold text-lg">{props.selectedProject.created_at}</DateTag>
            </div>
            <div className="flex w-full items-center justify-between ">
              <Paragraph customClassName="py-1.5 font-sm text-md">Type</Paragraph>
              <Paragraph customClassName="font-semibold text-lg capitalize">{props.selectedProject.type}</Paragraph>
            </div>
            <div className="flex w-full items-center justify-between ">
              <Paragraph customClassName="py-1.5 font-sm text-md">Difficulty</Paragraph>
              <Paragraph customClassName="font-semibold text-lg capitalize">{props.selectedProject.difficulty}</Paragraph>
            </div>
          </div>
          <div className="flex flex-col">
            <Title type="h3" customClassName="mb-4">
              Description
            </Title>
            <Paragraph size="large">{props.selectedProject?.description}</Paragraph>
          </div>
        </div>

        {/* Apply / favourite */}
        {props.setApplications && props.applications && (
          <div className="flex w-full flex-col items-center justify-center pb-8">
            <select
              value={jobSelected}
              onChange={(e) => setJobSelected(e.target.value)}
              name="job_wanted"
              className={`mb-4 h-12 rounded-md border border-neutral-700 px-4 py-1 outline-none ${isApplicationSent() && "hidden"}`}
            >
              <option value="default">Job you want to apply for</option>
              {props.jobTitles.map(
                (job: JobTitlesTypes, index: number) =>
                  // Only display jobs titles that have a matching id with the selected project job title wanted list, and that are not already filled
                  props.selectedProject.job_titles_wanted.includes(job.id) &&
                  !props.selectedProject.job_titles_filled.includes(job.id) && (
                    <option key={index} value={job.id}>
                      {job.name}
                    </option>
                  )
              )}
            </select>
            <Button
              id="submitApplication"
              text={props.applications && isApplicationSent() ? "Application Sent" : "Apply"}
              color="bg-blue-ocean"
              textColor="text-white"
              hover="hover:bg-blue-700"
              rounded="rounded-md"
              border="border border-blue-ocean"
              disabled={(props.applications && isApplicationSent()) || jobSelected === "default" ? true : false}
              action={() => sendApplication(props.selectedProject, Number(jobSelected))}
            />
            <div className="relative flex items-center pl-4">
              <img src="/images/heart.png" alt="" className="rounded-md" />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ShowProjectModal;
