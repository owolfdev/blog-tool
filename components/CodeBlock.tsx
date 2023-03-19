import React, { HTMLAttributes, ReactElement } from "react";
import { useEffect } from "react";
import ClipboardJS from "clipboard";

function useClipboard(selector: string) {
  useEffect(() => {
    const clipboard = new ClipboardJS(selector);

    clipboard.on("success", (e) => {
      e.clearSelection();
    });

    return () => {
      clipboard.destroy();
    };
  }, [selector]);
}

interface PreProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
}

export const Pre: React.FC<PreProps> = ({ children, ...restProps }) => (
  <div
    className="w-full mb-4 overflow-hidden bg-gray-700 rounded-lg"
    {...restProps}
  >
    {children}
  </div>
);

export const Code: React.FC<any> = (props) => {
  const languageMatch = props.className.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1] : null;
  const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;

  useClipboard(`.copy-button-${codeId}`);

  return (
    <>
      <div className="flex items-center justify-between w-full px-5 text-sm text-white">
        {language && <span>{language}</span>}
        <button
          className={`copy-button-${codeId}  hover:bg-gray-600 px-2 py-1 rounded-lg active:bg-white active:text-gray-500`}
          data-clipboard-target={`#${codeId}`}
        >
          Copy
        </button>
      </div>
      <pre className="whitespace-pre">
        <code
          id={codeId}
          className={`p-4 text-sm text-white bg-gray-800 rounded-lg`}
          {...props}
        />
      </pre>
    </>
  );
};
