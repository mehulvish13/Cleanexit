import { useState, useEffect } from 'react';
import { CheckCircle, Shield, Download, ArrowLeft, Home, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

interface Certificate {
  certificateId: string;
  user: string;
  device: string;
  standard: string;
  timestamp: string;
  signature: string;
}

export default function CertificatePage() {
  const [status, setStatus] = useState<'loading' | 'done'>('loading');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const fakeCert: Certificate = {
        certificateId: 'CERT-' + Math.floor(Math.random() * 1000000),
        user: user?.username || 'Guest',
        device: 'Device',
        standard: 'NIST 800-88',
        timestamp: new Date().toLocaleString(),
        signature: 'SIG-' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      };
      setCertificate(fakeCert);
      setStatus('done');
    }, 2500);

    return () => clearTimeout(timer);
  }, [user]);

  const downloadCertificate = () => {
    if (!certificate) return;
    
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    
    doc.setFillColor(29, 78, 216);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificate of Data Erasure', 50, 45);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Cleanexit Certificate Authority', 50, 65);

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

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('This certificate confirms that the device listed above underwent compliant data erasure and verification.', 50, y + 20, { maxWidth: 500 });

    doc.save(`${certificate.certificateId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 flex items-center justify-center p-4">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 flex items-center space-x-2 text-white hover:text-blue-300 dark:hover:text-brand-400 transition-colors z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </motion.button>

      <div className="w-full max-w-xl sm:max-w-2xl">
        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 dark:border-gray-700"
            >
              <div className="flex flex-col items-center space-y-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center space-x-3 mb-4"
                >
                  <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 dark:text-brand-400" />
                </motion.div>

                <div className="relative">
                  <Loader2 className="w-16 h-16 sm:w-24 sm:h-24 text-blue-400 dark:text-brand-400 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500/20 dark:bg-brand-500/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="w-full bg-white/20 dark:bg-gray-700/50 rounded-full h-3 sm:h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                    className="bg-blue-500 dark:bg-brand-500 h-3 sm:h-4"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-2"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    Processing Wipe...
                  </p>
                  <p className="text-blue-200 dark:text-brand-200">
                    Securely erasing all data and generating certificate
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {status === 'done' && certificate && (
            <motion.div
              key="done"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200 dark:border-gray-800"
            >
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 dark:text-green-500" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-500 mb-2">
                    ✅ Wipe Completed Successfully!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your device has been securely wiped
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 text-left border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 text-center">
                    Certificate Details
                  </h3>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 text-sm sm:text-base">
                      <span className="font-medium">Certificate ID:</span>
                      <span className="font-mono text-gray-900 dark:text-white">{certificate.certificateId}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 text-sm sm:text-base">
                      <span className="font-medium">User:</span>
                      <span className="text-gray-900 dark:text-white">{certificate.user}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 text-sm sm:text-base">
                      <span className="font-medium">Device:</span>
                      <span className="text-gray-900 dark:text-white">{certificate.device}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 text-sm sm:text-base">
                      <span className="font-medium">Standard:</span>
                      <span className="text-blue-600 dark:text-brand-400 font-semibold">{certificate.standard}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 text-xs sm:text-sm">
                      <span className="font-medium">Timestamp:</span>
                      <span className="text-sm text-gray-900 dark:text-white">{certificate.timestamp}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-medium">Signature:</span>
                      <span className="font-mono text-gray-900 dark:text-white">{certificate.signature}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <button
                    onClick={downloadCertificate}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-xl font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Download Certificate (PDF)</span>
                  </button>
                  
                  <button
                    onClick={() => navigate('/')}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Return to Home</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
