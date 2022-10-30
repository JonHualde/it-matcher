import React, { useState } from "react";
import {
  HiOutlineChartBar,
  HiOutlineDotsHorizontal,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineFolderOpen,
} from "react-icons/hi";

import { IoRocketOutline } from "react-icons/io5";
import PopoverElement from "../popover/popover";

interface ProjectCardInterface {
  project: {
    attachments: any;
    createdAt: Date;
    description: string;
    difficulty: string;
    estimatedTimeDuration: number;
    estimatedTimeDurationMetric: string;
    id: number;
    initialInvestment: true;
    initialInvestmentCost: number;
    mainPicture: string;
    numberOfParticipant: number;
    projectName: string;
    putOnline: boolean;
    searchingFor: Array<string>;
    startingOn: Date;
    toolsAndTechnologies: Array<string>;
    type: string;
    updatedAt: Date;
    userId: number;
  };
  openDeleteProjectModal: (v: number) => void;
  openEditProjectModal: (v: number) => void;
}

const ProjectCard = (props: ProjectCardInterface) => {
  const openEditProjectModal = () => {
    props.openEditProjectModal(props.project.id)
  };

  const openDeleteProjectModal = () => {
    props.openDeleteProjectModal(props.project.id);
  };

  return (
    <div className="w-full rounded-md border border-gray-200 shadow-xl px-6 py-6 hover:scale-105 transition-all">
      <div className="flex justify-betwwen items-start w-full">
        <img
          className="rounded-full object-cover"
          src="/images/placeholder.png"
          alt="placeholderImage"
          style={{
            width: "90px",
            height: "90px",
          }}
        />
        <div className="flex items-center w-full justify-end">
          {new Date(props.project.startingOn).getDay() > new Date().getDay() ? (
            <HiOutlineClock fontSize={"25px"} color="#4973F2" />
          ) : (
            <IoRocketOutline fontSize={"25px"} color="#4973F2" />
          )}

          {props.project.putOnline ? (
            <>
              <span className="text-status-green mx-4">Online</span>
              <span className="w-4 h-4 mr-2 rounded-full bg-status-green mr-4"></span>
            </>
          ) : (
            <>
              <span className="text-status-red mx-4">Offline</span>
              <span className="w-4 h-4 mr-2 rounded-full bg-status-red mr-4"></span>
            </>
          )}

          <PopoverElement
            elements={[
              {
                content: "Edit project",
                action: openEditProjectModal,
              },
              {
                content: "Delete project",
                action: openDeleteProjectModal,
              },
            ]}
            icon={
              <HiOutlineDotsHorizontal
                fontSize={"40px"}
                color="#4973F2"
                className="cursor-pointer"
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-col mb-3">
        <h5 className="text-blue-dimmed font-medium mt-6 mb-1">
          {props.project.projectName.toUpperCase()}
        </h5>
        <p>{props.project.description.slice(0, 100) + "..."}</p>
      </div>
      <div className="grid grid-cols-2 gap-y-6 gap-x-3 py-4">
        <div className="flex items-center justify-start mx-0">
          <HiOutlineChartBar fontSize={"25px"} className="mr-3" />
          Difficulty: {props.project.difficulty}
        </div>
        <div className="flex items-center justify-start mx-0">
          <HiOutlineCalendar fontSize={"25px"} className="mr-3" />
          Starting date:{" "}
          {new Date(props.project.startingOn).toLocaleDateString("en-UK", {
            day: "2-digit",
            year: "numeric",
            month: "2-digit",
          })}
        </div>
        <div className="flex items-center justify-start mx-0">
          <HiOutlineFolderOpen fontSize={"25px"} className="mr-3" />
          Project: {props.project.type}
        </div>
        <div className="flex items-center justify-start mx-0 relative">
          <HiOutlineUsers fontSize={"25px"} className="mr-3" />
          <span className="text-blue-dimmed font-medium">4 members</span>&nbsp;
          have joined
          <div className="absolute top-8 flex items-center left-8">
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
              className="rounded-full object-cover -ml-1"
              src="/images/placeholder.png"
              alt="placeholderImage"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
            <img
              className="rounded-full object-cover -ml-1"
              src="/images/placeholder.png"
              alt="placeholderImage"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
            <img
              className="rounded-full object-cover -ml-1"
              src="/images/placeholder.png"
              alt="placeholderImage"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-start mx-0">
          <HiOutlineExclamationCircle fontSize={"25px"} className="mr-3" />
          Currently missing: {props.project.numberOfParticipant} people
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
