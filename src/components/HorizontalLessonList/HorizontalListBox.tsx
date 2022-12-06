import React from "react";
import { Lesson } from "../../interfaces";

type Props = { item: Lesson };

const HorizontalListBox = (props: Props) => {
  return <div>{props.item.title}</div>;
};

export default HorizontalListBox;
