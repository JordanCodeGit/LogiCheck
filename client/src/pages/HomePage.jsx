import { Link } from 'react-router-dom';
import { Brain, Gamepad2, FileText, Sparkles, Target, BookOpen } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      title: 'Core Analyzer',
      description: 'Paste any text and get instant analysis of logical fallacies, hidden assumptions, and argument structure. Engage in Socratic dialogue to deepen your understanding.',
      icon: Brain,
      path: '/analyzer',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'The Dojo',
      description: 'Sharpen your skills through gamified practice. Identify fallacies in real-world scenarios and challenge your bias blindspots.',
      icon: Gamepad2,
      path: '/dojo',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Essay Clinic',
      description: 'Improve your argumentative writing. Get AI-powered feedback on thesis cohesion, evidence linkage, and logical flow.',
      icon: FileText,
      path: '/essay-clinic',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Precision Analysis',
      description: 'Powered by advanced AI to detect subtle logical flaws and biases in arguments.',
    },
    {
      icon: Sparkles,
      title: 'Socratic Method',
      description: 'Engage in thoughtful dialogue that encourages critical thinking and self-reflection.',
    },
    {
      icon: BookOpen,
      title: 'Educational Focus',
      description: 'Designed specifically for students, academics, and lifelong learners.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-4 px-4">
        <div className="inline-block">
          <img 
            src="/public/Logo Logicheck Kotak.png" 
            alt="LogiCheck Logo" 
            className="w-48 h-48 mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent leading-tight pb-2">
          Welcome to LogiCheck
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Your Conversational AI Coach for Sharpening Logical Reasoning in an Era of Mass Information
        </p>
        <Link
          to="/analyzer"
          className="inline-block btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          Start Analyzing
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.path}
              to={feature.path}
              className="group card hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 text-primary-600 font-medium flex items-center space-x-2 group-hover:space-x-3 transition-all">
                <span>Explore</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Benefits Section */}
      <section className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-12">Why LogiCheck?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-primary-50 p-4 rounded-xl inline-block mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-center text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Strengthen Your Reasoning?</h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of students and academics using LogiCheck to enhance their critical thinking skills.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/analyzer"
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Try Analyzer
          </Link>
          <Link
            to="/dojo"
            className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Practice in Dojo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
