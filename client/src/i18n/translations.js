/**
 * LogiCheck - Internationalization (i18n) Translations
 * Comprehensive translations for English (en) and Indonesian (id)
 */

export const translations = {
  en: {
    // Common UI elements
    common: {
      language: 'Language',
      english: 'English',
      indonesian: 'Indonesian',
      settings: 'Settings',
      analyze: 'Analyze',
      analyzing: 'Analyzing',
      cancel: 'Cancel',
      close: 'Close',
      save: 'Save',
      saving: 'Saving',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      note: 'Note',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      test: 'Test',
      testing: 'Testing',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied',
      reset: 'Reset',
      start: 'Start',
      stop: 'Stop',
      pause: 'Pause',
      resume: 'Resume',
      retry: 'Retry',
      submit: 'Submit',
      continue: 'Continue',
      finish: 'Finish',
    },

    // Navigation
    nav: {
      home: 'Home',
      analyzer: 'Analyzer',
      dojo: 'Dojo',
      essayClinic: 'Essay Clinic',
      extension: 'Extension',
      settings: 'Settings',
    },

    // Home Page
    home: {
      title: 'Welcome to LogiCheck',
      subtitle: 'Your Conversational AI Coach for Sharpening Logical Reasoning in an Era of Mass Information',
      description: 'Master the art of critical thinking with AI-powered analysis, gamified practice, and personalized feedback.',
      getStarted: 'Start Analyzing',
      learnMore: 'Learn More',
      downloadExtension: 'Download Our Extension',
      exploreFeature: 'Explore',
      featured: 'Featured',
      whyLogiCheck: 'Why LogiCheck?',
      readyToStart: 'Ready to Strengthen Your Reasoning?',
      joinThousands: 'Join thousands of students and academics using LogiCheck to enhance their critical thinking skills.',
      tryAnalyzer: 'Try Analyzer',
      practiceInDojo: 'Practice in Dojo',
      features: {
        title: 'Features',
        analyzer: {
          title: 'Core Analyzer',
          description: 'Paste any text and get instant analysis of logical fallacies, hidden assumptions, and argument structure. Engage in Socratic dialogue to deepen your understanding.',
        },
        dojo: {
          title: 'The Dojo',
          description: 'Sharpen your skills through gamified practice. Identify fallacies in real-world scenarios and challenge your bias blindspots.',
        },
        clinic: {
          title: 'Essay Clinic',
          description: 'Improve your argumentative writing. Get AI-powered feedback on thesis cohesion, evidence linkage, and logical flow.',
        },
        extension: {
          title: 'Browser Extension',
          description: 'Analyze content directly on any webpage with LogiCheck Lens.',
        },
      },
      benefits: {
        precision: {
          title: 'Precision Analysis',
          description: 'Powered by advanced AI to detect subtle logical flaws and biases in arguments.',
        },
        socratic: {
          title: 'Socratic Method',
          description: 'Engage in thoughtful dialogue that encourages critical thinking and self-reflection.',
        },
        educational: {
          title: 'Educational Focus',
          description: 'Designed specifically for students, academics, and lifelong learners.',
        },
      },
    },

    // Analyzer Page
    analyzer: {
      title: 'Core Analyzer',
      subtitle: 'Analyze text for logical fallacies and reasoning',
      inputPlaceholder: 'Paste or type the text you want to analyze here...',
      analyzeButton: 'Analyze Text',
      analyzingButton: 'Analyzing...',
      stopButton: 'Stop Analysis',
      clearButton: 'Clear',
      characterCount: 'characters',
      maxCharacters: 'Maximum 10,000 characters',
      results: {
        title: 'Analysis Results',
        mainClaim: 'Main Claim',
        assumptions: 'Underlying Assumptions',
        fallacies: 'Logical Fallacies',
        noFallacies: 'No logical fallacies detected',
        socraticQuestion: 'Socratic Question',
        socraticPrompt: 'Reflect on this question to deepen your understanding:',
      },
      errors: {
        emptyText: 'Please enter some text to analyze',
        tooLong: 'Text is too long. Please limit to 10,000 characters.',
        noApiKey: 'Please configure your API key in Settings first',
        analysisFailed: 'Analysis failed. Please try again.',
        cancelled: 'Analysis was cancelled',
      },
    },

    // Dojo Page
    dojo: {
      title: 'The Dojo',
      subtitle: 'Sharpen your logical reasoning skills through gamified practice',
      stats: {
        progress: 'Your Progress',
        correct: 'Correct',
        mastery: 'Mastery Level',
        novice: 'Novice',
        apprentice: 'Apprentice',
        expert: 'Expert',
      },
      modes: {
        sparring: 'Fallacy Sparring',
        bias: 'Bias Blindspot',
      },
      sparring: {
        title: 'Fallacy Sparring',
        description: 'Identify fallacies in scenarios',
        newChallenge: 'New Challenge',
        loadingChallenge: 'Loading challenge...',
        scenario: 'Scenario',
        question: 'Which logical fallacy is present in this scenario?',
        submit: 'Submit Answer',
        checking: 'Checking...',
        correct: 'Correct!',
        incorrect: 'Not quite right',
        correctAnswer: 'Correct Answer',
        explanation: 'Explanation',
        nextChallenge: 'Next Challenge',
        score: 'Score',
        streak: 'Streak',
      },
      bias: {
        title: 'Bias Blindspot',
        description: 'Identify biased language',
        challengeTitle: 'Bias Blindspot Challenge',
        newTopic: 'New Topic',
        loadingChallenge: 'Loading challenge...',
        translating: 'Translating articles to your language...',
        topic: 'Topic',
        categories: 'Bias Categories',
        loadedLanguage: 'Loaded Language',
        loadedLanguageDesc: 'Words with strong connotations',
        emotionalAppeals: 'Emotional Appeals',
        emotionalAppealsDesc: 'Appeals to emotion over logic',
        biasedFraming: 'Biased Framing',
        biasedFramingDesc: 'Selective presentation',
        getFeedback: 'Get Feedback on My Analysis',
        errorNoHighlights: 'Please highlight some text in both articles before submitting.',
        reflectionTitle: 'Reflection Questions',
        reflectionQ1: 'What patterns of bias did you notice in each article?',
        reflectionQ2: 'How does each source frame the issue differently?',
        reflectionQ3: 'Which specific words or phrases reveal the author\'s perspective?',
        reflectionQ4: 'How might a neutral presentation of this topic differ from both articles?',
      },
      fallacies: {
        'Ad Hominem': 'Ad Hominem',
        'Straw Man': 'Straw Man',
        'Hasty Generalization': 'Hasty Generalization',
        'Appeal to Authority': 'Appeal to Authority',
        'False Dilemma': 'False Dilemma',
        'Slippery Slope': 'Slippery Slope',
        'Circular Reasoning': 'Circular Reasoning',
        'Red Herring': 'Red Herring',
        'Appeal to Emotion': 'Appeal to Emotion',
        'Bandwagon': 'Bandwagon',
      },
    },

    // Essay Clinic Page
    clinic: {
      title: 'Essay Clinic',
      subtitle: 'Improve your argumentative writing',
      inputPlaceholder: 'Write or paste your essay here...',
      analyzeButton: 'Analyze Essay',
      analyzingButton: 'Analyzing...',
      analyzing: 'Analyzing',
      analyzingText: 'Analyzing your essay...',
      stopButton: 'Stop Analysis',
      clearButton: 'Clear',
      characterCount: 'characters',
      maxCharacters: 'Maximum 20,000 characters',
      note: 'The analysis focuses on argumentative quality: thesis strength, evidence connection, and logical structure.',
      emptyState: 'Submit your essay to receive detailed feedback on your argumentation',
      editor: {
        title: 'Your Essay',
        placeholder: 'Write or paste your essay here...',
        characters: 'characters',
      },
      categories: {
        thesis: 'Thesis Cohesion',
        thesisDesc: 'How well your main argument holds together',
        evidence: 'Evidence-to-Claim Linkage',
        evidenceDesc: 'Connection between your evidence and claims',
        flow: 'Logical Flow',
        flowDesc: 'Coherence and progression of ideas',
        counter: 'Counterargument Engagement',
        counterDesc: 'How you address opposing views',
      },
      feedback: {
        title: 'Feedback',
        complete: 'Analysis complete!',
        found: 'Found',
        area: 'area',
        areas: 'areas',
        review: 'Review the feedback below.',
        highlightedText: 'Highlighted text',
      },
      nextSteps: {
        title: 'Next Steps',
        step1: 'Review each feedback point carefully',
        step2: 'Revise your essay based on suggestions',
        step3: 'Re-analyze to track improvements',
      },
      results: {
        title: 'Feedback',
        noAnnotations: 'No annotations found',
        categories: {
          'Thesis Cohesion': 'Thesis Cohesion',
          'Evidence-to-Claim Linkage': 'Evidence-to-Claim Linkage',
          'Logical Flow': 'Logical Flow',
          'Counterargument Engagement': 'Counterargument Engagement',
          'General': 'General',
        },
      },
      errors: {
        emptyText: 'Please enter your essay text',
        emptyEssay: 'Please enter your essay text',
        tooLong: 'Essay is too long. Please limit to 20,000 characters.',
        noApiKey: 'Please configure your API key in Settings first',
        analysisFailed: 'Analysis failed. Please try again.',
        cancelled: 'Analysis was cancelled',
        analysisCancelled: 'Analysis was cancelled',
      },
    },

    // Extension Page
    extension: {
      title: 'LogiCheck Lens',
      subtitle: 'Browser Extension',
      description: 'Analyze content directly on any webpage',
      comingSoon: 'Coming Soon to Chrome Web Store & Edge Add-ons',
      download: {
        title: 'Download Extension',
        description: 'Get the LogiCheck browser extension to analyze text on any webpage',
        button: 'Download Extension',
      },
      install: 'Install',
      browsers: {
        chrome: 'Google Chrome',
        edge: 'Microsoft Edge',
        firefox: 'Mozilla Firefox',
        safari: 'Apple Safari',
      },
      instructions: {
        chrome: {
          step1: 'Download the extension file and extract the ZIP',
          step2: 'Open Chrome and type in the address bar:',
          step3: 'Enable Developer mode in the top right corner',
          step4: 'Click Load unpacked and select the extracted extension folder',
          step5: 'LogiCheck Extension is ready to use! 🎉',
        },
        edge: {
          step1: 'Download the extension file and extract the ZIP',
          step2: 'Open Edge and type in the address bar:',
          step3: 'Enable Developer mode in the left sidebar',
          step4: 'Click Load unpacked and select the extracted extension folder',
          step5: 'LogiCheck Extension is ready to use! 🎉',
        },
        firefox: {
          step1: 'Download the extension file and extract the ZIP',
          step2: 'Open Firefox and type in the address bar:',
          step3: 'Click Install Add-on From File and select the extracted extension folder',
          step4: 'LogiCheck Extension is ready to use! 🎉',
        },
        safari: {
          step1: 'Download the extension file and extract the ZIP',
          step2: 'Open Safari and go to Preferences > Extensions',
          step3: 'Click Install and select the extracted extension folder',
          step4: 'LogiCheck Extension is ready to use! 🎉',
        },
      },
      usageTips: {
        title: 'Usage Tips',
        tip1: 'After installation, click the LogiCheck icon in your browser toolbar',
        tip2: 'Enter the Gemini API key in the extension settings',
        tip3: 'Select the text you want to analyze, then right-click and choose "Analyze with LogiCheck"',
        tip4: 'The extension will automatically sync with the website for a seamless experience',
      },
      faq: {
        title: 'FAQ',
        q1: {
          question: 'Why install manually?',
          answer: 'LogiCheck Extension is currently under review for publication on Chrome Web Store and Edge Add-ons. While waiting for approval, you can install it manually.',
        },
        q2: {
          question: 'Is it safe to install manually?',
          answer: 'Yes, it is completely safe. This extension is open source, and you can inspect its source code. Manual installation only requires Developer mode temporarily.',
        },
        q3: {
          question: 'How to update the extension?',
          answer: 'For now, update manually by downloading the latest version. Once available on the Web Store, updates will be automatic like other extensions.',
        },
      },
      features: {
        title: 'Features',
        contextMenu: 'Right-click context menu analysis',
        keyboard: 'Keyboard shortcut (Ctrl+Shift+L)',
        sidebar: 'Elegant sidebar display',
        realtime: 'Real-time analysis',
      },
    },

    // Settings Page
    settings: {
      title: 'Settings',
      subtitle: 'Configure your LogiCheck experience',
      apiKey: {
        title: 'API Key',
        subtitle: 'Your Gemini API Key',
        label: 'Gemini API Key',
        placeholder: 'PASTE_YOUR_GEMINI_KEY_HERE',
        save: 'Save API Key',
        saving: 'Saving...',
        test: 'Test API Key',
        testing: 'Testing...',
        clear: 'Clear API Key',
        status: {
          valid: '✅ API Key is valid and working!',
          invalid: '❌ Invalid API Key',
          saved: 'API Key saved successfully',
          cleared: 'API Key cleared',
          testing: 'Testing API key...',
          failed: 'Key failed validation',
        },
        info: {
          title: 'About API Keys',
          description: 'LogiCheck uses Google Gemini AI for analysis. You can use the shared API key (limited) or your own API key for optimal performance.',
          local: 'Your API key is stored locally and never uploaded to our servers.',
          performance: 'Using your own API key provides faster and more reliable performance.',
        },
        instructions: {
          title: 'How to Get Your API Key',
          step1: 'Visit Google AI Studio',
          step2: 'Sign in with your Google account',
          step3: 'Click "Get API Key"',
          step4: 'Copy the key and paste it here',
          link: 'Get API Key',
        },
      },
      theme: {
        title: 'Theme',
        label: 'Appearance',
        light: 'Light',
        dark: 'Dark',
        auto: 'Auto',
      },
      language: {
        title: 'Language',
        label: 'Interface Language',
        description: 'Choose your preferred language for the interface and AI analysis results.',
        english: 'English',
        indonesian: 'Indonesian (Bahasa Indonesia)',
        note: 'Changing the language will update all text, AI responses, and game content.',
      },
      feedback: {
        title: 'Share Your Feedback',
        description: 'Help us improve LogiCheck! Share your testimonials, suggestions, or report any issues you encounter.',
        button: 'Give Feedback',
      },
    },

    // API Key Warning Component
    apiKeyWarning: {
      title: 'API Key Required',
      description: 'You need to configure your Gemini API key before using this feature. Your API key is stored locally in your browser and never uploaded to our servers.',
      goToSettings: 'Go to Settings',
      getApiKey: 'Get API Key',
      learnMore: 'Learn More',
    },

    // Loading Spinner
    loading: {
      analyzing: 'Analyzing your text...',
      loading: 'Loading...',
      processing: 'Processing...',
      thinking: 'Thinking...',
    },

    // Alert Messages
    alert: {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Information',
    },
  },

  id: {
    // Elemen UI Umum
    common: {
      language: 'Bahasa',
      english: 'Inggris',
      indonesian: 'Indonesia',
      settings: 'Pengaturan',
      analyze: 'Analisis',
      analyzing: 'Menganalisis',
      cancel: 'Batal',
      close: 'Tutup',
      save: 'Simpan',
      saving: 'Menyimpan',
      delete: 'Hapus',
      edit: 'Edit',
      back: 'Kembali',
      next: 'Selanjutnya',
      previous: 'Sebelumnya',
      loading: 'Memuat',
      error: 'Kesalahan',
      success: 'Berhasil',
      warning: 'Peringatan',
      info: 'Informasi',
      note: 'Catatan',
      yes: 'Ya',
      no: 'Tidak',
      ok: 'OK',
      test: 'Uji',
      testing: 'Menguji',
      clear: 'Bersihkan',
      copy: 'Salin',
      copied: 'Tersalin',
      reset: 'Reset',
      start: 'Mulai',
      stop: 'Berhenti',
      pause: 'Jeda',
      resume: 'Lanjutkan',
      retry: 'Coba Lagi',
      submit: 'Kirim',
      continue: 'Lanjutkan',
      finish: 'Selesai',
    },

    // Navigation
    nav: {
      clear: 'Bersihkan',
      copy: 'Salin',
      copied: 'Tersalin',
      reset: 'Reset',
      start: 'Mulai',
      stop: 'Berhenti',
      pause: 'Jeda',
      resume: 'Lanjutkan',
      retry: 'Coba Lagi',
      submit: 'Kirim',
      continue: 'Lanjutkan',
      finish: 'Selesai',
    },

    // Navigasi
    nav: {
      home: 'Beranda',
      analyzer: 'Analisis',
      dojo: 'Dojo',
      essayClinic: 'Klinik Esai',
      extension: 'Ekstensi',
      settings: 'Pengaturan',
    },

    // Halaman Beranda
    home: {
      title: 'Selamat Datang di LogiCheck',
      subtitle: 'Pelatih AI Percakapan untuk Mengasah Penalaran Logis dalam Era Informasi Massal',
      description: 'Kuasai seni berpikir kritis dengan analisis bertenaga AI, latihan gamifikasi, dan umpan balik personal.',
      getStarted: 'Mulai Menganalisis',
      learnMore: 'Pelajari Lebih Lanjut',
      downloadExtension: 'Unduh Ekstensi Kami',
      exploreFeature: 'Jelajahi',
      featured: 'Unggulan',
      whyLogiCheck: 'Mengapa LogiCheck?',
      readyToStart: 'Siap Memperkuat Penalaran Anda?',
      joinThousands: 'Bergabunglah dengan ribuan siswa dan akademisi yang menggunakan LogiCheck untuk meningkatkan keterampilan berpikir kritis mereka.',
      tryAnalyzer: 'Coba Analyzer',
      practiceInDojo: 'Latihan di Dojo',
      features: {
        title: 'Fitur',
        analyzer: {
          title: 'Analisis Inti',
          description: 'Tempel teks apa pun dan dapatkan analisis instan tentang kesalahan logika, asumsi tersembunyi, dan struktur argumen. Libatkan diri dalam dialog Sokratik untuk memperdalam pemahaman Anda.',
        },
        dojo: {
          title: 'Dojo',
          description: 'Asah keterampilan Anda melalui latihan gamifikasi. Identifikasi kesalahan logika dalam skenario dunia nyata dan tantang titik buta bias Anda.',
        },
        clinic: {
          title: 'Klinik Esai',
          description: 'Tingkatkan tulisan argumentatif Anda. Dapatkan umpan balik bertenaga AI tentang kohesi tesis, keterkaitan bukti, dan alur logis.',
        },
        extension: {
          title: 'Ekstensi Browser',
          description: 'Analisis konten langsung di halaman web mana pun dengan LogiCheck Lens.',
        },
      },
      benefits: {
        precision: {
          title: 'Analisis Presisi',
          description: 'Ditenagai oleh AI canggih untuk mendeteksi kelemahan logis dan bias halus dalam argumen.',
        },
        socratic: {
          title: 'Metode Sokratik',
          description: 'Libatkan diri dalam dialog yang mendorong pemikiran kritis dan refleksi diri.',
        },
        educational: {
          title: 'Fokus Pendidikan',
          description: 'Dirancang khusus untuk siswa, akademisi, dan pembelajar seumur hidup.',
        },
      },
    },

    // Halaman Analisis
    analyzer: {
      title: 'Analisis Inti',
      subtitle: 'Analisis teks untuk kesalahan logika dan penalaran',
      inputPlaceholder: 'Tempel atau ketik teks yang ingin Anda analisis di sini...',
      analyzeButton: 'Analisis Teks',
      analyzingButton: 'Menganalisis...',
      stopButton: 'Hentikan Analisis',
      clearButton: 'Bersihkan',
      characterCount: 'karakter',
      maxCharacters: 'Maksimal 10.000 karakter',
      results: {
        title: 'Hasil Analisis',
        mainClaim: 'Klaim Utama',
        assumptions: 'Asumsi Tersembunyi',
        fallacies: 'Kesalahan Logika',
        noFallacies: 'Tidak ada kesalahan logika terdeteksi',
        socraticQuestion: 'Pertanyaan Sokratik',
        socraticPrompt: 'Renungkan pertanyaan ini untuk memperdalam pemahaman Anda:',
      },
      errors: {
        emptyText: 'Silakan masukkan teks untuk dianalisis',
        tooLong: 'Teks terlalu panjang. Harap batasi hingga 10.000 karakter.',
        noApiKey: 'Silakan konfigurasi API key Anda di Pengaturan terlebih dahulu',
        analysisFailed: 'Analisis gagal. Silakan coba lagi.',
        cancelled: 'Analisis dibatalkan',
      },
    },

    // Halaman Dojo
    dojo: {
      title: 'Dojo',
      subtitle: 'Asah kemampuan penalaran logis Anda melalui praktik gamifikasi',
      stats: {
        progress: 'Kemajuan Anda',
        correct: 'Benar',
        mastery: 'Tingkat Penguasaan',
        novice: 'Pemula',
        apprentice: 'Pelajar',
        expert: 'Ahli',
      },
      modes: {
        sparring: 'Latihan Kesalahan Logika',
        bias: 'Titik Buta Bias',
      },
      sparring: {
        title: 'Latihan Kesalahan Logika',
        description: 'Identifikasi kesalahan dalam skenario',
        newChallenge: 'Tantangan Baru',
        loadingChallenge: 'Memuat tantangan...',
        scenario: 'Skenario',
        question: 'Kesalahan logika apa yang ada dalam skenario ini?',
        submit: 'Kirim Jawaban',
        checking: 'Memeriksa...',
        correct: 'Benar!',
        incorrect: 'Belum tepat',
        correctAnswer: 'Jawaban Benar',
        explanation: 'Penjelasan',
        nextChallenge: 'Tantangan Berikutnya',
        score: 'Skor',
        streak: 'Beruntun',
      },
      bias: {
        title: 'Titik Buta Bias',
        description: 'Identifikasi bahasa yang bias',
        challengeTitle: 'Tantangan Titik Buta Bias',
        newTopic: 'Topik Baru',
        loadingChallenge: 'Memuat tantangan...',
        translating: 'Menerjemahkan artikel ke bahasa Anda...',
        topic: 'Topik',
        categories: 'Kategori Bias',
        loadedLanguage: 'Bahasa Bermuatan',
        loadedLanguageDesc: 'Kata-kata dengan konotasi kuat',
        emotionalAppeals: 'Ajakan Emosional',
        emotionalAppealsDesc: 'Ajakan ke emosi daripada logika',
        biasedFraming: 'Pembingkaian Bias',
        biasedFramingDesc: 'Presentasi selektif',
        getFeedback: 'Dapatkan Umpan Balik Analisis Saya',
        errorNoHighlights: 'Silakan sorot beberapa teks di kedua artikel sebelum mengirim.',
        reflectionTitle: 'Pertanyaan Refleksi',
        reflectionQ1: 'Pola bias apa yang Anda perhatikan di setiap artikel?',
        reflectionQ2: 'Bagaimana setiap sumber membingkai masalah dengan cara berbeda?',
        reflectionQ3: 'Kata atau frasa spesifik mana yang mengungkap perspektif penulis?',
        reflectionQ4: 'Bagaimana presentasi netral dari topik ini berbeda dari kedua artikel?',
      },
      fallacies: {
        'Ad Hominem': 'Ad Hominem',
        'Straw Man': 'Straw Man',
        'Hasty Generalization': 'Generalisasi Tergesa-gesa',
        'Appeal to Authority': 'Menyerukan Otoritas',
        'False Dilemma': 'Dilema Palsu',
        'Slippery Slope': 'Lereng Licin',
        'Circular Reasoning': 'Penalaran Melingkar',
        'Red Herring': 'Red Herring',
        'Appeal to Emotion': 'Menyerukan Emosi',
        'Bandwagon': 'Ikut-ikutan',
      },
    },

    // Halaman Klinik Esai
    clinic: {
      title: 'Klinik Esai',
      subtitle: 'Tingkatkan tulisan argumentatif Anda',
      inputPlaceholder: 'Tulis atau tempel esai Anda di sini...',
      analyzeButton: 'Analisis Esai',
      analyzingButton: 'Menganalisis...',
      analyzing: 'Menganalisis',
      analyzingText: 'Menganalisis esai Anda...',
      stopButton: 'Hentikan Analisis',
      clearButton: 'Bersihkan',
      characterCount: 'karakter',
      maxCharacters: 'Maksimal 20.000 karakter',
      note: 'Analisis berfokus pada kualitas argumentatif: kekuatan tesis, koneksi bukti, dan struktur logis.',
      emptyState: 'Kirimkan esai Anda untuk menerima umpan balik terperinci tentang argumentasi Anda',
      editor: {
        title: 'Esai Anda',
        placeholder: 'Tulis atau tempel esai Anda di sini...',
        characters: 'karakter',
      },
      categories: {
        thesis: 'Kohesi Tesis',
        thesisDesc: 'Seberapa baik argumen utama Anda menyatu',
        evidence: 'Keterkaitan Bukti-ke-Klaim',
        evidenceDesc: 'Koneksi antara bukti dan klaim Anda',
        flow: 'Alur Logis',
        flowDesc: 'Koherensi dan perkembangan ide',
        counter: 'Keterlibatan Argumen Tandingan',
        counterDesc: 'Bagaimana Anda menangani pandangan yang berlawanan',
      },
      feedback: {
        title: 'Umpan Balik',
        complete: 'Analisis selesai!',
        found: 'Ditemukan',
        area: 'area',
        areas: 'area',
        review: 'Tinjau umpan balik di bawah ini.',
        highlightedText: 'Teks yang disorot',
      },
      nextSteps: {
        title: 'Langkah Selanjutnya',
        step1: 'Tinjau setiap poin umpan balik dengan seksama',
        step2: 'Revisi esai Anda berdasarkan saran',
        step3: 'Analisis ulang untuk melacak perbaikan',
      },
      results: {
        title: 'Umpan Balik',
        noAnnotations: 'Tidak ada anotasi ditemukan',
        categories: {
          'Thesis Cohesion': 'Kohesi Tesis',
          'Evidence-to-Claim Linkage': 'Keterkaitan Bukti-ke-Klaim',
          'Logical Flow': 'Alur Logis',
          'Counterargument Engagement': 'Keterlibatan Argumen Tandingan',
          'General': 'Umum',
        },
      },
      errors: {
        emptyText: 'Silakan masukkan teks esai Anda',
        emptyEssay: 'Silakan masukkan teks esai Anda',
        tooLong: 'Esai terlalu panjang. Harap batasi hingga 20.000 karakter.',
        noApiKey: 'Silakan konfigurasi API key Anda di Pengaturan terlebih dahulu',
        analysisFailed: 'Analisis gagal. Silakan coba lagi.',
        cancelled: 'Analisis dibatalkan',
        analysisCancelled: 'Analisis dibatalkan',
      },
    },

    // Halaman Ekstensi
    extension: {
      title: 'LogiCheck Lens',
      subtitle: 'Ekstensi Browser',
      description: 'Analisis konten langsung di halaman web mana pun',
      comingSoon: 'Segera Hadir di Chrome Web Store & Edge Add-ons',
      download: {
        title: 'Unduh Ekstensi',
        description: 'Dapatkan ekstensi browser LogiCheck untuk menganalisis teks di halaman web mana pun',
        button: 'Unduh Ekstensi',
      },
      install: 'Pasang',
      browsers: {
        chrome: 'Google Chrome',
        edge: 'Microsoft Edge',
        firefox: 'Mozilla Firefox',
        safari: 'Apple Safari',
      },
      instructions: {
        chrome: {
          step1: 'Unduh file ekstensi dan ekstrak ZIP',
          step2: 'Buka Chrome dan ketik di bilah alamat:',
          step3: 'Aktifkan Developer mode di pojok kanan atas',
          step4: 'Klik Load unpacked dan pilih folder ekstensi yang sudah diekstrak',
          step5: 'Ekstensi LogiCheck siap digunakan! 🎉',
        },
        edge: {
          step1: 'Unduh file ekstensi dan ekstrak ZIP',
          step2: 'Buka Edge dan ketik di bilah alamat:',
          step3: 'Aktifkan Developer mode di sidebar kiri',
          step4: 'Klik Load unpacked dan pilih folder ekstensi yang sudah diekstrak',
          step5: 'Ekstensi LogiCheck siap digunakan! 🎉',
        },
        firefox: {
          step1: 'Unduh file ekstensi dan ekstrak ZIP',
          step2: 'Buka Firefox dan ketik di bilah alamat:',
          step3: 'Klik Install Add-on From File dan pilih folder ekstensi yang sudah diekstrak',
          step4: 'Ekstensi LogiCheck siap digunakan! 🎉',
        },
        safari: {
          step1: 'Unduh file ekstensi dan ekstrak ZIP',
          step2: 'Buka Safari dan masuk ke Preferences > Extensions',
          step3: 'Klik Install dan pilih folder ekstensi yang sudah diekstrak',
          step4: 'Ekstensi LogiCheck siap digunakan! 🎉',
        },
      },
      usageTips: {
        title: 'Tips Penggunaan',
        tip1: 'Setelah instalasi, klik ikon LogiCheck di toolbar browser Anda',
        tip2: 'Masukkan Gemini API key di pengaturan ekstensi',
        tip3: 'Pilih teks yang ingin Anda analisis, lalu klik kanan dan pilih "Analyze with LogiCheck"',
        tip4: 'Ekstensi akan otomatis sinkron dengan website untuk pengalaman yang mulus',
      },
      faq: {
        title: 'FAQ',
        q1: {
          question: 'Mengapa harus install manual?',
          answer: 'Ekstensi LogiCheck saat ini sedang dalam proses review untuk publikasi di Chrome Web Store dan Edge Add-ons. Sambil menunggu persetujuan, Anda bisa menginstalnya secara manual.',
        },
        q2: {
          question: 'Apakah aman untuk install manual?',
          answer: 'Ya, sepenuhnya aman. Ekstensi ini open source, dan Anda bisa memeriksa kode sumbernya. Instalasi manual hanya memerlukan Developer mode sementara.',
        },
        q3: {
          question: 'Bagaimana cara update ekstensi?',
          answer: 'Untuk saat ini, update secara manual dengan mengunduh versi terbaru. Setelah tersedia di Web Store, update akan otomatis seperti ekstensi lainnya.',
        },
      },
      features: {
        title: 'Fitur',
        contextMenu: 'Analisis menu konteks klik kanan',
        keyboard: 'Pintasan keyboard (Ctrl+Shift+L)',
        sidebar: 'Tampilan sidebar elegan',
        realtime: 'Analisis waktu nyata',
      },
    },

    // Halaman Pengaturan
    settings: {
      title: 'Pengaturan',
      subtitle: 'Konfigurasikan pengalaman LogiCheck Anda',
      apiKey: {
        title: 'API Key',
        subtitle: 'Gemini API Key Anda',
        label: 'Gemini API Key',
        placeholder: 'TEMPEL_GEMINI_KEY_ANDA_DI_SINI',
        save: 'Simpan API Key',
        saving: 'Menyimpan...',
        test: 'Uji API Key',
        testing: 'Menguji...',
        clear: 'Hapus API Key',
        status: {
          valid: '✅ API Key valid dan berfungsi!',
          invalid: '❌ API Key tidak valid',
          saved: 'API Key berhasil disimpan',
          cleared: 'API Key dihapus',
          testing: 'Menguji API key...',
          failed: 'Key gagal validasi',
        },
        info: {
          title: 'Tentang API Key',
          description: 'LogiCheck menggunakan Google Gemini AI untuk analisis. Anda dapat menggunakan API key bersama (terbatas) atau API key Anda sendiri untuk performa optimal.',
          local: 'API key Anda disimpan secara lokal dan tidak pernah diunggah ke server kami.',
          performance: 'Menggunakan API key Anda sendiri memberikan performa lebih cepat dan lebih andal.',
        },
        instructions: {
          title: 'Cara Mendapatkan API Key Anda',
          step1: 'Kunjungi Google AI Studio',
          step2: 'Masuk dengan akun Google Anda',
          step3: 'Klik "Get API Key"',
          step4: 'Salin key dan tempel di sini',
          link: 'Dapatkan API Key',
        },
      },
      theme: {
        title: 'Tema',
        label: 'Tampilan',
        light: 'Terang',
        dark: 'Gelap',
        auto: 'Otomatis',
      },
      language: {
        title: 'Bahasa',
        label: 'Bahasa Antarmuka',
        description: 'Pilih bahasa yang Anda inginkan untuk antarmuka dan hasil analisis AI.',
        english: 'Inggris (English)',
        indonesian: 'Indonesia (Bahasa Indonesia)',
        note: 'Mengubah bahasa akan memperbarui semua teks, respons AI, dan konten game.',
      },
      feedback: {
        title: 'Bagikan Testimoni & Kritik Anda',
        description: 'Bantu kami meningkatkan LogiCheck! Bagikan testimoni, saran, atau laporkan masalah yang Anda temui.',
        button: 'Berikan Masukan',
      },
    },

    // Komponen Peringatan API Key
    apiKeyWarning: {
      title: 'API Key Diperlukan',
      description: 'Anda perlu mengkonfigurasi API key Gemini sebelum menggunakan fitur ini. API key Anda disimpan secara lokal di browser dan tidak pernah diunggah ke server kami.',
      goToSettings: 'Ke Pengaturan',
      getApiKey: 'Dapatkan API Key',
      learnMore: 'Pelajari Lebih Lanjut',
    },

    // Loading Spinner
    loading: {
      analyzing: 'Menganalisis teks Anda...',
      loading: 'Memuat...',
      processing: 'Memproses...',
      thinking: 'Berpikir...',
    },

    // Pesan Alert
    alert: {
      success: 'Berhasil',
      error: 'Kesalahan',
      warning: 'Peringatan',
      info: 'Informasi',
    },
  },
};

/**
 * Get translation for a specific key
 * @param {string} language - 'en' or 'id'
 * @param {string} key - Dot-notation path (e.g., 'common.analyze')
 * @returns {string} Translated text
 */
export const t = (language, key) => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return value || key;
};

export default translations;
