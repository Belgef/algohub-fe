import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { axiosInstance, postImage } from "../../api";
import { CreateLessonState, ContentElement } from "../../interfaces";
import * as createLessonActions from "../../store/slices/createLessonSlice";
import { RootState } from "../../store/store";
import apiRoutes from "../../api/apiRoutes";
import { contentSchema, createLessonSchema } from "../../validationSchemes/createLessonSchema";
import { ValidationError } from "yup";
import ContentEditor from "../../components/CreateLessonComponents/ContentEditor";
import TagEditor from "../../components/CreateLessonComponents/TagEditor";
import TitleImageInput from "../../components/CreateLessonComponents/TitleImageInput";
import { validate } from "../../validationSchemes/validation";

const CreateLessonPage = (props: PropsFromRedux) => {
  const [lessonError, setLessonError] = useState("");
  const handleLessonCreate = async () => {
    if (
      props.tagError ||
      props.titleError ||
      props.contentError ||
      props.content.some((c) => c.error)
    )
      return;
    let contentErrorsFound = false;
    props.content.forEach((c) => {
      const errors = validate(c, contentSchema);
      if (errors) {
        props.setContent({ key: c.key, content: c });
        contentErrorsFound = true
      }
    });
    if(contentErrorsFound)
    return;

    try {
      createLessonSchema.validateSync(props);
    } catch (error) {
      if (error instanceof ValidationError) setLessonError(error.errors[0]);
      return;
    }
    setLessonError("")

    const frontImageFile = (document.getElementById("frontImage") as HTMLInputElement)?.files?.[0];
    let frontImageName: string | undefined = undefined;
    if (frontImageFile) {
      frontImageName = await postImage(frontImageFile);
    }

    const mappedContent: ContentElement[] = [];
    for (let i = 0; i < props.content.length; i++) {
      let imageName = "";
      if (props.content[i].type === "image") {
        const element = document.getElementById(props.content[i].imageInputId) as HTMLInputElement;
        if (element.files) {
          imageName = await postImage(element.files[0]);
        } else {
          props.setContent({
            key: props.content[i].key,
            content: { ...props.content[i], error: "Some error occured" },
          });
          props.content[i].error = "";
        }
      }
      mappedContent.push({ ...props.content[i], image: imageName });
    }
    axiosInstance.post(apiRoutes.LESSONS_URL, {
      title: props.title,
      content: JSON.stringify(mappedContent),
      authorId: 1,
      frontImageName: frontImageName,
      tags: props.tags,
    });
  };
  return (
    <div>
      <div className="horizontal-title-block">
        <div className="input-title-block">
          <input
            className="input-title"
            type="text"
            name="title"
            placeholder="Enter title"
            onBlur={(e) => props.setTitle(e.currentTarget.value)}
          />
          <span className="danger">{props.titleError || "\xA0"}</span>
        </div>
        <TitleImageInput />
      </div>
      <TagEditor />
      <ContentEditor />
      <span className="danger">{lessonError || "\xA0"}</span>
      <button onClick={handleLessonCreate}>Create lesson</button>
    </div>
  );
};

const mapStateToProps = (state: RootState): CreateLessonState => state.createLesson;

const connector = connect(mapStateToProps, createLessonActions);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateLessonPage);
