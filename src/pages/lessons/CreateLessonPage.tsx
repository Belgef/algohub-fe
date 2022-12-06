import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { axiosInstance, postImage } from "../../api";
import CreateContent from "../../components/Content/CreateContent";
import {
  CreateLesson,
  CreateLessonState,
  ContentType,
  CreateContentElement,
} from "../../interfaces";
import * as createLessonActions from "../../store/slices/createLessonSlice";
import { RootState } from "../../store/store";
import apiRoutes from "../../api/apiRoutes";
import { createLessonScheme } from "../../validationSchemes/createLessonSchema";
import { ValidationError } from "yup";

const CreateLessonPage = (props: PropsFromRedux) => {
  const [addFrontImage, setAddFrontImage] = useState(false);
  const [frontImageUrl, setFrontImageUrl] = useState("");
  const [lessonError, setLessonError] = useState("");

  const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const input = event.currentTarget.elements.item(0) as HTMLInputElement;
    props.addTag(input.value);
    //TODO: Empty input on success tag addition
    // if (props.tagError.length === 0) 
    input.value = "";
    event.preventDefault();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.[0]) {
      URL.revokeObjectURL(frontImageUrl);
      setFrontImageUrl(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };

  const handleLessonCreate = async () => {
    createLessonScheme
      .validate(props)
      .then(async () => {
        setLessonError("");
        const frontImage = (document.getElementById("frontImage") as HTMLInputElement)?.files?.[0];
        let frontImageName: string | undefined = undefined;
        if (addFrontImage && frontImage) {
          frontImageName = await postImage(frontImage);
        }

        const mappedContent: CreateContentElement[] = [];
        for (let i = 0; i < props.content.length; i++) {
          let image = "";
          if (props.content[i].type === "image") {
            image = await postImage(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              (document.getElementById(props.content[i].image) as HTMLInputElement).files![0]
            );
          }
          mappedContent.push({
            type: props.content[i].type,
            value: props.content[i].value,
            image: image,
            code: props.content[i].code,
            error: "",
          });
        }
        const lesson: CreateLesson = {
          title: props.title,
          content: JSON.stringify(mappedContent),
          authorId: 1,
          frontImageName: frontImageName,
          tags: [],
        };
        axiosInstance.post(apiRoutes.LESSONS_URL, lesson);
      })
      .catch((e: ValidationError) => setLessonError(e.errors[0]));
  };

  const contentTypes = [
    ContentType.Subtitle,
    ContentType.Emphasis,
    ContentType.Paragraph,
    ContentType.Code,
    ContentType.Image,
    ContentType.Bar,
  ];
  return (
    <div>
      <h1>Lesson builder</h1>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          onBlur={(e) => props.setTitle(e.currentTarget.value)}
        />
        {props.titleError.length > 0 && <span className="danger">{props.titleError}</span>}
      </div>
      {addFrontImage ? (
        <div>
          <h2>
            Title image <button onClick={() => setAddFrontImage(false)}>x</button>
          </h2>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleImageChange}
            id="frontImage"
          />
          {frontImageUrl.length > 0 && <img src={frontImageUrl} />}
        </div>
      ) : (
        <button onClick={() => setAddFrontImage(true)}>Add front image</button>
      )}
      <div>
        <h2>Tags</h2>
        {props.tags.map((t, i) => (
          <div key={i}>
            <span>{t}</span>
            <button onClick={() => props.deleteTag(i)}>x</button>
          </div>
        ))}
        <form onSubmit={handleTagSubmit}>
          <input type="text" name="tagInput" />
          {props.tagError.length > 0 && <span className="danger">{props.tagError}</span>}
          <button type="submit">Add tag</button>
        </form>
      </div>
      <div>
        {contentTypes.map((ct, i) => (
          <button onClick={() => props.addContent(ct)} key={i}>
            {ct}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          {props.content.map((c, i) => (
            <tr key={i}>
              <td>{c.type}</td>
              <td>{<CreateContent id={i} />}</td>
              <td>
                <button onClick={() => props.deleteContent(i)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {props.contentError.length > 0 && <span className="danger">{props.contentError}</span>}
      <button onClick={handleLessonCreate}>Create lesson</button>
    </div>
  );
};

const mapStateToProps = (state: RootState): CreateLessonState => state.createLesson;

const connector = connect(mapStateToProps, createLessonActions);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateLessonPage);
