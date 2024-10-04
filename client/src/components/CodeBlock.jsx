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

    language = language === "c++" ? "cpp" : language;

    return { language, cleanCode };
  };

  const { language, cleanCode } = extractCodeAndLang(props.code);

  // Function to copy code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="relative group my-6">
      {/* Code block */}
      <SyntaxHighlighter
        language={language}
        style={coy}
        wrapLines={true} // Word wrap
        wrapLongLines={true} // Word wrap for long lines
        customStyle={{
          borderRadius: "8px", // Rounded corners
          padding: "20px", // Padding inside the code block
          backgroundColor: "#f6f8fa", // Light background color for readability
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
          fontSize: "14px", // Slightly smaller font for a clean look
          overflowY: "auto", // Enable vertical scrolling for large blocks
          whiteSpace: "pre-wrap", // Wrap long lines
          wordWrap: "break-word", // Prevent horizontal scrolling
        }}
      >
        {cleanCode}
      </SyntaxHighlighter>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center text-sm text-gray-600 hover:text-white bg-gray-200 hover:bg-gray-600 p-2 rounded-lg transition-all ease-in-out duration-200 group-hover:opacity-100 shadow-md"
        style={{ opacity: 0.85 }}
      >
        {isCopied ? (
          <FaCheck className="text-green-500 animate-bounce" />
        ) : (
          <FaRegClipboard />
        )}
        <span className="ml-1">
          {isCopied ? "Copied" : "Copy"}
        </span>
      </button>
    </div>
  );
};

export default CodeBlock;
