// types
import { ApplicationsTableProps } from "@types";

interface TableProps {
  applications: Array<ApplicationsTableProps>
}

const ApplicationsTable = (props: TableProps) => {
  return (
    <div className="w-full mt-8 font-light">
      <table className="w-full">
        <thead className="item-left text-left border-b">
          <tr>
            <th className="font-medium pb-2">Project Name</th>
            <th className="font-medium pb-2">Applicant full name</th>
            <th className="font-medium pb-2">Date</th>
            <th className="font-medium pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.applications !== null
            ? props.applications.map((application: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="py-3 text-xl">{application.projectName}</td>
                  <td className="py-3 text-xl">{application.applicantName}</td>
                  <td className="py-3 text-xl">
                    {" "}
                    {new Date(application.updatedAt).toLocaleDateString(
                      "en-UK",
                      {
                        day: "2-digit",
                        year: "numeric",
                        month: "2-digit",
                      }
                    )}
                  </td>
                  <td className={`min-w-md py-3`}>
                    <div
                      className={`flex items-center w-max px-2 py-0.5 rounded-full font-semibold
                    ${
                      application.status === "Accepted" &&
                      "bg-status-light-green text-status-green text-sm"
                    }
                    ${
                      application.status === "Pending" &&
                      "bg-status-light-yellow text-status-yellow text-sm"
                    }
                    ${
                      application.status === "Rejected" &&
                      "bg-status-light-red text-status-red text-sm"
                    }
                  `}
                    >
                      <span
                        className={`
                    ${
                      application.status === "Accepted" &&
                      "w-4 h-4 mr-2 rounded-full bg-status-green"
                    }
                    ${
                      application.status === "Pending" &&
                      "w-4 h-4 mr-2 rounded-full bg-status-yellow"
                    }
                    ${
                      application.status === "Rejected" &&
                      "w-4 h-4 mr-2 rounded-full bg-status-red"
                    }
                  `}
                      ></span>
                      {application.status}
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
