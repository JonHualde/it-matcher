import { ChangeEvent, useState } from "react";
// Components
import { InputContainer } from "@shared-components/input-container";
// types
import { FilterApplicationsData } from "@shared-types";

interface FilterApplicationsProps {
  filters: { projectName: string; applicationStatus: string };
  updateFilters: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  applicationsFilter: () => void;
}

const FilterApplications = (props: FilterApplicationsProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.applicationsFilter();
      }}
      className="flex items-center justify-center gap-x-2 bg-pastel-light bg-opacity-50 py-4 px-4"
    >
      <InputContainer
        type="text"
        onChange={props.updateFilters}
        value={props.filters.projectName}
        name="projectName"
        label="Project name"
        customClass="py-2"
      />
      <div className="mb-4 flex w-full flex-col">
        <label htmlFor="status"> Status </label>
        <select
          value={props.filters.applicationStatus}
          name="applicationStatus"
          id="status"
          className="border-2 border-gray-200 py-3 px-3 focus:outline-none"
          onChange={props.updateFilters}
        >
          <option value="default" disabled>
            Choose a status
          </option>
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Validated">Validated</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 flex w-full max-w-[200px] justify-center rounded-sm border-2 border-blue-ocean
        bg-blue-ocean py-2 font-medium text-white hover:bg-blue-800"
      >
        SEARCH
      </button>
    </form>
  );
};

export default FilterApplications;

// let newArray = applications;
// let filtered: any = applications;

// if (projectName) {
//   filtered = newArray.filter((element: any) => element.projectName.includes(projectName));
// }

// if (status && status !== "all") {
//   if (filtered) {
//     filtered = filtered.filter((element: any) => element.status === status);
//   } else {
//     filtered = newArray.filter((element: any) => element.status === status);
//   }
// }

// setFilteredApplications([...filtered]);
