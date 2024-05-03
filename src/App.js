import React, { useRef, useEffect, useState } from "react";
import Quagga from "quagga";

const App = () => {
  const videoRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current,
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // or "user" for front camera
          },
        },
        decoder: {
          readers: ["ean_reader", "code_128_reader"], // Specify barcode formats to scan
        },
      },
      (err) => {
        if (err) {
          console.error("Failed to initialize Quagga:", err);
          return;
        }
        Quagga.start();
        Quagga.onDetected((data) => {
          setScannedCode(data.codeResult.code);
        });
      }
    );

    return () => {
      Quagga.stop();
      Quagga.offDetected();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} />
      {scannedCode && <p>Scanned code: {scannedCode}</p>}
    </div>
  );
};

export default App;
