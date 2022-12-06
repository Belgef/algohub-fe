import React from "react";
import { Lesson } from "../../interfaces";
import HorizontalListBox from "./HorizontalListBox";

type Props = { items: Lesson[] };

const HorizontalLessonList = (props: Props) => {
  return (
    <div>
      {props.items.map((item, i) => (
        <HorizontalListBox item={item} key={i} />
      ))}
    </div>
  );
};

export default HorizontalLessonList;
