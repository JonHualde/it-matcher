import React from "react";

interface TitleProps {
  title: string;
  color?: string;
}

const Title = (props: TitleProps) => {
  return <h3 className="text-blue-dimmed">{props.title.toUpperCase()}</h3>;
};

export default Title;
