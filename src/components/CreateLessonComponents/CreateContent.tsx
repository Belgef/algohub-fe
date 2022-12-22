import React, { useState } from "react";
import { ContentType, CreateContentElement } from "../../interfaces";
import { setContent } from "../../store/slices/createLessonSlice";
import { RootState } from "../../store/store";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { PrismBlockEditable } from "../PrismCodeBlock";

const CreateContent = (props: CreateContentConnectedProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleTextareaContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setContent({ ...props.content, value: event.currentTarget.value });
  };

  const handleImageContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setContent({ ...props.content, imageInputId: event.currentTarget.value });
    if (event.currentTarget.files?.length === 1) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };

  const handleCodeChange = (code: string, language: string) => {
    props.setContent({ ...props.content, code: code, value: language });
  };

  let contentBody = <span className="danger">Wrong content</span>;
  if (props.content.type === ContentType.Emphasis) {
    contentBody = (
      <textarea onBlur={handleTextareaContentChange} defaultValue={props.content.value} />
    );
  } else if (props.content.type === ContentType.Subtitle) {
    contentBody = (
      <textarea onBlur={handleTextareaContentChange} defaultValue={props.content.value} />
    );
  } else if (props.content.type === ContentType.Paragraph) {
    contentBody = (
      <textarea onBlur={handleTextareaContentChange} defaultValue={props.content.value} />
    );
  } else if (props.content.type === ContentType.Bar) {
    contentBody = <hr />;
  }
  if (props.content.type === ContentType.Image) {
    contentBody = (
      <div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleImageContentChange}
          id={props.content.imageInputId}
        />
        {props.content.error.length === 0 &&
          (document.getElementById(props.content.imageInputId) as HTMLInputElement)?.files?.length ===
            1 && <img src={imageUrl} />}
        <textarea onBlur={handleTextareaContentChange} defaultValue={props.content.value} />
      </div>
    );
  }
  if (props.content.type === ContentType.Code) {
    contentBody = <PrismBlockEditable default={props.content.code} onChange={handleCodeChange} />;
  }
  return (
    <div>
      {contentBody}
      <span className="danger">{props.content.error || "\xA0"}</span>
    </div>
  );
};

type OwnProps = { contentKey: number };
type MappedProps = { id: number; content: CreateContentElement };

const mapStateToProps = (state: RootState, ownProps: OwnProps): MappedProps => {
  const id = state.createLesson.content.findIndex(c=>c.key===ownProps.contentKey)
  return { id: id, content: state.createLesson.content[id] };
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return { setContent: (content: CreateContentElement) => dispatch(setContent({ key:ownProps.contentKey, content })) };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CreateContentConnectedProps = ConnectedProps<typeof connector>;

export default connector(CreateContent);
