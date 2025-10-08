import { Download, Chrome, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

const ExtensionPage = () => {
  const handleDownload = () => {
    // Link will point to the extension zip file
    const link = document.createElement('a');
    link.href = '/logicheck-extension.zip';
    link.download = 'logicheck-extension.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Chrome className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600 dark:text-primary-400" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-300 dark:to-secondary-300 bg-clip-text text-transparent">
            LogiCheck Extension
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          Analyze logical arguments directly from your browser
        </p>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 px-3 sm:px-4 py-2 rounded-full transition-colors text-sm sm:text-base">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="font-medium">Extension on Chrome Web Store & Edge Add-ons - Coming Soon!</span>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Download Extension</h2>
          <p className="text-gray-600 dark:text-gray-300">
            While waiting for the extension to be available on the Web Store, you can install it manually
          </p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Download className="w-6 h-6" />
            <span>Download Extension Package</span>
          </button>
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Chrome Installation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src="/chrome-logo-placeholder.png" alt="Chrome" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Google Chrome</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm transition-colors">
                1
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Download the extension file and extract the ZIP</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm transition-colors">
                2
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Open Chrome and type in the address bar:</p>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm text-gray-800 dark:text-gray-200 transition-colors">
                  chrome://extensions/
                </code>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm transition-colors">
                3
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Enable <strong>Developer mode</strong> in the top right corner</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm transition-colors">
                4
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Click <strong>Load unpacked</strong> and select the extracted extension folder</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm transition-colors">
                5
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">LogiCheck Extension is ready to use! 🎉</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edge Installation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src="/edge-logo-placeholder.png" alt="Edge" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Microsoft Edge</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center text-secondary-700 dark:text-secondary-400 font-bold text-sm transition-colors">
                1
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Download the extension file and extract the ZIP</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center text-secondary-700 dark:text-secondary-400 font-bold text-sm transition-colors">
                2
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Open Edge and type in the address bar:</p>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm text-gray-800 dark:text-gray-200 transition-colors">
                  edge://extensions/
                </code>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center text-secondary-700 dark:text-secondary-400 font-bold text-sm transition-colors">
                3
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Enable <strong>Developer mode</strong> in the left sidebar</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center text-secondary-700 dark:text-secondary-400 font-bold text-sm transition-colors">
                4
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Click <strong>Load unpacked</strong> and select the extracted extension folder</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center text-secondary-700 dark:text-secondary-400 font-bold text-sm transition-colors">
                5
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">LogiCheck Extension is ready to use! 🎉</p>
              </div>
            </div>
          </div>
        </div>

        {/* Firefox Installation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src="/firefox-logo-placeholder.png" alt="Firefox" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Mozilla Firefox</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-sm transition-colors">
                1
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Download the extension file and extract the ZIP</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-sm transition-colors">
                2
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Open Firefox and type in the address bar:</p>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm text-gray-800 dark:text-gray-200 transition-colors">
                  about:addons
                </code>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-sm transition-colors">
                3
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Click <strong>Install Add-on From File</strong> and select the extracted extension folder</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-sm transition-colors">
                4
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">LogiCheck Extension is ready to use! 🎉</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safari Installation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src="/safari-logo-placeholder.png" alt="Safari" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Apple Safari</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-sm transition-colors">
                1
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Download the extension file and extract the ZIP</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-sm transition-colors">
                2
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Open Safari and go to Preferences &gt; Extensions</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-sm transition-colors">
                3
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">Click <strong>Install</strong> and select the extracted extension folder</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-sm transition-colors">
                4
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">LogiCheck Extension is ready to use! 🎉</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800 transition-colors">
        <div className="flex items-start space-x-3">
          <CheckCircle2 className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Usage Tips</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• After installation, click the LogiCheck icon in your browser toolbar</li>
              <li>• Enter the Gemini API key in the extension settings</li>
              <li>• Select the text you want to analyze, then right-click and choose "Analyze with LogiCheck"</li>
              <li>• The extension will automatically sync with the website for a seamless experience</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">FAQ</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Why install manually?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              LogiCheck Extension is currently under review for publication on Chrome Web Store and Edge Add-ons.
              While waiting for approval, you can install it manually.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Is it safe to install manually?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, it is completely safe. This extension is open source, and you can inspect its source code.
              Manual installation only requires Developer mode temporarily.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">How to update the extension?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              For now, update manually by downloading the latest version. Once available on the Web Store,
              updates will be automatic like other extensions.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Need help? Contact us via the Settings page or GitHub Issues</p>
      </div>
    </div>
  );
};

export default ExtensionPage;
