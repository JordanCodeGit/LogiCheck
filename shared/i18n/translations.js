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
      title: 'LogiCheck',
      subtitle: 'Your Conversational AI Coach for Sharpening Logical Reasoning',
      description: 'Master the art of critical thinking with AI-powered analysis, gamified practice, and personalized feedback.',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      features: {
        title: 'Features',
        analyzer: {
          title: 'Core Analyzer',
          description: 'Identify logical fallacies, hidden assumptions, and argument structure in any text.',
        },
        dojo: {
          title: 'The Dojo',
          description: 'Practice your skills with gamified challenges and interactive exercises.',
        },
        clinic: {
          title: 'Essay Clinic',
          description: 'Get AI-powered feedback on your writing to improve argumentation quality.',
        },
        extension: {
          title: 'Browser Extension',
          description: 'Analyze content directly on any webpage with LogiCheck Lens.',
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
      subtitle: 'Practice and sharpen your logical reasoning skills',
      modes: {
        sparring: 'Fallacy Sparring',
        bias: 'Bias Blindspot',
      },
      sparring: {
        title: 'Fallacy Sparring',
        description: 'Identify logical fallacies in real-world scenarios',
        newChallenge: 'New Challenge',
        loading: 'Loading challenge...',
        scenario: 'Scenario',
        question: 'Which fallacy is present in this scenario?',
        submit: 'Submit Answer',
        checking: 'Checking...',
        correct: 'Correct!',
        incorrect: 'Incorrect',
        explanation: 'Explanation',
        nextChallenge: 'Next Challenge',
        score: 'Score',
        streak: 'Streak',
      },
      bias: {
        title: 'Bias Blindspot',
        description: 'Identify bias in paired articles',
        instructions: 'Read both articles and highlight biased language or reasoning',
        articleA: 'Article A',
        articleB: 'Article B',
        highlightPrompt: 'Select text to highlight biased content',
        analyzeButton: 'Analyze My Highlights',
        analyzing: 'Analyzing...',
        feedback: 'Feedback',
        newChallenge: 'New Challenge',
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
      stopButton: 'Stop Analysis',
      clearButton: 'Clear',
      characterCount: 'characters',
      maxCharacters: 'Maximum 20,000 characters',
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
        tooLong: 'Essay is too long. Please limit to 20,000 characters.',
        noApiKey: 'Please configure your API key in Settings first',
        analysisFailed: 'Analysis failed. Please try again.',
        cancelled: 'Analysis was cancelled',
      },
    },

    // Extension Page
    extension: {
      title: 'LogiCheck Lens',
      subtitle: 'Browser Extension',
      description: 'Analyze content directly on any webpage',
      download: 'Download Extension',
      install: 'Install',
      features: {
        title: 'Features',
        contextMenu: 'Right-click context menu analysis',
        keyboard: 'Keyboard shortcut (Ctrl+Shift+L)',
        sidebar: 'Elegant sidebar display',
        realtime: 'Real-time analysis',
      },
      instructions: {
        title: 'How to Install',
        step1: 'Download the extension file',
        step2: 'Open your browser\'s extension settings',
        step3: 'Enable Developer Mode',
        step4: 'Load the unpacked extension',
      },
      browsers: {
        chrome: 'Chrome',
        firefox: 'Firefox',
        edge: 'Edge',
        safari: 'Safari',
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
    },

    // API Key Warning Component
    apiKeyWarning: {
      title: 'API Key Required',
      description: 'You need to configure your Gemini API key before using this feature. Your API key is stored locally in your browser and never uploaded to our servers.',
      goToSettings: 'Go to Settings',
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

    // Extension-specific
    extensionUI: {
      popup: {
        title: 'LogiCheck Lens',
        subtitle: 'Analyze content on any webpage',
        instructions: 'Select text on any webpage, then:',
        method1: 'Right-click → "Analyze with LogiCheck"',
        method2: 'Press Ctrl+Shift+L',
        openWebApp: 'Open Web App',
        settings: 'Settings',
        apiKeyStatus: {
          configured: 'API Key: Configured ✓',
          notConfigured: 'API Key: Not Configured',
          configure: 'Configure API Key',
        },
      },
      sidebar: {
        title: 'LogiCheck Analysis',
        analyzing: 'Analyzing selected text...',
        mainClaim: 'Main Claim',
        assumptions: 'Assumptions',
        fallacies: 'Fallacies',
        noFallacies: 'No fallacies detected',
        close: 'Close',
        error: 'Analysis failed',
        selectText: 'Select text to analyze',
      },
      contextMenu: {
        analyze: 'Analyze with LogiCheck',
      },
    },

    // Gemini AI Prompts (for server)
    prompts: {
      analyze: {
        persona: 'You are LogiCheck, a conversational AI coach. Your purpose is to help users sharpen their logical reasoning. You are analytical, neutral, and encouraging. You do not give opinions or declare information \'true\' or \'false.\' Your entire focus is on the structure and quality of the argument.',
        instruction: 'Analyze the following text. Your output must be a JSON object with these exact keys: \'mainClaim\' (a one-sentence summary of the author\'s central argument), \'assumptions\' (a list of key unstated assumptions), \'fallacies\' (a list of objects, where each object has \'fallacyName\', \'quote\', and \'explanation\'). If a key has no findings, return an empty list. Based on your analysis, generate one Socratic question that encourages the user to evaluate the argument\'s weakest point. The question should not contain the answer. Frame it to foster curiosity and further reflection. Include this as \'socraticQuestion\' in your JSON response.',
        footer: 'Respond ONLY with valid JSON. No additional text before or after the JSON object.',
      },
      essay: {
        instruction: 'Analyze the following essay focusing EXCLUSIVELY on argumentation, not grammar or style. Your output must be a JSON object with the key \'annotations\', which is a list of objects. Each object must have: \'targetText\' (the specific excerpt from the essay), \'feedbackCategory\' (one of: "Thesis Cohesion", "Evidence-to-Claim Linkage", "Logical Flow", "Counterargument Engagement"), \'comment\' (constructive, formative advice). Focus on these areas: 1. Thesis Cohesion: Does the essay consistently support the main thesis? 2. Evidence-to-Claim Linkage: Is the evidence sufficient and directly relevant? 3. Logical Flow: Are there logical gaps or contradictions? 4. Counterargument Engagement: Does the essay acknowledge and refute counterarguments?',
      },
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
      title: 'LogiCheck',
      subtitle: 'Pelatih AI Percakapan untuk Mengasah Penalaran Logis',
      description: 'Kuasai seni berpikir kritis dengan analisis bertenaga AI, latihan gamifikasi, dan umpan balik personal.',
      getStarted: 'Mulai',
      learnMore: 'Pelajari Lebih Lanjut',
      features: {
        title: 'Fitur',
        analyzer: {
          title: 'Analisis Inti',
          description: 'Identifikasi kesalahan logika, asumsi tersembunyi, dan struktur argumen dalam teks apa pun.',
        },
        dojo: {
          title: 'Dojo',
          description: 'Latih kemampuan Anda dengan tantangan gamifikasi dan latihan interaktif.',
        },
        clinic: {
          title: 'Klinik Esai',
          description: 'Dapatkan umpan balik bertenaga AI untuk meningkatkan kualitas argumentasi tulisan Anda.',
        },
        extension: {
          title: 'Ekstensi Browser',
          description: 'Analisis konten langsung di halaman web mana pun dengan LogiCheck Lens.',
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
      subtitle: 'Latih dan asah kemampuan penalaran logis Anda',
      modes: {
        sparring: 'Latihan Kesalahan Logika',
        bias: 'Titik Buta Bias',
      },
      sparring: {
        title: 'Latihan Kesalahan Logika',
        description: 'Identifikasi kesalahan logika dalam skenario dunia nyata',
        newChallenge: 'Tantangan Baru',
        loading: 'Memuat tantangan...',
        scenario: 'Skenario',
        question: 'Kesalahan logika apa yang ada dalam skenario ini?',
        submit: 'Kirim Jawaban',
        checking: 'Memeriksa...',
        correct: 'Benar!',
        incorrect: 'Salah',
        explanation: 'Penjelasan',
        nextChallenge: 'Tantangan Berikutnya',
        score: 'Skor',
        streak: 'Beruntun',
      },
      bias: {
        title: 'Titik Buta Bias',
        description: 'Identifikasi bias dalam artikel berpasangan',
        instructions: 'Baca kedua artikel dan sorot bahasa atau penalaran yang bias',
        articleA: 'Artikel A',
        articleB: 'Artikel B',
        highlightPrompt: 'Pilih teks untuk menyorot konten yang bias',
        analyzeButton: 'Analisis Sorotan Saya',
        analyzing: 'Menganalisis...',
        feedback: 'Umpan Balik',
        newChallenge: 'Tantangan Baru',
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
      stopButton: 'Hentikan Analisis',
      clearButton: 'Bersihkan',
      characterCount: 'karakter',
      maxCharacters: 'Maksimal 20.000 karakter',
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
        tooLong: 'Esai terlalu panjang. Harap batasi hingga 20.000 karakter.',
        noApiKey: 'Silakan konfigurasi API key Anda di Pengaturan terlebih dahulu',
        analysisFailed: 'Analisis gagal. Silakan coba lagi.',
        cancelled: 'Analisis dibatalkan',
      },
    },

    // Halaman Ekstensi
    extension: {
      title: 'LogiCheck Lens',
      subtitle: 'Ekstensi Browser',
      description: 'Analisis konten langsung di halaman web mana pun',
      download: 'Unduh Ekstensi',
      install: 'Pasang',
      features: {
        title: 'Fitur',
        contextMenu: 'Analisis menu konteks klik kanan',
        keyboard: 'Pintasan keyboard (Ctrl+Shift+L)',
        sidebar: 'Tampilan sidebar elegan',
        realtime: 'Analisis waktu nyata',
      },
      instructions: {
        title: 'Cara Memasang',
        step1: 'Unduh file ekstensi',
        step2: 'Buka pengaturan ekstensi browser Anda',
        step3: 'Aktifkan Mode Pengembang',
        step4: 'Muat ekstensi yang tidak dikemas',
      },
      browsers: {
        chrome: 'Chrome',
        firefox: 'Firefox',
        edge: 'Edge',
        safari: 'Safari',
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
    },

    // Komponen Peringatan API Key
    apiKeyWarning: {
      title: 'API Key Diperlukan',
      description: 'Anda perlu mengkonfigurasi API key Gemini sebelum menggunakan fitur ini. API key Anda disimpan secara lokal di browser dan tidak pernah diunggah ke server kami.',
      goToSettings: 'Ke Pengaturan',
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

    // Khusus Ekstensi
    extensionUI: {
      popup: {
        title: 'LogiCheck Lens',
        subtitle: 'Analisis konten di halaman web mana pun',
        instructions: 'Pilih teks di halaman web mana pun, lalu:',
        method1: 'Klik kanan → "Analisis dengan LogiCheck"',
        method2: 'Tekan Ctrl+Shift+L',
        openWebApp: 'Buka Aplikasi Web',
        settings: 'Pengaturan',
        apiKeyStatus: {
          configured: 'API Key: Terkonfigurasi ✓',
          notConfigured: 'API Key: Belum Terkonfigurasi',
          configure: 'Konfigurasi API Key',
        },
      },
      sidebar: {
        title: 'Analisis LogiCheck',
        analyzing: 'Menganalisis teks yang dipilih...',
        mainClaim: 'Klaim Utama',
        assumptions: 'Asumsi',
        fallacies: 'Kesalahan Logika',
        noFallacies: 'Tidak ada kesalahan logika terdeteksi',
        close: 'Tutup',
        error: 'Analisis gagal',
        selectText: 'Pilih teks untuk dianalisis',
      },
      contextMenu: {
        analyze: 'Analisis dengan LogiCheck',
      },
    },

    // Prompt Gemini AI (untuk server)
    prompts: {
      analyze: {
        persona: 'Anda adalah LogiCheck, pelatih AI percakapan. Tujuan Anda adalah membantu pengguna mengasah penalaran logis mereka. Anda analitis, netral, dan mendorong. Anda tidak memberikan opini atau menyatakan informasi \'benar\' atau \'salah.\' Fokus utama Anda adalah pada struktur dan kualitas argumen.',
        instruction: 'Analisis teks berikut. Output Anda harus berupa objek JSON dengan key yang tepat ini: \'mainClaim\' (ringkasan satu kalimat dari argumen utama penulis), \'assumptions\' (daftar asumsi yang tidak terucapkan), \'fallacies\' (daftar objek, di mana setiap objek memiliki \'fallacyName\', \'quote\', dan \'explanation\'). Jika suatu key tidak memiliki temuan, kembalikan daftar kosong. Berdasarkan analisis Anda, hasilkan satu pertanyaan Sokratik yang mendorong pengguna untuk mengevaluasi titik terlemah argumen. Pertanyaan tidak boleh mengandung jawaban. Bentuk pertanyaan untuk menumbuhkan rasa ingin tahu dan refleksi lebih lanjut. Sertakan ini sebagai \'socraticQuestion\' dalam respons JSON Anda.',
        footer: 'Respons HANYA dengan JSON yang valid. Tidak ada teks tambahan sebelum atau sesudah objek JSON.',
      },
      essay: {
        instruction: 'Analisis esai berikut dengan fokus EKSKLUSIF pada argumentasi, bukan tata bahasa atau gaya. Output Anda harus berupa objek JSON dengan key \'annotations\', yang merupakan daftar objek. Setiap objek harus memiliki: \'targetText\' (kutipan spesifik dari esai), \'feedbackCategory\' (salah satu dari: "Kohesi Tesis", "Keterkaitan Bukti-ke-Klaim", "Alur Logis", "Keterlibatan Argumen Tandingan"), \'comment\' (saran konstruktif dan formatif). Fokus pada area ini: 1. Kohesi Tesis: Apakah esai secara konsisten mendukung tesis utama? 2. Keterkaitan Bukti-ke-Klaim: Apakah bukti cukup dan langsung relevan? 3. Alur Logis: Apakah ada kesenjangan atau kontradiksi logis? 4. Keterlibatan Argumen Tandingan: Apakah esai mengakui dan membantah argumen tandingan?',
      },
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
