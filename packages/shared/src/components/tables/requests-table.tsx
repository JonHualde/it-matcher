// types
import { RequestsTableProps } from "@types";

interface TableProps {
  requests: Array<RequestsTableProps>
}

const RequestsTable = (props: TableProps) => {
  return (
    <div className="w-full mt-8 font-light">
      <table className="w-full">
        <thead className="item-left text-left border-b">
          <tr>
            <th className="font-medium pb-2">Project Name</th>
            <th className="font-medium pb-2">Date</th>
            <th className="font-medium pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.requests !== null
            ? props.requests.map((request: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="py-3 text-xl">{request.projectName}</td>
                  <td className="py-3 text-xl">
                    {new Date(request.updatedAt).toLocaleDateString("en-UK", {
                      day: "2-digit",
                      year: "numeric",
                      month: "2-digit",
                    })}
                  </td>
                  <td className={`min-w-md py-3`}>
                    <div
                      className={`flex items-center w-max px-2 py-0.5 rounded-full font-semibold
                      ${
                        request.status === "Accepted" &&
                        "bg-status-light-green text-status-green text-sm"
                      }
                    ${
                      request.status === "Pending" &&
                      "bg-status-light-yellow text-status-yellow text-sm"
                    }
                    ${
                      request.status === "Rejected" &&
                      "bg-status-light-red text-status-red text-sm"
                    }
                  `}
                    >
                      <span
                        className={`
                    ${
                      request.status === "Accepted" &&
                      "w-4 h-4 mr-2 rounded-full bg-status-green"
                    }
                    ${
                      request.status === "Pending" &&
                      "w-4 h-4 mr-2 rounded-full bg-status-yellow"
                    }
                    ${
                      request.status === "Rejected" &&
                      "w-4 h-4 mr-2 rounded-full bg-status-red"
                    }
                  `}
                      ></span>
                      {request.status}
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

export default RequestsTable;
