import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from '../components/ChatBox';

const Home: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [response, setResponse] = useState<string>('');

    const handleSubmit = async () => {
        try {
            const res = await axios.post('/api/query', { question });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">AI Customer Support Chatbot</h1>
            <ChatBox 
                question={question}
                setQuestion={setQuestion}
                response={response}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default Home;
