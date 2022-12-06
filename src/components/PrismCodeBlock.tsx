import React, { useState } from "react";
import ReactPrismEditor from "react-prism-editor";

const languages = {
  javascript: "JavaScript",
  html: "HTML",
  java: "Java",
  php: "PHP",
  csharp: "C#",
  c: "C",
  cpp: "C++",
  sql: "SQL",
  python: "Python(soon)",
};

type PrismBlockEditableProps = {
  default: string;
  onChange: (code: string, language: string) => void;
};

export const PrismBlockEditable = (props: PrismBlockEditableProps) => {
  const [code, setCode] = useState(props.default);
  const [lang, setLang] = useState(Object.keys(languages)[0]);
  const onChange = (code: string, language: string) => {
    setCode(code);
    setLang(language);
    props.onChange(code, language);
  };
  return (
    <div>
      <select defaultValue={lang} onChange={(e) => onChange(code, e.currentTarget.value)}>
        {Object.keys(languages).map((l, i) => (
          <option value={l} key={i}>
            {Object.values(languages)[i]}
          </option>
        ))}
      </select>
      <ReactPrismEditor
        language={lang}
        theme={"okaidia"}
        code={code}
        lineNumber={true}
        readOnly={false}
        clipboard={true}
        changeCode={(c: string) => onChange(c, lang)}
      />
    </div>
  );
};
