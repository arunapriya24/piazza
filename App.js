import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Pipeline from "./components/Pipeline";
import OutputPanel from "./components/OutputPanel";
import { processDocument } from './utils/olmOCR';

const App = () => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false); // ← new state for loading

  const handleExtraction = async (file) => {
    setLoading(true);        // show loading
    const result = await processDocument(file);
    setOutput(result);
    setLoading(false);       // hide loading
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🧾 Data Extraction Tool</h1>
      <FileUpload onFileUpload={handleExtraction} />
      {loading && (
        <p style={{ color: "orange", fontWeight: "bold" }}>⏳ Processing data...</p>
      )}
      <Pipeline />
      {!loading && output && <OutputPanel data={output} />}
    </div>
  );
};

export default App;
