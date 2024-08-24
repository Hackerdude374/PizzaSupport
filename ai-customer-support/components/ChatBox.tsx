import React from 'react';

type ChatBoxProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  response: string;
  handleSubmit: () => void;
};

const ChatBox: React.FC<ChatBoxProps> = ({ question, setQuestion, response, handleSubmit }) => {
  return (
    <div>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your question..."
        className="border p-2 w-full my-4"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
        Send
      </button>
      <p className="mt-4">{response}</p>
    </div>
  );
};

export default ChatBox;
