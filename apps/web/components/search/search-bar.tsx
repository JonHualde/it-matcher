import { useState } from "react";
import { Button } from "@shared-components/button";
import { JobTitlesTypes } from "@shared-types";

interface SearchBarProps {
  jobTitles: JobTitlesTypes[];
}

interface Filters {
  projectName: string;
  jobTitle: string | number;
  orderBy: string;
  difficulty: string;
  isOnline: boolean | null;
}

const SearchBar = (props: SearchBarProps) => {
  const [filters, setFilters] = useState<Filters>({
    projectName: "",
    jobTitle: "all",
    orderBy: "asc",
    difficulty: "all",
    isOnline: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-24 w-full items-center justify-end bg-gray-100 px-6">
      <div className="flex w-full">
        <div className="flex h-12 w-max min-w-[400px] items-center justify-center bg-white">
          {/* Search input: project name */}
          <input
            onChange={handleChange}
            name="projectName"
            className="h-full w-full border-0 px-4 outline-none"
            type="text"
            placeholder="Search by project's name"
          />
        </div>

        {/* Job titles filter */}
        <select onChange={handleChange} name="jobTitle" className="mx-2 h-12 w-max bg-transparent bg-white px-4 outline-none">
          <option value="default" disabled selected>
            Roles{" "}
          </option>
          <option value="all">All</option>
          {props.jobTitles.map((jobTitle, index) => (
            <option key={index} value={jobTitle.id}>
              {jobTitle.name}
            </option>
          ))}
        </select>

        {/* Sort by */}
        <select onChange={handleChange} name="orderBy" className="mx-2 h-full h-12 w-max bg-transparent bg-white px-4 outline-none">
          <option value="default" disabled selected>
            Sort by
          </option>
          <option value="asc">Newest</option>
          <option value="desc">Oldest</option>
          {/* <option value="most-liked">Most liked</option>
          <option value="least-liked">Least liked</option> */}
        </select>

        {/* Difficulty */}
        <select onChange={handleChange} name="difficulty" className="mx-2 h-12 w-max bg-transparent bg-white px-4 outline-none">
          <option value="default" disabled selected>
            Difficulty
          </option>
          <option value="all">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>

        {/* Is online */}
        <select onChange={handleChange} name="isOnline" className="mx-2 h-12 w-max bg-transparent bg-white px-4 outline-none">
          <option value="default" disabled selected>
            Status
          </option>
          <option value="all">All</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Search button */}
      <Button text="Search" color="bg-blue-ocean" borderColor="border-blue-ocean" textColor="text-white" hover="bg-blue-800" />
    </div>
  );
};

export default SearchBar;
