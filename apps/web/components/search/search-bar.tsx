import { Loader } from "@shared-components/status";
import { Button } from "@shared-components/button";
import { JobTitlesTypes, SearchBarFiltersTypes } from "@shared-types";

interface SearchBarProps {
  jobTitles: JobTitlesTypes[];
  disabled: boolean;
  filters: SearchBarFiltersTypes;
  updateFilters: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  buildQuery: () => void;
  isLoading: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.buildQuery();
      }}
      className="hidden h-24 w-full items-center justify-end gap-x-6 bg-gray-100 px-6 lg:flex"
    >
      <div className="grid w-full grid-cols-12 gap-x-4">
        <div className="col-span-4 flex h-12 items-center justify-center bg-white">
          {/* Search input: project name */}
          <input
            onChange={props.updateFilters}
            value={props.filters.projectName}
            name="projectName"
            className="h-full w-full border-0 px-3 outline-none"
            type="text"
            placeholder="Project's name"
          />
        </div>

        {/* Job titles filter */}
        <select
          onChange={props.updateFilters}
          value={props.filters.jobTitle}
          name="jobTitle"
          className="col-span-2 h-12 bg-transparent bg-white px-3 outline-none"
        >
          <option value="default" disabled>
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
        <select
          onChange={props.updateFilters}
          value={props.filters.orderBy}
          name="orderBy"
          className="col-span-2 h-full h-12 bg-transparent bg-white px-4 outline-none"
        >
          <option value="default" disabled>
            Sort by
          </option>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
          {/* <option value="most-liked">Most liked</option>
          <option value="least-liked">Least liked</option> */}
        </select>

        {/* Difficulty */}
        <select
          onChange={props.updateFilters}
          value={props.filters.difficulty}
          name="difficulty"
          className="col-span-2 h-12 bg-transparent bg-white px-4 outline-none"
        >
          <option value="default" disabled>
            Difficulty
          </option>
          <option value="all">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>

        {/* Is online */}
        <select
          onChange={props.updateFilters}
          name="isOnline"
          value={props.filters.isOnline}
          className="col-span-2 h-12 bg-transparent bg-white px-4 outline-none"
        >
          <option value="default" disabled>
            Status
          </option>
          <option value="all">All</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Search button */}
      <Button
        disabled={props.disabled}
        text={props.isLoading ? <Loader border="border-b-2 border-r-2 border-white" /> : "Search"}
        type="submit"
        color="bg-blue-ocean"
        textColor="text-white"
        hover="bg-blue-800"
        customClass="h-12 w-28 flex items-center justify-center"
      />
    </form>
  );
};

export default SearchBar;
