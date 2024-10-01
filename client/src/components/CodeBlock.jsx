import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegClipboard, FaCheck } from "react-icons/fa";
import { useState } from "react";

const CodeBlock = (props) => {
  const [isCopied, setIsCopied] = useState(false);

   // Function to clean the code by removing ``` and extract language if available
   const extractCodeAndLang = (code) => {
    const codeMatch = code.match(/```([a-zA-Z]+)?\n([\s\S]*)```/); // Regex to capture both lang and code
    let language = codeMatch ? codeMatch[1] || "text" : "text"; // Default to 'text' if no language found
    const cleanCode = codeMatch ? codeMatch[2] : code; // Extract code part

    language = language == "c++" ? "cpp": language;

    return { language, cleanCode };
  };

  const { language, cleanCode } = extractCodeAndLang(props.code);

  // Function to copy code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 5000); // Reset after 5 seconds
  };

  return (
    <div className="relative group">
      {/* Code block */}
      <SyntaxHighlighter
        language={language}
        style={coy}
        wrapLines={true} // Word wrap
        wrapLongLines={true} // Word wrap for long lines
        customStyle={{
          minHeight:"40px",
          maxHeight: "400px", // Limit vertical scrolling height
          overflowY: "auto", // Allow vertical scrolling
          whiteSpace: "pre-wrap", // Wrap long lines
          wordWrap: "break-word", // Prevent horizontal scroll
        }}
      >
        {cleanCode}
      </SyntaxHighlighter>

      {/* Copy button */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 bg-white p-1 rounded transition-all group-hover:opacity-100"
        onClick={handleCopy}
      >
        {isCopied ? <FaCheck className="text-green-500" /> : <FaRegClipboard />}
      </button>
    </div>
  );
};

export default CodeBlock;
