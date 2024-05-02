import React, { useState, useEffect } from 'react';

const App = () => {
  const [stream, setStream] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then(deviceInfos => {
        const videoDevices = deviceInfos.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      })
      .catch(err => console.error('Error enumerating devices:', err));
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      const constraints = { video: { deviceId: selectedDevice } };
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          setStream(stream);
        })
        .catch(err => console.error('Error accessing camera:', err));
    }
  }, [selectedDevice]);

  const switchCamera = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  return (
    <div>
      <div>
        <p>Number of video devices available: {devices.length}</p>
        <select value={selectedDevice} onChange={e => switchCamera(e.target.value)}>
          {devices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>{device.label || `Camera ${device.deviceId}`}</option>
          ))}
        </select>
      </div>
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
