import { useState } from "react";

// Components
import InputContainer from "../input-container/input-container";

interface FilterApplicationsData {
  projectName: string;
  status: "" | "all" | "Pending" | "Validated" | "Rejected";
}

interface FilterApplicationsProps {
  filterApps: ({ projectName, status }: FilterApplicationsData) => void;
}

const FilterApplications = (props: FilterApplicationsProps) => {
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState<"" | "all" |"Pending" | "Validated" | "Rejected">("");

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.filterApps({ projectName, status })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center py-4 px-4 bg-pastel-light bg-opacity-50 gap-x-2"
    >
      <InputContainer
        type="text"
        onChange={(value: any) => setProjectName(value)}
        value={projectName}
        name="projectName"
        label="Project name"
        customClass="py-2"
      />
      <div className="flex flex-col mb-4 w-full">
        <label htmlFor="status"> Status </label>
        <select value={status} name="status" id="status" className="focus:outline-none py-3 px-3 border-2 border-gray-200"
        onChange={(e: any) => setStatus(e.target.value)}>
          <option value="" disabled>Choose a status</option>
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Validated">Validated</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-ocean py-2 rounded-sm flex justify-center text-white font-medium
        hover:bg-blue-800 mt-4 border-2 border-blue-ocean max-w-[200px]"
      >
        SEARCH
      </button>
    </form>
  );
};

export default FilterApplications;
