import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/auth', { email, password });
      if (res.data.success) {
        window.location.href = '/';
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
        Login
      </button>
    </div>
  );
};

export default Login;
