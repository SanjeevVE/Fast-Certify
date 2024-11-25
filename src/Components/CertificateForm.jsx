import React from 'react';

export const CertificateForm = ({
  text,
  setText,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  generatePdf,
}) => {
  return (
    <div className="form-container mb-4">
      <input
        type="text"
        placeholder="Enter your text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-64"
        maxLength={30}
      />

      <div className="mb-4">
        <label className="mr-2">Select Font Size:</label>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        >
          {Array.from({ length: 49 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Select Font Family:</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="Times">Times</option>
          <option value="Arial">Arial</option>
          <option value="Courier">Courier</option>
          <option value="Helvetica">Helvetica</option>
        </select>
      </div>

      <button
        onClick={generatePdf}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Download as PDF
      </button>
    </div>
  );
};
