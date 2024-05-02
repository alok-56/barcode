import React, { useState } from "react";
import { BarcodeScanner, useTorch } from "react-barcode-scanner";

const App = () => {
  const [isSupportTorch, isOpen, onTorchSwitch] = useTorch();
  const [selectedCamera, setSelectedCamera] = useState("environment");

  const handleCameraChange = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", height: "360px", position: "relative" }}>
        <BarcodeScanner facingMode={selectedCamera} />
        {isSupportTorch ? (
          <button style={{ position: "absolute", top: "10px", left: "10px" }} onClick={onTorchSwitch}>
            Switch Torch
          </button>
        ) : null}
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Select Camera:</label>
        <select value={selectedCamera} onChange={(e) => handleCameraChange(e.target.value)}>
          <option value="environment">Back Camera</option>
          <option value="user">Front Camera</option>
        </select>
      </div>
    </div>
  );
};

export default App;
