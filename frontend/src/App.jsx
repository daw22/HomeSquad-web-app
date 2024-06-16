import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://api-homesquad.onrender.com/api/status')
      .then(response => response.json())
      .then(data => setMessage(data.status));
  }, []);

  return <div>
    status: {message}
    Any other text
    </div>;
}

export default App;