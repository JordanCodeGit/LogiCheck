import ApiKeySettings from '../components/ApiKeySettings';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 py-12 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300">Configure your LogiCheck experience</p>
        </div>
        
        <ApiKeySettings />
      </div>
    </div>
  );
};

export default SettingsPage;
