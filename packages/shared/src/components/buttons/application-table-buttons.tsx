// Components
import { Button } from "@shared-components/buttons";
// types
import { GetUserApplicationsResponse } from "@shared-types";

interface ApplicationTableButtonsProps {
  item: GetUserApplicationsResponse;
  action: (item: GetUserApplicationsResponse, status: "Accepted" | "Rejected") => void;
}

const ApplicationTableButtons = (props: ApplicationTableButtonsProps) => {
  if (props.item.status === "Pending") {
    return (
      <div className="flex gap-2">
        <Button
          customClass="w-min"
          padding="px-4 py-1.5"
          text={"Accept"}
          type="button"
          rounded="rounded-sm"
          color="bg-green-100"
          textColor="text-green-800"
          hover="hover:scale-105 transform transition duration-100 ease-in-out"
          border="border border-green-800"
          action={() => {
            props.action(props.item, "Accepted");
          }}
        />
        <Button
          customClass="w-min"
          padding="px-4 py-1.5"
          text={"Reject"}
          rounded="rounded-sm"
          type="button"
          color="bg-red-100"
          textColor="text-red-800"
          hover="hover:scale-105 transform transition duration-100 ease-in-out"
          border="border border-red-800"
          action={() => {
            props.action(props.item, "Rejected");
          }}
        />
      </div>
    );
  }

  return <p>-</p>;
};

export default ApplicationTableButtons;
