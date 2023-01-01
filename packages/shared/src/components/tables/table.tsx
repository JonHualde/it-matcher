import { ReactElement } from "react";
import { Box } from "@shared-components/box";
import { Icon } from "@shared-components/icons";
import { Paragraph } from "@shared-components/typography";

interface TableProps {
  tableHeaders: {
    [key: string]: string | ReactElement;
  };
  tableBody: {
    [key: string]: (value?: any) => string | ReactElement;
  };
  tableData: Array<{ [key: string]: any }>;
  emptyData: string;
}

const Table = (props: TableProps) => {
  if (!props.tableData.length) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Box border="border border-blue-ocean">
            <div className="flex flex-col items-center">
              <Icon type="info" size="small" />
              <Paragraph customClassName="text-blue-ocean mt-4">{props.emptyData}</Paragraph>
            </div>
          </Box>
        </div>
      </div>
    );
  }

  return (
    <table className="mt-8 w-full border shadow-xl">
      <thead className="border-b-2 border-blue-ocean bg-pastel-light">
        <tr className="text-left">
          {Object.keys(props.tableHeaders).map((keys, index) => {
            return (
              <th key={index} className="py-2 px-4 text-lg font-medium italic text-neutral-800 md:text-xl">
                {props.tableHeaders[keys]}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody className="bg-stone-50">
        {props.tableData.map((item: any) => (
          <tr className="border-b border-gray-200">
            {Object.keys(props.tableHeaders).map((tableHeaderKey: string, index: number) => {
              if (item.hasOwnProperty(tableHeaderKey)) {
                // Passing the value contained in the tableHeaderKey
                const itemKeyValue = item[tableHeaderKey];
                return (
                  <td key={index} className="text-md py-3 px-4 md:text-lg">
                    {props.tableBody[tableHeaderKey](itemKeyValue)}
                  </td>
                );
              }

              if (props.tableBody.hasOwnProperty(tableHeaderKey)) {
                // Passing the entire item object
                return (
                  <td key={index} className="text-md py-3 px-4 md:text-lg">
                    {props.tableBody[tableHeaderKey](item)}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
