import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';

interface Certificate {
  certificateId: string;
  user: string;
  device: string;
  standard: string;
  timestamp: string;
  signature: string;
}

export default function WipeFlow({ defaultDevice = 'iPhone 13 Pro' }: { defaultDevice?: string }) {
  const [status, setStatus] = useState<'idle' | 'wiping' | 'done'>('idle');
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  const handleWipe = () => {
    setStatus('wiping');
    
    // Simulate wipe process (1.5 seconds)
    setTimeout(() => {
      const fakeCert: Certificate = {
        certificateId: 'CERT-' + Math.floor(Math.random() * 1000000),
        user: 'IamSuser',
        device: defaultDevice,
        standard: 'NIST 800-88',
        timestamp: new Date().toLocaleString(),
        signature: 'SIG-' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      };
      setCertificate(fakeCert);
      setStatus('done');
    }, 1500);
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
    <div className="space-y-3">
      {status === 'idle' && (
        <button
          onClick={handleWipe}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          Wipe Device Now
        </button>
      )}

      {status === 'wiping' && (
        <div className="flex flex-col items-center space-y-3 py-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-blue-600 h-3 w-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Wiping in progress…</p>
        </div>
      )}

      {status === 'done' && certificate && (
        <div className="mt-4 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-green-600">
              ✅ Wipe Completed Successfully!
            </h2>
          </div>
          <div className="text-left space-y-2 text-gray-700 mb-4">
            <p><strong>Certificate ID:</strong> {certificate.certificateId}</p>
            <p><strong>User:</strong> {certificate.user}</p>
            <p><strong>Device:</strong> {certificate.device}</p>
            <p><strong>Standard:</strong> {certificate.standard}</p>
            <p><strong>Timestamp:</strong> {certificate.timestamp}</p>
            <p><strong>Signature:</strong> {certificate.signature}</p>
          </div>
          <button
            onClick={downloadCertificate}
            className="w-full px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
          >
            Download Certificate (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
