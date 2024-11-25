import React from 'react';

export const CertificatePreview = ({ text, fontSize, fontFamily, textColor, imageUrl }) => {
  return (
    <div id="capture" className="relative flex flex-col items-center mt-5">
      <img
        src={imageUrl}
        alt="Certificate Background"
        className="mb-3 certificate-image"
      />
      <h2
        className="font-semibold absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: textColor,
          fontFamily: fontFamily,
          fontSize: `${fontSize}px`,
        }}
      >
        {text || 'Your Text Here'}
      </h2>
    </div>
  );
};
