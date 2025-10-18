import { useState } from 'react';
import { Watch, Smartphone, Key, Database, Shield, CheckCircle, Download } from 'lucide-react';

const ECGAuthDiagram = () => {
  const [activePhase, setActivePhase] = useState<keyof typeof phases>('enrollment');

  const phases = {
    enrollment: {
      title: 'Enrollment Phase',
      color: 'bg-blue-500',
      steps: [
        { device: 'iPhone', action: 'User initiates enrollment', framework: 'UIKit/SwiftUI' },
        { device: 'iPhone', action: 'Request HealthKit permissions', framework: 'HealthKit' },
        { device: 'Watch', action: 'Capture 3× 30s ECG recordings', framework: 'HKElectrocardiogram' },
        { device: 'Watch', action: 'Pre-process signal (filter, normalize)', framework: 'Accelerate' },
        { device: 'iPhone', action: 'Generate/derive secret key k', framework: 'CryptoKit + Secure Enclave' },
        { device: 'Watch', action: 'Concatenate key with ECG features', framework: 'Core ML' },
        { device: 'Watch', action: 'Run inference → embeddings', framework: 'Core ML' },
        { device: 'iPhone', action: 'Aggregate embeddings → template', framework: 'Swift' },
        { device: 'iPhone', action: 'Store template + key in Secure Enclave', framework: 'Keychain (kSecAttrAccessible...)' },
        { device: 'iPhone', action: 'Delete raw ECG data', framework: 'Data minimization' }
      ]
    },
    authentication: {
      title: 'Authentication Phase',
      color: 'bg-green-500',
      steps: [
        { device: 'iPhone', action: 'User triggers unlock/auth action', framework: 'LocalAuthentication' },
        { device: 'Watch', action: 'Vibrate + prompt for ECG', framework: 'WatchKit' },
        { device: 'Watch', action: 'Capture 30s ECG (finger on crown)', framework: 'HKElectrocardiogram' },
        { device: 'Watch', action: 'Pre-process signal', framework: 'Accelerate' },
        { device: 'Watch', action: 'Fetch stored key k', framework: 'Keychain Sync' },
        { device: 'Watch', action: 'Concatenate key + ECG features', framework: 'Core ML' },
        { device: 'Watch', action: 'Run inference → new embedding', framework: 'Core ML' },
        { device: 'Watch', action: 'Send embedding to iPhone (encrypted)', framework: 'WatchConnectivity' },
        { device: 'iPhone', action: 'Secure Enclave: compute distance', framework: 'Secure Enclave API' },
        { device: 'iPhone', action: 'Compare distance vs threshold', framework: 'Secure Enclave' },
        { device: 'iPhone', action: 'Return success/failure only', framework: 'LocalAuthentication' },
        { device: 'iPhone', action: 'Grant access or fallback', framework: 'System Integration' }
      ]
    },
    revocation: {
      title: 'Template Revocation',
      color: 'bg-purple-500',
      steps: [
        { device: 'iPhone', action: 'User requests key regeneration', framework: 'Settings UI' },
        { device: 'iPhone', action: 'Generate new secret key k\'', framework: 'CryptoKit' },
        { device: 'iPhone', action: 'Delete old template from Secure Enclave', framework: 'Keychain' },
        { device: 'Watch', action: 'Capture new ECG set', framework: 'HealthKit' },
        { device: 'Watch', action: 'Concatenate new key k\' + ECG', framework: 'Core ML' },
        { device: 'Watch', action: 'Generate new template', framework: 'Core ML' },
        { device: 'iPhone', action: 'Store new template + k\'', framework: 'Secure Enclave' },
        { device: 'iPhone', action: 'Old template now invalid', framework: 'Cancelability' }
      ]
    }
  };

  const deviceColor = (device: string) => {
    if (device === 'Watch') return 'bg-gray-700 text-white';
    if (device === 'iPhone') return 'bg-gray-800 text-white';
    return 'bg-gray-600 text-white';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SECURE HEART-ID Authentication System</h1>
            <p className="text-gray-600">Developer Architecture & Data Flow</p>
          </div>
          <a
            href="/Secure-HeartID/ECG ID authentication system.pdf"
            download="ECG ID authentication system.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      </div>

      {/* Phase Selector */}
      <div className="flex gap-4 mb-8">
        {Object.entries(phases).map(([key, phase]) => (
          <button
            key={key}
            onClick={() => setActivePhase(key as keyof typeof phases)}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activePhase === key
                ? `${phase.color} text-white shadow-lg transform scale-105`
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {phase.title}
          </button>
        ))}
      </div>

      {/* System Components Overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Watch className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-lg">Apple Watch</h3>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• ECG sensor capture</li>
            <li>• Signal preprocessing</li>
            <li>• Core ML inference</li>
            <li>• WatchConnectivity</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <Smartphone className="w-8 h-8 text-green-600" />
            <h3 className="font-bold text-lg">iPhone</h3>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• UI/UX coordination</li>
            <li>• Key generation</li>
            <li>• Template storage</li>
            <li>• Match decision</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-purple-600" />
            <h3 className="font-bold text-lg">Secure Enclave</h3>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Template isolation</li>
            <li>• Distance computation</li>
            <li>• Key storage</li>
            <li>• Match-only output</li>
          </ul>
        </div>
      </div>

      {/* Active Phase Steps */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className={`text-2xl font-bold mb-6 pb-3 border-b-2 ${phases[activePhase].color.replace('bg-', 'border-')}`}>
          {phases[activePhase].title}
        </h2>
        
        <div className="space-y-3">
          {phases[activePhase].steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${deviceColor(step.device)}`}>
                    {step.device}
                  </span>
                  {step.device === 'Watch' && <Watch className="w-4 h-4 text-gray-400" />}
                  {step.device === 'iPhone' && <Smartphone className="w-4 h-4 text-gray-400" />}
                </div>
                
                <p className="font-semibold text-gray-900 mb-1">{step.action}</p>
                <p className="text-sm text-blue-600 font-mono">{step.framework}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Technical Details */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-yellow-600" />
            Security Features
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Secure Triplet Loss:</strong> Key-binding for cancelability</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Template Protection:</strong> Stored in Secure Enclave</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Data Minimization:</strong> Raw ECG deleted post-processing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Encrypted Transit:</strong> WatchConnectivity encryption</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Data Flow Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-24 text-gray-600 font-semibold">Input:</div>
              <div className="flex-1 bg-gray-100 px-3 py-2 rounded">30s Lead-I ECG (~512 Hz)</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 text-gray-600 font-semibold">Process:</div>
              <div className="flex-1 bg-gray-100 px-3 py-2 rounded">Filter → Normalize → Key concat</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 text-gray-600 font-semibold">Output:</div>
              <div className="flex-1 bg-gray-100 px-3 py-2 rounded">Fixed embedding vector</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 text-gray-600 font-semibold">Match:</div>
              <div className="flex-1 bg-gray-100 px-3 py-2 rounded">Euclidean distance &lt; threshold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Requirements */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
        <h3 className="font-bold text-lg mb-3">Required Frameworks & Entitlements</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-blue-700 mb-2">watchOS</p>
            <ul className="space-y-1 text-gray-700">
              <li>• HealthKit</li>
              <li>• Core ML</li>
              <li>• WatchConnectivity</li>
              <li>• Accelerate</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-green-700 mb-2">iOS</p>
            <ul className="space-y-1 text-gray-700">
              <li>• CryptoKit</li>
              <li>• LocalAuthentication</li>
              <li>• Security (Keychain)</li>
              <li>• CloudKit (sync)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-purple-700 mb-2">Info.plist Keys</p>
            <ul className="space-y-1 text-gray-700 font-mono text-xs">
              <li>• NSHealthShareUsage...</li>
              <li>• NSHealthUpdateUsage...</li>
              <li>• com.apple.developer...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECGAuthDiagram;