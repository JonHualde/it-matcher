import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverCloseButton } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PopoverElementProps {
  icon: ReactNode | any;
  elements: Array<{
    content: ReactNode | string;
    action: () => void;
  }>;
}

const PopoverElement = (props: PopoverElementProps) => {
  return (
    <div className="relative">
      <Popover placement="bottom" closeOnBlur={true}>
        <PopoverTrigger>{props.icon}</PopoverTrigger>
        <PopoverContent className="top-10 right-28 rounded-md bg-white py-4 px-6 shadow-xl">
          <PopoverCloseButton className="absolute right-3 top-3 cursor-pointer text-blue-ocean" style={{ fontSize: "12px" }} />
          {props.elements.map((element: any, index: number) => {
            return (
              <PopoverBody
                key={index}
                className={`cursor-pointer py-2 text-blue-dimmed transition-all hover:scale-105 ${
                  props.elements.length > index + 1 ? "border-b" : null
                }`}
              >
                <div onClick={() => element.action()}>{element.content}</div>
              </PopoverBody>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverElement;
