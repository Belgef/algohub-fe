import React from 'react'
import { IMAGE_BASE_URL } from '../constants'

type Props = {content: string}

export const LessonContent = (props: Props) => {
  let parsed_content: { type: string, value: string, caption: string }[] = JSON.parse(props.content)
  return (
    <div>
      { parsed_content.map(el=>{
          if(el.type === 'emphasis')
              return <p>{el.value} (emp)</p>
          if(el.type === 'subtitle')
              return <p>{el.value} (sub)</p>
          if(el.type === 'paragraph')
              return <p>{el.value} (prg)</p>
          if(el.type === 'bar')
              return <p>bar</p>
          if(el.type === 'image')
              return <div>
                <img src={IMAGE_BASE_URL+el.value} />
                <p>{el.caption}</p>
              </div>
      })}
  </div>
  )
}