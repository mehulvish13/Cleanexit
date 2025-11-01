/**
 * DASHBOARD PAGE (User's Private Dashboard)
 * 
 * This is the authenticated user's control center after logging in.
 * 
 * MAIN FEATURES:
 * 1. Subscription Overview Card
 *    - Shows current plan (Starter/Pro/Advanced)
 *    - Displays device credits used/remaining
 *    - Progress bar for credit usage
 *    - Upgrade/Change plan button
 * 
 * 2. Statistics Grid
 *    - Devices Processed: 247
 *    - Compliance Reports: 18
 *    - Active Projects: 3
 *    - Team Members: 12
 * 
 * 3. Recent Activity Feed
 *    - Shows recent erasure jobs
 *    - Status indicators (Completed, In Progress, Scheduled)
 * 
 * 4. Quick Actions Panel
 *    - Request Data Erasure
 *    - View Compliance Reports
 *    - Schedule Consultation
 * 
 * 5. Security Score Widget
 *    - Gamified metric showing org health (98%)
 * 
 * PROTECTION:
 * - Auto-redirects to /login if not authenticated
 * - Fetches user's subscription from backend on load
 * - Handles logout with cleanup
 */

import { useAuth } from '@/react-app/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, LogOut, FileCheck, HardDrive, Server, Users, BarChart3 } from 'lucide-react';
import Sid from '@/react-app/components/Sid';
import WipeFlow from '@/react-app/components/WipeFlow';

// TypeScript interface for subscription data from API
interface SubscriptionData {
  plan_name: string;           // "Starter", "Pro", or "Advanced"
  price: number;               // Monthly cost in INR
  devices_limit: number;       // Max devices per month (-1 = unlimited)
  devices_used: number;        // Devices used this month
  devices_remaining: number;   // Credits left
  status: string;              // "active", "cancelled", "expired"
}

export default function DashboardPage() {
  // Get auth state from AuthProvider
  const { user, logout, isPending } = useAuth();
  const navigate = useNavigate();
  
  // Local state for subscription data
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isPending && !user) {
      navigate('/login');
    }
  }, [user, isPending, navigate]);

  // Fetch user's subscription details when component mounts
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;

      try {
        const response = await fetch('/api/users/subscription');
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { icon: HardDrive, label: 'Devices Processed', value: '247', color: 'text-blue-600' },
    { icon: FileCheck, label: 'Compliance Reports', value: '18', color: 'text-green-600' },
    { icon: Server, label: 'Active Projects', value: '3', color: 'text-purple-600' },
    { icon: Users, label: 'Team Members', value: '12', color: 'text-orange-600' },
  ];

  const recentActivity = [
    { action: 'Hard Drive Erasure', device: 'MacBook Pro 2021', status: 'Completed', time: '2 hours ago' },
    { action: 'Server Decommission', device: 'Dell PowerEdge R740', status: 'In Progress', time: '4 hours ago' },
    { action: 'Mobile Device Wipe', device: 'iPhone 13 Pro', status: 'Completed', time: '1 day ago' },
    { action: 'Database Sanitization', device: 'MySQL Production DB', status: 'Scheduled', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Cleanexit</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">
                    {user.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.username}!
          </h1>
          <p className="text-gray-600">
            Monitor your data security operations and manage erasure requests from your dashboard.
          </p>
        </div>

        {/* Subscription Overview */}
        {subscription && !loadingSubscription && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Current Plan: {subscription.plan_name}</h2>
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-blue-100 text-sm">Device Credits Remaining</p>
                    <p className="text-3xl font-bold">
                      {subscription.devices_remaining}
                      {subscription.devices_limit > 0 && (
                        <span className="text-lg text-blue-200">/{subscription.devices_limit}</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Used This Month</p>
                    <p className="text-xl font-bold">{subscription.devices_used}</p>
                  </div>
                  {subscription.price > 0 && (
                    <div>
                      <p className="text-blue-100 text-sm">Monthly Cost</p>
                      <p className="text-xl font-bold">₹{subscription.price}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                {subscription.devices_remaining === 0 && subscription.devices_limit > 0 && (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-2">
                    <p className="font-semibold">Credits Exhausted</p>
                  </div>
                )}
                <button 
                  onClick={() => navigate('/#pricing')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  {subscription.plan_name === 'Starter' ? 'Upgrade Plan' : 'Change Plan'}
                </button>
              </div>
            </div>
            
            {subscription.devices_limit > 0 && (
              <div className="mt-4">
                <div className="bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-white rounded-full h-3 transition-all duration-300"
                    style={{ 
                      width: `${Math.max(5, (subscription.devices_used / subscription.devices_limit) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingSubscription && (
          <div className="bg-gray-100 rounded-2xl p-6 mb-8 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{activity.action}</h3>
                      <p className="text-sm text-gray-600">{activity.device}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {activity.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <WipeFlow defaultDevice="iPhone 13 Pro" />
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  View Compliance Reports
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Schedule Consultation
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <BarChart3 className="w-8 h-8 mb-4 text-blue-200" />
              <h3 className="text-lg font-bold mb-2">Security Score</h3>
              <p className="text-3xl font-bold text-white mb-2">98%</p>
              <p className="text-blue-100 text-sm">
                Your organization maintains excellent data security practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sera AI Assistant */}
      <Sid />
    </div>
  );
}
