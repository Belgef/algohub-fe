import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/store";
import { addTag, deleteTag } from "../../store/slices/createLessonSlice";

const TagEditor = (props: TagEditorProps) => {
  const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const input = event.currentTarget.elements.item(0) as HTMLInputElement;
    props.addTag(input.value);
    //TODO: Empty input on success tag addition
    // if (props.tagError.length === 0)
    input.value = "";
    event.preventDefault();
  };
  return (
    <div>
      <p>Tags</p>
      {props.tags.map((t, i) => (
        <div className="tag-added" key={i}>
          <span>{t}</span>
          <button className="cancel" onClick={() => props.deleteTag(i)}>
            x
          </button>
        </div>
      ))}
      <form onSubmit={handleTagSubmit}>
        <input type="text" name="tagInput" />
        <button type="submit">Add tag</button>
      </form>
      <span className="danger">{props.tagError || "\xA0"}</span>
    </div>
  );
};

type MappedProps = { tags: string[]; tagError: string };

const mapStateToProps = (state: RootState): MappedProps => ({ ...state.createLesson });
const mapDispatchToProps = { addTag, deleteTag };

const connector = connect(mapStateToProps, mapDispatchToProps);

type TagEditorProps = ConnectedProps<typeof connector>;

export default connector(TagEditor);