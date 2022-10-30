import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface PopoverElementProps {
  icon: ReactNode;
  elements: Array<object>;
}

const PopoverElement = (props: PopoverElementProps) => {
  return (
    <div className="relative">
      <Popover placement="bottom" closeOnBlur={true}>
        <PopoverTrigger>{props.icon}</PopoverTrigger>
        <PopoverContent className="bg-white shadow-xl py-4 px-6 rounded-md top-10 right-28">
          <PopoverCloseButton
            className="right-3 top-3 absolute text-blue-ocean cursor-pointer"
            style={{ fontSize: "12px" }}
          />
          {props.elements.map((element: any, index: number) => {
            return (
              <PopoverBody
                key={index}
                className={`py-2 text-blue-dimmed cursor-pointer hover:scale-105 transition-all ${
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
