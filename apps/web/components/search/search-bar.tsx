import { useState } from "react";
import { Button } from "@shared-components/button";
import { JobTitlesTypes, SearchBarFiltersTypes } from "@shared-types";

interface SearchBarProps {
  jobTitles: JobTitlesTypes[];
  buildQuery: (filters: SearchBarFiltersTypes) => void;
  disabled: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  const [filters, setFilters] = useState<SearchBarFiltersTypes>({
    projectName: "",
    jobTitle: "all",
    orderBy: null,
    difficulty: "all",
    isOnline: "all",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.buildQuery(filters);
      }}
      className="flex h-24 w-full items-center justify-end bg-gray-100 px-6"
    >
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
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
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
      <Button disabled={props.disabled} text="Search" type="submit" color="bg-blue-ocean" textColor="text-white" hover="bg-blue-800" />
    </form>
  );
};

export default SearchBar;
