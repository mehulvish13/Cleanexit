import { useState } from 'react';
import { CheckCircle, Shield, Download, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router';
import jsPDF from 'jspdf';

interface Certificate {
  certificateId: string;
  user: string;
  device: string;
  standard: string;
  timestamp: string;
  signature: string;
}

export default function WipePage() {
  const [status, setStatus] = useState<'idle' | 'wiping' | 'done'>('idle');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const navigate = useNavigate();

  const handleWipe = () => {
    setStatus('wiping');
    
    // Simulate wipe process (2 seconds)
    setTimeout(() => {
      const fakeCert: Certificate = {
        certificateId: 'CERT-' + Math.floor(Math.random() * 1000000),
        user: 'IamSuser',
        device: 'iPhone 13 Pro',
        standard: 'NIST 800-88',
        timestamp: new Date().toLocaleString(),
        signature: 'SIG-' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      };
      setCertificate(fakeCert);
      setStatus('done');
    }, 2000);
  };

  const downloadCertificate = () => {
    if (!certificate) return;
    
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    
    // Header with blue background
    doc.setFillColor(29, 78, 216);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificate of Data Erasure', 50, 45);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Cleanexit Certificate Authority', 50, 65);

    // Body content
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    let y = 120;
    const addLine = (label: string, value: string, bold = false) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label + ':', 50, y);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.text(value, 180, y);
      y += 25;
    };

    addLine('Certificate ID', certificate.certificateId, true);
    addLine('User', certificate.user);
    addLine('Device', certificate.device);
    addLine('Standard', certificate.standard);
    addLine('Timestamp', certificate.timestamp);
    addLine('Signature', certificate.signature);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('This certificate confirms that the device listed above underwent compliant data erasure and verification.', 50, y + 20, { maxWidth: 500 });

    doc.save(`${certificate.certificateId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 flex items-center space-x-2 text-white hover:text-blue-300 transition-colors z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-2xl">
        
        {/* LANDING PAGE - IDLE STATE */}
        {status === 'idle' && (
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Shield className="w-16 h-16 text-blue-400" />
              <h1 className="text-5xl font-bold text-white">Cleanexit</h1>
            </div>

            {/* Hero Text */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Secure Device Data Wipe
              </h2>
              <p className="text-xl text-blue-200">
                Military-grade data erasure in seconds
              </p>
            </div>

            {/* Wipe Button */}
            <button
              onClick={handleWipe}
              className="mt-8 px-16 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-2xl transition-all transform hover:scale-105 shadow-2xl"
            >
              Wipe Device Now
            </button>

            {/* Footer Text */}
            <p className="text-sm text-blue-300 mt-6">
              NIST 800-88 Compliant • Military-Grade Security
            </p>
          </div>
        )}

        {/* WIPING STATE - ANIMATION */}
        {status === 'wiping' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <div className="flex flex-col items-center space-y-8">
              {/* Spinner */}
              <div className="w-24 h-24 border-8 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <div className="bg-blue-500 h-4 w-full animate-pulse"></div>
              </div>

              {/* Text */}
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-white">
                  Wiping in progress…
                </p>
                <p className="text-blue-200">
                  Securely erasing all data
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS STATE - CERTIFICATE */}
        {status === 'done' && certificate && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="text-center space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">
                  ✅ Wipe Completed Successfully!
                </h2>
                <p className="text-gray-600">
                  Your device has been securely wiped
                </p>
              </div>

              {/* Certificate Details */}
              <div className="bg-gray-50 rounded-2xl p-6 text-left">
                <h3 className="font-bold text-gray-900 text-lg mb-4 text-center">
                  Certificate Details
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Certificate ID:</span>
                    <span className="font-mono">{certificate.certificateId}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">User:</span>
                    <span>{certificate.user}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Device:</span>
                    <span>{certificate.device}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Standard:</span>
                    <span className="text-blue-600 font-semibold">{certificate.standard}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Timestamp:</span>
                    <span className="text-sm">{certificate.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Signature:</span>
                    <span className="font-mono text-sm">{certificate.signature}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={downloadCertificate}
                  className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Certificate (PDF)</span>
                </button>
                
                <button
                  onClick={() => navigate('/')}
                  className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Home className="w-6 h-6" />
                  <span>Return to Home</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
