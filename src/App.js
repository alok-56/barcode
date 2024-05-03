import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const App = () => {
  const [scannedData, setScannedData] = useState(null);

  return (
    <div>
      <Scanner
        onResult={(text, result) => {
          setScannedData(text);
          console.log(text, result);
        }}
        onError={(error) => console.log(error?.message)}
      />
      {scannedData && <div>Scanned Data: {scannedData}</div>}
    </div>
  );
};

export default App;
