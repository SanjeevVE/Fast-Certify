import React, { useState } from 'react';
import { CertificateForm } from './Components/CertificateForm';
import { CertificatePreview } from './Components/CertificatePreview';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ClipLoader } from 'react-spinners';
import './app.css';

function App() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState('Times');
  const [textColor, setTextColor] = useState('#000000');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const imageUrl = 'https://i.ibb.co/MgSB590/certificate.png';

  const generatePdf = async () => {
    setIsLoading(true);
    const pdf = new jsPDF();
    const img = new Image();
    img.src = imageUrl;

    img.onload = async () => {
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (img.height * imgWidth) / img.width;

      pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.setFont(fontFamily);
      pdf.setFontSize(fontSize);
      pdf.setTextColor(textColor);

      pdf.text(
        text || 'Your Text Here',
        pdf.internal.pageSize.getWidth() / 2,
        imgHeight * 0.5,
        { align: 'center', baseline: 'middle' }
      );

      pdf.save('certificate.pdf');

      try {
        const getISTDate = () => {
          const now = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000;
          const istDate = new Date(now.getTime() + istOffset);
          return istDate.toISOString();
        };

        await addDoc(collection(db, 'certificates'), {
          name: text || 'Unnamed',
          createdAt: getISTDate(),
        });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError('Error saving to database: ' + e.message);
      }
    };

    img.onerror = () => {
      setIsLoading(false);
      setError('Failed to load certificate background image.');
    };
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-8 text-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl border border-gray-200 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-center pb-6 text-gray-800">Generate Certificate</h1>

        {isLoading && (
          <div className="flex justify-center mb-4">
            <ClipLoader size={35} color="#4A90E2" loading={isLoading} />
          </div>
        )}
        {error && <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>}

        <div className="w-full flex flex-col items-center">
          <CertificateForm
            text={text}
            setText={setText}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            textColor={textColor}
            setTextColor={setTextColor}
            generatePdf={generatePdf}
          />

          <CertificatePreview
            text={text}
            fontSize={fontSize}
            fontFamily={fontFamily}
            textColor={textColor}
            imageUrl={imageUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
