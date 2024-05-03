import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

const App = () => {
  const [data, setData] = useState("");
  return (
    <>
      <Scanner
        onResult={(text, result) => setData(result)}
        onError={(error) => console.log(error?.message)}
      />
      <h1>{data}</h1>
    </>
  );
};

export default App;
