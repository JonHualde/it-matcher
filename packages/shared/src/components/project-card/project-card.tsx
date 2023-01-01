import Image from "next/image";
// Components
import {
  HiOutlineChartBar,
  HiOutlineDotsHorizontal,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineFolderOpen,
} from "react-icons/hi";
import { Popover } from "@shared-components/popover";
import { Badge } from "@shared-components/status";
import { Title, Paragraph, Italic, DateTag } from "@shared-components/typography";
// types
import { ProjectTypes } from "@shared-types";

interface ProjectCardInterface {
  project: ProjectTypes;
  openDeleteProjectModal: () => void;
  openEditProjectModal: () => void;
}

const ProjectCard = (props: ProjectCardInterface) => {
  return (
    <div className="w-full rounded-md border border-gray-200 px-6 py-6 shadow-xl transition-all hover:scale-105">
      {/* Project's card header */}
      <div className="flex w-full items-start justify-between ">
        {/* Project's main picture */}
        <div className="relative h-14 w-16">
          <Image
            loading="lazy"
            layout="fill"
            src={`${process.env.NEXT_PUBLIC_AWS_S3_LINK}${
              props.project.project_main_picture ? "/" + props.project.project_main_picture : "/pictures/Generic-Profile-1600x1600.png"
            } `}
            alt="project_main_picture"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div className="flex w-full items-center justify-end">
          {/* has the project started? */}
          {new Date(props.project.starting_on).getTime() > new Date().getTime() ? (
            <Badge color="yellow">Not started</Badge>
          ) : (
            <Badge color="green">Started</Badge>
          )}

          {/* Is project online? */}
          <Badge color={props.project.is_online ? "green" : "red"} customClassName={`ml-4 mr-2`}>
            <div className="flex items-center">
              {props.project.is_online ? "Online" : "Offline"}
              <span className={`ml-2 h-4 w-4 rounded-full ${props.project.is_online ? "bg-status-green" : "bg-status-red"}`}></span>
            </div>
          </Badge>

          {/* Edit or delete project */}
          <Popover
            elements={[
              {
                content: "Edit project",
                action: () => props.openEditProjectModal(),
              },
              {
                content: "Delete project",
                action: () => props.openDeleteProjectModal(),
              },
            ]}
            icon={<HiOutlineDotsHorizontal fontSize={"40px"} color="#4973F2" className="cursor-pointer" />}
          />
        </div>
      </div>
      <div className="mb-3 flex flex-col">
        <Title type="h4" customClassName="mt-6 mb-1 font-medium text-blue-dimmed">
          {props.project.project_name.toUpperCase()}
        </Title>
        <Paragraph customClassName="line-clamp-3">{props.project.description}</Paragraph>
      </div>
      <div className="grid grid-cols-2 gap-y-6 gap-x-3 py-4">
        <div className="mx-0 flex items-center justify-start">
          <HiOutlineChartBar fontSize={"25px"} className="mr-3 text-blue-dimmed" />
          Difficulty: {props.project.difficulty}
        </div>
        <div className="mx-0 flex items-center justify-start">
          <HiOutlineCalendar fontSize={"25px"} className="mr-3 text-blue-dimmed" />
          Starting date: {new Date(props.project.starting_on).toLocaleDateString()}
        </div>
        <div className="mx-0 flex items-center justify-start">
          <HiOutlineFolderOpen fontSize={"25px"} className="mr-3 text-blue-dimmed" />
          Project: {props.project.type}
        </div>
        <div className="relative mx-0 flex items-center justify-start">
          <HiOutlineUsers fontSize={"25px"} className="mr-3 text-blue-dimmed" />
          <Badge color="green" customClassName="font-medium px-2 py-0.5">
            4
          </Badge>
          &nbsp; members have joined
          <div className="absolute top-8 left-8 flex items-center">
            <img
              className="rounded-full object-cover"
              src="/images/placeholder.png"
              alt="placeholderImage"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
            <img
              className="-ml-1 rounded-full object-cover"
              src="/images/placeholder.png"
              alt="placeholderImage"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
            <img
              className="-ml-1 rounded-full object-cover"
              src="/images/placeholder.png"
              alt="placeholderImage"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
            <img
              className="-ml-1 rounded-full object-cover"
              src="/images/placeholder.png"
              alt="placeholderImage"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
          </div>
        </div>
        <div className="mx-0 flex items-center justify-start">
          <HiOutlineExclamationCircle fontSize={"25px"} className="mr-3 text-blue-dimmed" />
          Currently missing:&nbsp;
          <Badge color="green" customClassName="font-medium px-2 py-0.5">
            {props.project.number_of_participants.toString()}
          </Badge>
          &nbsp;people
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
