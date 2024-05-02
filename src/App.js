import React, { useState, useEffect } from 'react';
import { BarcodeDetector } from 'barcode-detector';

const App = () => {
  const [detectedBarcodes, setDetectedBarcodes] = useState([]);

  useEffect(() => {
    const detectBarcodes = async () => {
      try {
        const detector = new BarcodeDetector();
        const barcodes = await detector.detect(document.querySelector('video'));
        setDetectedBarcodes(barcodes);
      } catch (error) {
        console.error('Error detecting barcodes:', error);
      }
    };

    detectBarcodes();

    // Cleanup function
    return () => {
      setDetectedBarcodes([]);
    };
  }, []);

  return (
    <div>
      <h2>Detected Barcodes</h2>
      <ul>
        {detectedBarcodes.map((barcode, index) => (
          <li key={index}>{barcode.rawValue}</li>
        ))}
      </ul>
      <video height={200} width={200} autoPlay playsInline muted></video>
    </div>
  );
};

export default App;
