import { useAuth } from '@getmocha/users-service/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function AuthCallbackPage() {
  const { exchangeCodeForSessionToken, user } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await exchangeCodeForSessionToken();
        setStatus('success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [exchangeCodeForSessionToken, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Cleanexit</span>
          </div>

          {status === 'loading' && (
            <div className="space-y-4">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <h2 className="text-2xl font-bold text-gray-900">Authenticating...</h2>
              <p className="text-gray-600">Please wait while we verify your credentials</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Cleanexit!</h2>
              <p className="text-gray-600">
                Authentication successful. Redirecting to your dashboard...
              </p>
              {user && (
                <p className="text-sm text-gray-500">
                  Signed in as {user.google_user_data.name || user.email}
                </p>
              )}
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Authentication Failed</h2>
              <p className="text-gray-600">
                {error || 'There was an error signing you in. Please try again.'}
              </p>
              <p className="text-sm text-gray-500">
                Redirecting back to login page...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
