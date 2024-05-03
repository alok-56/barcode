import React, { useState, useEffect } from "react";
import { BarcodeScanner, useTorch } from "react-barcode-scanner";

const App = () => {
  const [isSupportTorch, isOpen, onTorchSwitch] = useTorch();
  const [selectedCamera, setSelectedCamera] = useState("environment");
  const [scannedData, setScannedData] = useState(null);

  const handleCameraChange = (camera) => {
    setSelectedCamera(camera);
  };

  // Function to handle scanned data
  const handleScan = (data) => {
    setScannedData(data);
    // Restart scanning after some delay
    setTimeout(() => {
      setScannedData(null); // Reset scanned data
    }, 3000); // Adjust the delay as needed
  };

  useEffect(() => {
    // Clean up any remaining scanned data when unmounting component
    return () => {
      setScannedData(null);
    };
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "100%", height: "360px", position: "relative" }}>
        {scannedData ? (
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            Scanned Data: {scannedData}
          </div>
        ) : (
          <BarcodeScanner
            facingMode={selectedCamera}
            onScan={(data) => handleScan(data)}
          />
        )}
        {isSupportTorch ? (
          <button
            style={{ position: "absolute", top: "10px", left: "10px" }}
            onClick={onTorchSwitch}
          >
            Switch Torch
          </button>
        ) : null}
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Select Camera:</label>
        <select
          value={selectedCamera}
          onChange={(e) => handleCameraChange(e.target.value)}
        >
          <option value="environment">Back Camera</option>
          <option value="user">Front Camera</option>
        </select>
      </div>
    </div>
  );
};

export default App;
