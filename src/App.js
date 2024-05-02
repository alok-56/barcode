import React, { useState, useEffect } from "react";
import jsQR from "jsqr"; // Import jsQR library for QR code decoding

const App = () => {
  const [stream, setStream] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((deviceInfos) => {
        const videoDevices = deviceInfos.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      })
      .catch((err) => console.error("Error enumerating devices:", err));
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      const constraints = { video: { deviceId: selectedDevice } };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          setStream(stream);
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
  }, [selectedDevice]);

  const switchCamera = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const scanBarcode = () => {};
  return (
    <div>
      <div>
        <select
          value={selectedDevice}
          onChange={(e) => switchCamera(e.target.value)}
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>
      <video
        autoPlay
        playsInline
        muted
        style={{ width: "100%", height: "auto" }}
        id="barcode-video"
        ref={(video) => {
          if (video && stream) {
            video.srcObject = stream;
          }
        }}
      />
      <button onClick={scanBarcode}>Scan Barcode</button>
    </div>
  );
};

export default App;
