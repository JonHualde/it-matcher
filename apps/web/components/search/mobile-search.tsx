import { useState } from "react";
import { Loader } from "@shared-components/status";
import { Button } from "@shared-components/button";
import { JobTitlesTypes, SearchBarFiltersTypes } from "@shared-types";
import { Modal } from "@shared-components/modals";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Title } from "@shared-components/typography";
interface SearchBarProps {
  jobTitles: JobTitlesTypes[];
  disabled: boolean;
  filters: SearchBarFiltersTypes;
  updateFilters: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  buildQuery: () => void;
  isLoading: boolean;
}

const MobileSearch = (props: SearchBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`absolute bottom-4 right-4 z-10 lg:hidden`}>
      <div
        className=" flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-dimmed text-white"
        onClick={() => setIsModalOpen(true)}
      >
        <HiOutlineMagnifyingGlass aria-hidden={true} className="text-3xl" />
      </div>
      {isModalOpen && (
        <Modal size="max-w-2xl" close={() => setIsModalOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.buildQuery();
              setIsModalOpen(false);
            }}
            className="flex h-auto flex-col items-center justify-end gap-y-6 bg-gray-100 p-2 sm:p-6"
          >
            <Title customClassName="m-0" type="h4">
              Filters
            </Title>
            <div className="grid-rows-12 grid w-full gap-y-4">
              <div className="row-span-4 flex h-12 items-center justify-center bg-white">
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
                className="row-span-2 h-12 bg-transparent bg-white px-3 outline-none"
              >
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
              <select
                onChange={props.updateFilters}
                value={props.filters.orderBy}
                name="orderBy"
                className="row-span-2 h-full h-12 bg-transparent bg-white px-4 outline-none"
              >
                <option value="default" disabled selected>
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
                className="row-span-2 h-12 bg-transparent bg-white px-4 outline-none"
              >
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
              <select
                onChange={props.updateFilters}
                name="isOnline"
                value={props.filters.isOnline}
                className="row-span-2 h-12 bg-transparent bg-white px-4 outline-none"
              >
                <option value="default" disabled selected>
                  Status
                </option>
                <option value="all">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* Search button */}
            <Button
              customClass="w-full"
              disabled={props.disabled}
              text={props.isLoading ? <Loader border="border-b-2 border-r-2 border-white" /> : "Search"}
              type="submit"
              color="bg-blue-ocean"
              textColor="text-white"
              hover="bg-blue-800"
            />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MobileSearch;
