import { Smartphone, Laptop, HardDrive, Zap, Play, Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function DeviceShowcase() {
  const navigate = useNavigate();

  const handleStartWiping = () => {
    navigate('/login?returnTo=%2Fcertificate');
  };

  const devices = [
    { icon: Smartphone, label: 'PHONE', emoji: '📱' },
    { icon: Laptop, label: 'LAPTOP', emoji: '💻' },
    { icon: HardDrive, label: 'HDD', emoji: '💾' },
    { icon: Zap, label: 'SSD', emoji: '⚡' }
  ];

  const securityFeatures = [
    { icon: Shield, label: 'AES-256 Encryption', emoji: '🔒' },
    { icon: Shield, label: 'DoD 5220.22-M', emoji: '🛡️' },
    { icon: CheckCircle, label: 'GDPR Compliant', emoji: '✓' }
  ];

  return (
  <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Device Wiping Center</h2>
              <p className="text-blue-100">Professional data erasure for all device types</p>
            </div>
            
            <div className="p-4 sm:p-6">
              {/* Device Types */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {devices.map((device, index) => (
                  <div key={index} className="text-center group">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 mb-2 group-hover:from-blue-200 group-hover:to-blue-300 transition-all transform group-hover:scale-105">
                      <div className="text-2xl mb-1">{device.emoji}</div>
                      <device.icon className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-xs font-bold text-gray-800">{device.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ready to Wipe Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 mb-6 border border-green-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="text-lg font-bold text-green-800">Ready to Wipe</span>
                  </div>
                  <p className="text-green-700 font-semibold text-sm">
                    NVMe & SATA SSDs
                  </p>
                  <p className="text-green-600 text-xs mt-1">
                    Latest generation storage devices supported
                  </p>
                </div>
              </div>

              {/* Start Wiping Button */}
              <div className="text-center mb-6">
                <button
                  onClick={handleStartWiping}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Sign In to Start</span>
                </button>
                <p className="text-gray-500 text-xs mt-2">
                  Sign in to begin a compliant wipe and generate a certificate
                </p>
              </div>

              {/* Security Features */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-center text-sm sm:text-base font-bold text-gray-800 mb-3">Security Standards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2 bg-gray-50 rounded-lg p-3">
                      <span className="text-xl">{feature.emoji}</span>
                      <div className="text-center">
                        <feature.icon className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                        <span className="text-xs font-semibold text-gray-800">{feature.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full">
                  <Shield className="w-3 h-3 text-blue-600" />
                  <span className="text-blue-800 text-xs font-medium">
                    Military-grade data destruction with audit trail
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
