import { ReactElement } from "react";
import { Box } from "@shared-components/box";
import { Icon } from "@shared-components/icons";
import { Italic, Date, Paragraph, Title } from "@shared-components/typography";

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
    <table className="mt-8 w-full">
      <thead>
        <tr className="text-left">
          {Object.keys(props.tableHeaders).map((keys, index) => {
            return (
              <th key={index} className="pb-2 text-lg font-medium md:text-xl">
                {props.tableHeaders[keys]}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody className="">
        {props.tableData.map((item: any) => (
          <tr>
            {Object.keys(props.tableHeaders).map((tableHeaderKey: any, index) => {
              if (item.hasOwnProperty(tableHeaderKey)) {
                const value = item[tableHeaderKey];
                return (
                  <td key={index} className="text-md py-3 md:text-lg">
                    {props.tableBody[tableHeaderKey](value)}
                  </td>
                );
              }

              if (props.tableBody.hasOwnProperty(tableHeaderKey)) {
                return (
                  <td key={index} className="text-md py-3 md:text-lg">
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
