import { Link } from 'react-router-dom';
import { Brain, Gamepad2, FileText, Sparkles, Target, BookOpen, Puzzle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      title: t('home.features.analyzer.title'),
      description: t('home.features.analyzer.description'),
      icon: Brain,
      path: '/analyzer',
      color: 'from-blue-500 to-cyan-500',
      isHighlight: false,
    },
    {
      title: t('home.features.dojo.title'),
      description: t('home.features.dojo.description'),
      icon: Gamepad2,
      path: '/dojo',
      color: 'from-purple-500 to-pink-500',
      isHighlight: true, // Dojo is highlighted
    },
    {
      title: t('home.features.clinic.title'),
      description: t('home.features.clinic.description'),
      icon: FileText,
      path: '/essay-clinic',
      color: 'from-green-500 to-emerald-500',
      isHighlight: false,
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: t('home.benefits.precision.title'),
      description: t('home.benefits.precision.description'),
    },
    {
      icon: Sparkles,
      title: t('home.benefits.socratic.title'),
      description: t('home.benefits.socratic.description'),
    },
    {
      icon: BookOpen,
      title: t('home.benefits.educational.title'),
      description: t('home.benefits.educational.description'),
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-4 px-4">
        <div className="inline-block">
          <img 
            src="/logo-logicheck.png" 
            alt="LogiCheck Logo" 
            className="w-36 h-36 mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-300 dark:to-secondary-300 bg-clip-text text-transparent leading-tight pb-2">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {t('home.subtitle')}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md md:max-w-none mx-auto">
          <Link
            to="/analyzer"
            className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-medium text-center"
          >
            {t('home.getStarted')}
          </Link>
          <Link
            to="/extension"
            className="inline-block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-medium text-center"
          >
            {t('home.downloadExtension')}
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.path}
              to={feature.path}
              className={`group card hover:shadow-xl transition-all transform hover:-translate-y-2 relative ${
                feature.isHighlight 
                  ? 'ring-4 ring-purple-400 dark:ring-purple-500 ring-offset-2 dark:ring-offset-gray-900 shadow-2xl animate-pulse-slow' 
                  : ''
              }`}
            >
              {/* Highlight Badge */}
              {feature.isHighlight && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-bounce-slow">
                  ⭐ {t('home.featured')}
                </div>
              )}
              <div className="flex items-center">
                <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl inline-block group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold ml-4 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                {feature.description}
              </p>
              <div className="mt-4 text-primary-600 font-medium flex items-center space-x-2 group-hover:space-x-3 transition-all">
                <span>{t('home.exploreFeature')}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Benefits Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md transition-colors">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">{t('home.whyLogiCheck')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-xl inline-block mb-4 transition-colors">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-center text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4">{t('home.readyToStart')}</h2>
        <p className="text-lg mb-8 opacity-90">
          {t('home.joinThousands')}
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/analyzer"
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors"
          >
            {t('home.tryAnalyzer')}
          </Link>
          <Link
            to="/dojo"
            className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            {t('home.practiceInDojo')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
