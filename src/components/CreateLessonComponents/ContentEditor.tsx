import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { ContentType, CreateContentElement } from "../../interfaces";
import { RootState } from "../../store/store";
import { addContent, deleteContent } from "../../store/slices/createLessonSlice";
import CreateContent from "./CreateContent";
import ReactPrismEditor from "react-prism-editor";

//import Prism from "prismjs";
//window.Prism = window.Prism || {};
//Prism.manual = true;

const contentTypes = [
  ContentType.Subtitle,
  ContentType.Emphasis,
  ContentType.Paragraph,
  ContentType.Code,
  ContentType.Image,
  ContentType.Bar,
];

const ContentEditor = (props: ContentEditorProps) => {
  return (
    <div>
      <div>
        {contentTypes.map((ct, i) => (
          <button onClick={() => props.addContent(ct)} key={i}>
            {ct}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          {props.content.map((c) => (
            <tr key={c.key}>
              <td>{c.type}</td>
              <td>{<CreateContent contentKey={c.key} />}</td>
              <td>
                <button onClick={() => props.deleteContent(c.key)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="danger">{props.contentError || "\xA0"}</span>

      {/* Invisible first prism block so no erros occur when deleting other blocks */}
      <div style={{ display: "none" }}>
        <ReactPrismEditor language="javascript" theme="okaidia" code="" />
      </div>
    </div>
  );
};

type MappedProps = { content: CreateContentElement[]; contentError: string };

const mapStateToProps = (state: RootState): MappedProps => ({ ...state.createLesson });
const mapDispatchToProps = { addContent, deleteContent };

const connector = connect(mapStateToProps, mapDispatchToProps);

type ContentEditorProps = ConnectedProps<typeof connector>;

export default connector(ContentEditor);
