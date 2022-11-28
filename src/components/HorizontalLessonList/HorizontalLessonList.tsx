import React from 'react'
import { Lesson } from '../../interfaces';
import HorizontalListBox from './HorizontalListBox';

type Props = {items: Lesson[]}

const HorizontalLessonList = (props: Props) => {
  return (
    <div>{props.items.map(item => <HorizontalListBox item={item} />)}</div>
  )
}

export default HorizontalLessonList