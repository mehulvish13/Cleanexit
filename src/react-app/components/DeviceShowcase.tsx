import { Smartphone, Laptop, HardDrive, Zap, Play, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';
import { useNavigate } from 'react-router';

export default function DeviceShowcase() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartWiping = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
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
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">Device Wiping Center</h2>
              <p className="text-blue-100">Professional data erasure for all device types</p>
            </div>
            
            <div className="p-8">
              {/* Device Types */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {devices.map((device, index) => (
                  <div key={index} className="text-center group">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 mb-3 group-hover:from-blue-200 group-hover:to-blue-300 transition-all transform group-hover:scale-105">
                      <div className="text-3xl mb-2">{device.emoji}</div>
                      <device.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-bold text-gray-800">{device.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ready to Wipe Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Zap className="w-6 h-6 text-green-600" />
                    <span className="text-xl font-bold text-green-800">Ready to Wipe</span>
                  </div>
                  <p className="text-green-700 font-semibold">
                    NVMe & SATA SSDs
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Latest generation storage devices supported
                  </p>
                </div>
              </div>

              {/* Start Wiping Button */}
              <div className="text-center mb-8">
                <button
                  onClick={handleStartWiping}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
                >
                  <Play className="w-6 h-6" />
                  <span>Start Wiping Now</span>
                </button>
                <p className="text-gray-500 text-sm mt-2">
                  {user ? 'Access your dashboard to begin' : 'Sign in to get started'}
                </p>
              </div>

              {/* Security Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-center text-lg font-bold text-gray-800 mb-4">Security Standards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center space-x-3 bg-gray-50 rounded-xl p-4">
                      <span className="text-2xl">{feature.emoji}</span>
                      <div className="text-center">
                        <feature.icon className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                        <span className="text-sm font-semibold text-gray-800">{feature.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800 text-sm font-medium">
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
