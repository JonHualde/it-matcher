import { ChangeEvent } from "react";
// Components
import { InputContainer } from "@shared-components/input-container";
import { Loader } from "@shared-components/status";
import { Button } from "@shared-components/buttons";
// types
import { ApplicationsFiltersTypes } from "@shared-types";
interface FilterApplicationsProps {
  filters: ApplicationsFiltersTypes;
  isFiltering: boolean;
  updateFilters: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  applicationsFilter: () => void;
}

const FilterApplications = (props: FilterApplicationsProps) => {
  const resetFilters = () => {
    props.updateFilters({
      target: {
        name: "applicantName",
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
    props.updateFilters({
      target: {
        name: "projectName",
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
    props.updateFilters({
      target: {
        name: "status",
        value: "all",
      },
    } as ChangeEvent<HTMLSelectElement>);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.applicationsFilter();
      }}
      className="flex items-center justify-center gap-x-2 bg-pastel-light  py-4 px-4"
    >
      {" "}
      <div className="grid w-full grid-cols-12 gap-x-4">
        <div className="col-span-3">
          <InputContainer
            type="text"
            onChange={props.updateFilters}
            value={props.filters.applicantName}
            placeholder="Applicant's name"
            name="applicantName"
            customClass="h-full h-12 w-full border-0 px-3 outline-none"
            margin="mb-0"
          />
        </div>
        <div className="col-span-3">
          <InputContainer
            type="text"
            onChange={props.updateFilters}
            value={props.filters.projectName}
            placeholder="Project's name"
            name="projectName"
            customClass="h-full h-12 w-full border-0 px-3 outline-none"
            margin="mb-0"
          />
        </div>

        <div className="col-span-3">
          <select
            value={props.filters.status}
            name="status"
            id="status"
            className="text-md col-span-2 h-12 w-full rounded-md bg-transparent bg-white px-3 outline-none"
            onChange={props.updateFilters}
          >
            <option value="default" disabled>
              Choose a status
            </option>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="col-span-3 flex justify-end gap-x-1">
          <Button
            disabled={props.isFiltering}
            text={props.isFiltering ? <Loader border="border-b-2 border-r-2 border-white" /> : "Search"}
            type="submit"
            color="bg-blue-ocean"
            textColor="text-white"
            hover="hover:bg-blue-700"
            border="border-0"
            customClass="h-12 w-28 flex items-center justify-center"
          />
          <Button
            disabled={props.isFiltering}
            text={props.isFiltering ? <Loader border="border-b-2 border-r-2 border-white" /> : "Reset"}
            type="button"
            color="bg-gray-200"
            textColor="text-neutral-800"
            hover="hover:bg-gray-300"
            border="border-2 border-neutral-700"
            customClass="h-12 w-28 flex items-center justify-center"
            action={() => {
              resetFilters();
              props.applicationsFilter();
            }}
          />
        </div>
      </div>
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
