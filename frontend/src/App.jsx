import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then(response => response.json())
      .then(data => setMessage(data.status));
  }, []);

  return <div>status: {message}</div>;
}

export default App;