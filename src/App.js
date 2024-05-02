import React, { useState, useEffect } from 'react';

const App = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setStream(stream);
      })
      .catch(err => console.error('Error accessing camera:', err));
  }, []);

  return (
    <div>
      {stream && (
        <video
          autoPlay
          playsInline
          muted
          style={{ width: '100%', height: 'auto' }}
          id="camera-stream"
          ref={video => {
            if (video) {
              video.srcObject = stream;
            }
          }}
        />
      )}
      {!stream && <p>No camera stream available</p>}
    </div>
  );
};

export default App;
