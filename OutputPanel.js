import React from 'react';
import ReactJson from 'react-json-view';

function OutputPanel({ data }) {
  return (
    <div style={{ textAlign: 'left', background: '#f9f9f9', padding: 20, borderRadius: 8 }}>
      <h3>📊 Extracted Data</h3>
      {data ? <ReactJson src={data} collapsed={false} name={null} enableClipboard={false} displayDataTypes={false} /> : <p>No data extracted yet.</p>}
    </div>
  );
}

export default OutputPanel;
