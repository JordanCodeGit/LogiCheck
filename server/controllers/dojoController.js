import { v4 as uuidv4 } from 'uuid';
import { getGeminiModel } from '../config/gemini.js';

/**
 * Fallacy database with scenarios for the Fallacy Sparring game
 * These 10 fallacies are the core set for LogiCheck
 */
const fallacyDatabase = [
  // Ad Hominem
  {
    scenario: {
      en: "A politician argues we shouldn't listen to a climate scientist's research because the scientist was once fined for littering.",
      id: "Seorang politisi berargumen bahwa kita tidak boleh mendengarkan penelitian ilmuwan iklim karena ilmuwan tersebut pernah didenda karena membuang sampah sembarangan."
    },
    options: {
      en: ["Straw Man", "Ad Hominem", "Hasty Generalization", "Red Herring"],
      id: ["Straw Man", "Ad Hominem", "Generalisasi Gegabah", "Red Herring"]
    },
    correctAnswer: {
      en: "Ad Hominem",
      id: "Ad Hominem"
    },
    explanation: {
      en: "This is an Ad Hominem fallacy because it attacks the scientist's character (littering fine) rather than addressing the validity of their climate research.",
      id: "Ini adalah kesalahan Ad Hominem karena menyerang karakter ilmuwan (denda sampah) daripada menangani validitas penelitian iklim mereka."
    }
  },
  {
    scenario: {
      en: "A debate opponent dismisses a doctor's argument about healthcare reform by pointing out the doctor's expensive car, implying they're too wealthy to understand regular people's problems.",
      id: "Lawan debat menolak argumen dokter tentang reformasi kesehatan dengan menunjuk mobil mahal dokter tersebut, menyiratkan bahwa mereka terlalu kaya untuk memahami masalah orang biasa."
    },
    options: {
      en: ["Ad Hominem", "Appeal to Authority", "False Dichotomy", "Bandwagon Appeal"],
      id: ["Ad Hominem", "Appeal to Authority", "Dikotomi Palsu", "Bandwagon Appeal"]
    },
    correctAnswer: {
      en: "Ad Hominem",
      id: "Ad Hominem"
    },
    explanation: {
      en: "This attacks the person's wealth rather than addressing the merits of their healthcare argument.",
      id: "Ini menyerang kekayaan orang tersebut daripada menangani isi argumen kesehatan mereka."
    }
  },
  
  // Straw Man
  {
    scenario: {
      en: "Person A: 'We should have stricter regulations on industrial pollution.' Person B: 'So you want to shut down all factories and destroy the economy?'",
      id: "Orang A: 'Kita harus memiliki regulasi yang lebih ketat terhadap polusi industri.' Orang B: 'Jadi kamu ingin menutup semua pabrik dan menghancurkan ekonomi?'"
    },
    options: {
      en: ["Straw Man", "Slippery Slope", "False Dichotomy", "Red Herring"],
      id: ["Straw Man", "Slippery Slope", "Dikotomi Palsu", "Red Herring"]
    },
    correctAnswer: {
      en: "Straw Man",
      id: "Straw Man"
    },
    explanation: {
      en: "Person B misrepresents Person A's argument about stricter regulations as wanting to shut down all factories, making it easier to attack.",
      id: "Orang B salah merepresentasikan argumen Orang A tentang regulasi yang lebih ketat sebagai keinginan untuk menutup semua pabrik, membuatnya lebih mudah diserang."
    }
  },
  {
    scenario: {
      en: "A student proposes having healthier lunch options at school. The principal responds, 'I'm not going to ban all the food students enjoy and force everyone to eat salad.'",
      id: "Seorang siswa mengusulkan opsi makan siang yang lebih sehat di sekolah. Kepala sekolah merespons, 'Saya tidak akan melarang semua makanan yang disukai siswa dan memaksa semua orang makan salad.'"
    },
    options: {
      en: ["Straw Man", "Hasty Generalization", "Appeal to Authority", "Post Hoc"],
      id: ["Straw Man", "Generalisasi Gegabah", "Appeal to Authority", "Post Hoc"]
    },
    correctAnswer: {
      en: "Straw Man",
      id: "Straw Man"
    },
    explanation: {
      en: "The principal distorts the proposal for 'healthier options' into an extreme position of 'banning all enjoyable food', which is easier to dismiss.",
      id: "Kepala sekolah mendistorsi usulan 'opsi lebih sehat' menjadi posisi ekstrem 'melarang semua makanan enak', yang lebih mudah ditolak."
    }
  },
  
  // Hasty Generalization
  {
    scenario: {
      en: "After meeting two rude customers from a particular city, a store clerk concludes that everyone from that city is rude.",
      id: "Setelah bertemu dua pelanggan yang kasar dari sebuah kota tertentu, seorang pramuniaga menyimpulkan bahwa semua orang dari kota itu kasar."
    },
    options: {
      en: ["Hasty Generalization", "Post Hoc", "Faulty Analogy", "Bandwagon Appeal"],
      id: ["Generalisasi Gegabah", "Post Hoc", "Analogi yang Keliru", "Bandwagon Appeal"]
    },
    correctAnswer: {
      en: "Hasty Generalization",
      id: "Generalisasi Gegabah"
    },
    explanation: {
      en: "Drawing a broad conclusion about all people from a city based on only two encounters is a hasty generalization.",
      id: "Menarik kesimpulan luas tentang semua orang dari sebuah kota berdasarkan hanya dua pertemuan adalah generalisasi gegabah."
    }
  },
  {
    scenario: {
      en: "A student fails one math test and declares, 'I'm terrible at all math and will never understand it.'",
      id: "Seorang siswa gagal satu tes matematika dan menyatakan, 'Saya buruk dalam semua matematika dan tidak akan pernah memahaminya.'"
    },
    options: {
      en: ["Hasty Generalization", "Slippery Slope", "False Dichotomy", "Ad Hominem"],
      id: ["Generalisasi Gegabah", "Slippery Slope", "Dikotomi Palsu", "Ad Hominem"]
    },
    correctAnswer: {
      en: "Hasty Generalization",
      id: "Generalisasi Gegabah"
    },
    explanation: {
      en: "Concluding that one failed test means permanent inability in all of math is a hasty generalization from insufficient evidence.",
      id: "Menyimpulkan bahwa satu tes yang gagal berarti ketidakmampuan permanen dalam semua matematika adalah generalisasi gegabah dari bukti yang tidak cukup."
    }
  },
  
  // Appeal to Authority
  {
    scenario: {
      en: "A celebrity with no medical training promotes a health supplement, claiming it cured their illness, so it must work for everyone.",
      id: "Seorang selebriti tanpa pelatihan medis mempromosikan suplemen kesehatan, mengklaim itu menyembuhkan penyakit mereka, jadi pasti berhasil untuk semua orang."
    },
    options: {
      en: ["Appeal to Authority", "Bandwagon Appeal", "Post Hoc", "Faulty Analogy"],
      id: ["Appeal to Authority", "Bandwagon Appeal", "Post Hoc", "Analogi yang Keliru"]
    },
    correctAnswer: {
      en: "Appeal to Authority",
      id: "Appeal to Authority"
    },
    explanation: {
      en: "This relies on the celebrity's fame rather than medical expertise or scientific evidence, making it a false appeal to authority.",
      id: "Ini mengandalkan ketenaran selebriti daripada keahlian medis atau bukti ilmiah, menjadikannya appeal to authority yang keliru."
    }
  },
  {
    scenario: {
      en: "An advertisement states, 'Nine out of ten dentists recommend this toothpaste,' without mentioning that those dentists were paid consultants for the company.",
      id: "Sebuah iklan menyatakan, 'Sembilan dari sepuluh dokter gigi merekomendasikan pasta gigi ini,' tanpa menyebutkan bahwa dokter gigi tersebut adalah konsultan berbayar perusahaan."
    },
    options: {
      en: ["Appeal to Authority", "Bandwagon Appeal", "Red Herring", "Hasty Generalization"],
      id: ["Appeal to Authority", "Bandwagon Appeal", "Red Herring", "Generalisasi Gegabah"]
    },
    correctAnswer: {
      en: "Appeal to Authority",
      id: "Appeal to Authority"
    },
    explanation: {
      en: "While dentists are legitimate authorities, the conflict of interest undermines the validity of this appeal to authority.",
      id: "Meskipun dokter gigi adalah otoritas yang sah, konflik kepentingan merusak validitas appeal to authority ini."
    }
  },
  
  // False Dichotomy
  {
    scenario: {
      en: "A politician declares, 'Either we build this wall, or our country will be overrun with criminals.'",
      id: "Seorang politisi menyatakan, 'Entah kita membangun tembok ini, atau negara kita akan dibanjiri penjahat.'"
    },
    options: {
      en: ["False Dichotomy", "Slippery Slope", "Straw Man", "Red Herring"],
      id: ["Dikotomi Palsu", "Slippery Slope", "Straw Man", "Red Herring"]
    },
    correctAnswer: {
      en: "False Dichotomy",
      id: "Dikotomi Palsu"
    },
    explanation: {
      en: "This presents only two extreme options while ignoring many other possibilities for border security and immigration policy.",
      id: "Ini menyajikan hanya dua opsi ekstrem sambil mengabaikan banyak kemungkinan lain untuk keamanan perbatasan dan kebijakan imigrasi."
    }
  },
  {
    scenario: {
      en: "A parent tells their child, 'You either study medicine like I want, or you'll end up working a minimum wage job forever.'",
      id: "Seorang orang tua memberi tahu anaknya, 'Kamu harus belajar kedokteran seperti yang saya inginkan, atau kamu akan berakhir bekerja dengan upah minimum selamanya.'"
    },
    options: {
      en: ["False Dichotomy", "Ad Hominem", "Hasty Generalization", "Appeal to Authority"],
      id: ["Dikotomi Palsu", "Ad Hominem", "Generalisasi Gegabah", "Appeal to Authority"]
    },
    correctAnswer: {
      en: "False Dichotomy",
      id: "Dikotomi Palsu"
    },
    explanation: {
      en: "This falsely presents only two career outcomes, ignoring the many other professional paths available.",
      id: "Ini salah menyajikan hanya dua hasil karir, mengabaikan banyak jalur profesional lain yang tersedia."
    }
  },
  
  // Slippery Slope
  {
    scenario: {
      en: "If we allow students to redo one assignment, soon they'll expect to redo everything, then they'll want unlimited deadline extensions, and eventually academic standards will completely collapse.",
      id: "Jika kita mengizinkan siswa mengulang satu tugas, segera mereka akan berharap mengulang semuanya, lalu mereka akan menginginkan perpanjangan tenggat waktu tanpa batas, dan akhirnya standar akademik akan benar-benar runtuh."
    },
    options: {
      en: ["Slippery Slope", "False Dichotomy", "Hasty Generalization", "Straw Man"],
      id: ["Slippery Slope", "Dikotomi Palsu", "Generalisasi Gegabah", "Straw Man"]
    },
    correctAnswer: {
      en: "Slippery Slope",
      id: "Slippery Slope"
    },
    explanation: {
      en: "This assumes that one reasonable accommodation will inevitably lead to a catastrophic chain of events without justification.",
      id: "Ini mengasumsikan bahwa satu akomodasi yang wajar akan pasti mengarah pada rangkaian peristiwa bencana tanpa justifikasi."
    }
  },
  {
    scenario: {
      en: "A person argues, 'If we ban one type of plastic bag, next they'll ban all plastic, then all packaging, and soon we won't be able to buy anything.'",
      id: "Seseorang berargumen, 'Jika kita melarang satu jenis kantong plastik, selanjutnya mereka akan melarang semua plastik, lalu semua kemasan, dan segera kita tidak akan bisa membeli apa pun.'"
    },
    options: {
      en: ["Slippery Slope", "Red Herring", "Post Hoc", "Faulty Analogy"],
      id: ["Slippery Slope", "Red Herring", "Post Hoc", "Analogi yang Keliru"]
    },
    correctAnswer: {
      en: "Slippery Slope",
      id: "Slippery Slope"
    },
    explanation: {
      en: "This claims that one environmental regulation will inevitably lead to extreme outcomes without evidence for this chain reaction.",
      id: "Ini mengklaim bahwa satu regulasi lingkungan akan pasti mengarah pada hasil ekstrem tanpa bukti untuk reaksi berantai ini."
    }
  },
  
  // Red Herring
  {
    scenario: {
      en: "During a debate about education funding, a candidate suddenly shifts to talking about their military service record instead of addressing the education question.",
      id: "Selama debat tentang pendanaan pendidikan, seorang kandidat tiba-tiba beralih membicarakan catatan layanan militer mereka daripada menjawab pertanyaan tentang pendidikan."
    },
    options: {
      en: ["Red Herring", "Ad Hominem", "Straw Man", "Appeal to Authority"],
      id: ["Red Herring", "Ad Hominem", "Straw Man", "Appeal to Authority"]
    },
    correctAnswer: {
      en: "Red Herring",
      id: "Red Herring"
    },
    explanation: {
      en: "The candidate introduces an irrelevant topic (military service) to distract from the actual question about education funding.",
      id: "Kandidat memperkenalkan topik yang tidak relevan (layanan militer) untuk mengalihkan perhatian dari pertanyaan sebenarnya tentang pendanaan pendidikan."
    }
  },
  {
    scenario: {
      en: "When asked about missing homework, a student responds, 'But what about all the times I did submit my homework on time?'",
      id: "Ketika ditanya tentang pekerjaan rumah yang hilang, seorang siswa merespons, 'Tapi bagaimana dengan semua waktu saya menyerahkan pekerjaan rumah tepat waktu?'"
    },
    options: {
      en: ["Red Herring", "Hasty Generalization", "False Dichotomy", "Bandwagon Appeal"],
      id: ["Red Herring", "Generalisasi Gegabah", "Dikotomi Palsu", "Bandwagon Appeal"]
    },
    correctAnswer: {
      en: "Red Herring",
      id: "Red Herring"
    },
    explanation: {
      en: "The student deflects from the current missing homework by bringing up past submissions, which is irrelevant to the present issue.",
      id: "Siswa mengalihkan dari pekerjaan rumah yang hilang saat ini dengan mengangkat pengumpulan masa lalu, yang tidak relevan dengan masalah saat ini."
    }
  },
  
  // Bandwagon Appeal
  {
    scenario: {
      en: "An advertisement claims, 'Over 10 million people have bought this product. Shouldn't you?' without explaining why the product is actually good.",
      id: "Sebuah iklan mengklaim, 'Lebih dari 10 juta orang telah membeli produk ini. Bukankah Anda juga harus?' tanpa menjelaskan mengapa produknya benar-benar bagus."
    },
    options: {
      en: ["Bandwagon Appeal", "Appeal to Authority", "Hasty Generalization", "Post Hoc"],
      id: ["Bandwagon Appeal", "Appeal to Authority", "Generalisasi Gegabah", "Post Hoc"]
    },
    correctAnswer: {
      en: "Bandwagon Appeal",
      id: "Bandwagon Appeal"
    },
    explanation: {
      en: "This argues that because many people bought it, you should too, relying on popularity rather than the product's merits.",
      id: "Ini berargumen bahwa karena banyak orang membelinya, Anda juga harus, mengandalkan popularitas daripada manfaat produk."
    }
  },
  {
    scenario: {
      en: "A teenager tells their parents, 'Everyone in my class has the latest phone. I need one too or I'll be left out.'",
      id: "Seorang remaja memberi tahu orang tuanya, 'Semua orang di kelas saya memiliki ponsel terbaru. Saya juga membutuhkannya atau saya akan ditinggalkan.'"
    },
    options: {
      en: ["Bandwagon Appeal", "False Dichotomy", "Ad Hominem", "Slippery Slope"],
      id: ["Bandwagon Appeal", "Dikotomi Palsu", "Ad Hominem", "Slippery Slope"]
    },
    correctAnswer: {
      en: "Bandwagon Appeal",
      id: "Bandwagon Appeal"
    },
    explanation: {
      en: "This argues for getting the phone based on what everyone else has, rather than on actual need or value.",
      id: "Ini berargumen untuk mendapatkan ponsel berdasarkan apa yang dimiliki orang lain, daripada kebutuhan atau nilai aktual."
    }
  },
  
  // Faulty Analogy
  {
    scenario: {
      en: "A manager argues, 'Employees are like machines. Just as we don't ask machines how they feel, we shouldn't care about employee satisfaction.'",
      id: "Seorang manajer berargumen, 'Karyawan seperti mesin. Sama seperti kita tidak menanyakan perasaan mesin, kita tidak perlu peduli tentang kepuasan karyawan.'"
    },
    options: {
      en: ["Faulty Analogy", "Ad Hominem", "Straw Man", "False Dichotomy"],
      id: ["Analogi yang Keliru", "Ad Hominem", "Straw Man", "Dikotomi Palsu"]
    },
    correctAnswer: {
      en: "Faulty Analogy",
      id: "Analogi yang Keliru"
    },
    explanation: {
      en: "This comparison between employees and machines is faulty because humans have emotions, motivations, and needs that machines don't have.",
      id: "Perbandingan antara karyawan dan mesin ini keliru karena manusia memiliki emosi, motivasi, dan kebutuhan yang tidak dimiliki mesin."
    }
  },
  {
    scenario: {
      en: "Someone argues, 'Banning books is like weeding a garden. Just as gardeners remove harmful weeds, we should remove harmful books.'",
      id: "Seseorang berargumen, 'Melarang buku seperti menyiangi taman. Sama seperti tukang kebun menghilangkan gulma berbahaya, kita harus menghapus buku berbahaya.'"
    },
    options: {
      en: ["Faulty Analogy", "Slippery Slope", "Appeal to Authority", "Bandwagon Appeal"],
      id: ["Analogi yang Keliru", "Slippery Slope", "Appeal to Authority", "Bandwagon Appeal"]
    },
    correctAnswer: {
      en: "Faulty Analogy",
      id: "Analogi yang Keliru"
    },
    explanation: {
      en: "This analogy is faulty because weeds objectively harm gardens, but labeling books as 'harmful' is subjective and involves complex free speech considerations that don't apply to gardening.",
      id: "Analogi ini keliru karena gulma secara objektif merusak taman, tetapi melabeli buku sebagai 'berbahaya' adalah subjektif dan melibatkan pertimbangan kebebasan berbicara yang kompleks yang tidak berlaku untuk berkebun."
    }
  },
  
  // Post Hoc Ergo Propter Hoc
  {
    scenario: {
      en: "After a new mayor took office, the city's crime rate decreased. Therefore, the mayor's policies must have caused the decrease in crime.",
      id: "Setelah walikota baru menjabat, tingkat kejahatan kota menurun. Oleh karena itu, kebijakan walikota pasti menyebabkan penurunan kejahatan."
    },
    options: {
      en: ["Post Hoc", "Hasty Generalization", "False Dichotomy", "Faulty Analogy"],
      id: ["Post Hoc", "Generalisasi Gegabah", "Dikotomi Palsu", "Analogi yang Keliru"]
    },
    correctAnswer: {
      en: "Post Hoc",
      id: "Post Hoc"
    },
    explanation: {
      en: "This assumes that because the crime decrease happened after the mayor took office, the mayor's policies caused it, ignoring other potential factors.",
      id: "Ini mengasumsikan bahwa karena penurunan kejahatan terjadi setelah walikota menjabat, kebijakan walikota yang menyebabkannya, mengabaikan faktor potensial lainnya."
    }
  },
  {
    scenario: {
      en: "I wore my lucky socks during the exam and got an A. These socks must bring good luck on tests.",
      id: "Saya memakai kaos kaki keberuntungan saya selama ujian dan mendapat nilai A. Kaos kaki ini pasti membawa keberuntungan dalam ujian."
    },
    options: {
      en: ["Post Hoc", "Hasty Generalization", "Appeal to Authority", "Red Herring"],
      id: ["Post Hoc", "Generalisasi Gegabah", "Appeal to Authority", "Red Herring"]
    },
    correctAnswer: {
      en: "Post Hoc",
      id: "Post Hoc"
    },
    explanation: {
      en: "This assumes that wearing the socks caused the good grade simply because it happened first, ignoring the actual cause (studying, preparation, etc.).",
      id: "Ini mengasumsikan bahwa memakai kaos kaki menyebabkan nilai bagus hanya karena itu terjadi lebih dulu, mengabaikan penyebab sebenarnya (belajar, persiapan, dll.)."
    }
  }
];

/**
 * Get a random sparring challenge
 * GET /api/dojo/sparring-challenge
 */
export const getSparringChallenge = async (req, res) => {
  try {
    const { language = 'en', apiKey } = req.query;
    
    // Select a random challenge from the database
    const randomIndex = Math.floor(Math.random() * fallacyDatabase.length);
    const challenge = fallacyDatabase[randomIndex];

    // Get text in the requested language (no translation needed!)
    const lang = language === 'id' ? 'id' : 'en';

    const response = {
      challengeId: uuidv4(),
      scenarioIndex: randomIndex,
      scenario: typeof challenge.scenario === 'string' ? challenge.scenario : (challenge.scenario[lang] || challenge.scenario.en),
      options: Array.isArray(challenge.options) ? challenge.options : (challenge.options[lang] || challenge.options.en),
      correctAnswer: typeof challenge.correctAnswer === 'string' ? challenge.correctAnswer : (challenge.correctAnswer[lang] || challenge.correctAnswer.en)
    };

    console.log(`✅ Returned Fallacy Sparring challenge in ${lang.toUpperCase()} (instant, no translation)`);
    res.json(response);

  } catch (error) {
    console.error('Error in getSparringChallenge:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch sparring challenge',
        status: 500
      }
    });
  }
};

// Helper function to translate text to Indonesian
async function translateToIndonesian(text, apiKey = null) {
  try {
    // If no API key provided, return original text
    if (!apiKey) {
      console.log('⚠️ No API key provided for translation, returning original text');
      console.log('Text preview:', text.substring(0, 50) + '...');
      return text;
    }

    console.log('✅ API key found, attempting translation...');
    console.log('Text to translate:', text.substring(0, 50) + '...');
    
    const model = getGeminiModel(apiKey);
    const prompt = `Translate the following English text to Indonesian. Preserve the tone, style, and emotional impact. Only return the translation, nothing else.

English text:
${text}

Indonesian translation:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translatedText = response.text().trim();
    
    console.log(`✅ Translated successfully: ${translatedText.substring(0, 50)}...`);
    return translatedText;
  } catch (error) {
    console.error('❌ Translation error:', error.message);
    console.error('Returning original text as fallback');
    // If translation fails, return original text
    return text;
  }
}

/**
 * Verify the user's answer to a sparring challenge
 * POST /api/dojo/verify-answer
 */
export const verifySparringAnswer = async (req, res) => {
  try {
    const { challengeId, userAnswer, scenario, scenarioIndex, language = 'en', apiKey } = req.body;

    if (!userAnswer) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields',
          status: 400
        }
      });
    }

    // Find the challenge using scenarioIndex (most reliable) or fallback to scenario matching
    let challenge;
    
    if (scenarioIndex !== undefined && scenarioIndex !== null) {
      challenge = fallacyDatabase[scenarioIndex];
    } else {
      // Fallback: try to find by scenario (for backwards compatibility)
      challenge = fallacyDatabase.find(c => {
        const scenarioText = typeof c.scenario === 'string' ? c.scenario : c.scenario.en;
        return scenarioText === scenario;
      });
    }

    if (!challenge) {
      return res.status(404).json({
        error: {
          message: 'Challenge not found',
          status: 404
        }
      });
    }

    // Get text in the requested language
    const lang = language === 'id' ? 'id' : 'en';
    const correctAnswer = typeof challenge.correctAnswer === 'string' ? challenge.correctAnswer : (challenge.correctAnswer[lang] || challenge.correctAnswer.en);
    
    const isCorrect = userAnswer === correctAnswer;

    const response = {
      isCorrect,
      correctAnswer: correctAnswer,
      explanation: typeof challenge.explanation === 'string' ? challenge.explanation : (challenge.explanation[lang] || challenge.explanation.en)
    };

    console.log(`✅ Verified answer in ${lang.toUpperCase()} (instant, no translation)`);
    res.json(response);

  } catch (error) {
    console.error('Error in verifySparringAnswer:', error);
    res.status(500).json({
      error: {
        message: 'Failed to verify answer',
        status: 500
      }
    });
  }
};

/**
 * Bias Blindspot Challenge Database
 * Contains pairs of articles on the same topic from opposing perspectives
 */
const biasDatabase = [
  {
    topic: {
      en: "Climate Change Policy",
      id: "Kebijakan Perubahan Iklim"
    },
    articleA: {
      source: "Progressive News Network",
      bias: "Left-leaning",
      title: {
        en: "Climate Crisis Demands Immediate Action",
        id: "Krisis Iklim Menuntut Tindakan Segera"
      },
      content: {
        en: "Scientists are sounding the alarm: our planet is on the brink of catastrophe. The devastating wildfires, unprecedented floods, and scorching heatwaves we've witnessed are not random events—they're dire warnings of the climate emergency we face. Every day of inaction is a betrayal of future generations. Progressive leaders are fighting tooth and nail against the fossil fuel industry's stranglehold on our government, but conservative politicians continue to deny science and protect their corporate donors. We must act now with bold, sweeping reforms before it's too late.",
        id: "Para ilmuwan membunyikan alarm: planet kita berada di ambang bencana. Kebakaran hutan yang menghancurkan, banjir yang belum pernah terjadi sebelumnya, dan gelombang panas yang membakar yang kita saksikan bukanlah peristiwa acak—mereka adalah peringatan mengerikan dari darurat iklim yang kita hadapi. Setiap hari tidak bertindak adalah pengkhianatan terhadap generasi masa depan. Pemimpin progresif berjuang habis-habisan melawan cengkeraman industri bahan bakar fosil pada pemerintah kita, tetapi politisi konservatif terus menyangkal sains dan melindungi donor korporat mereka. Kita harus bertindak sekarang dengan reformasi yang berani dan menyeluruh sebelum terlambat."
      }
    },
    articleB: {
      source: "Conservative Policy Review",
      bias: "Right-leaning",
      title: {
        en: "Balanced Approach Needed for Climate Policy",
        id: "Pendekatan Seimbang Diperlukan untuk Kebijakan Iklim"
      },
      content: {
        en: "While climate change is a concern that deserves attention, radical environmentalists are pushing extreme policies that would devastate our economy and hurt working families. Their alarmist rhetoric ignores the real-world consequences of shutting down entire industries overnight. Hardworking Americans in energy sectors would lose their jobs, while elitist politicians fly in private jets to climate conferences. We need sensible, market-based solutions that protect both our environment and our prosperity—not the job-killing regulations that liberal activists demand.",
        id: "Meskipun perubahan iklim adalah kekhawatiran yang layak mendapat perhatian, para aktivis lingkungan radikal mendorong kebijakan ekstrem yang akan menghancurkan ekonomi kita dan melukai keluarga pekerja. Retorika alarmis mereka mengabaikan konsekuensi dunia nyata dari menutup seluruh industri dalam semalam. Orang Amerika yang bekerja keras di sektor energi akan kehilangan pekerjaan mereka, sementara politisi elitis terbang dengan jet pribadi ke konferensi iklim. Kita memerlukan solusi berbasis pasar yang masuk akal yang melindungi lingkungan dan kemakmuran kita—bukan regulasi pembunuh pekerjaan yang dituntut aktivis liberal."
      }
    }
  },
  {
    topic: {
      en: "Education Reform",
      id: "Reformasi Pendidikan"
    },
    articleA: {
      source: "Teachers United Journal",
      bias: "Pro-teacher union",
      title: {
        en: "Public Schools Under Attack by Privatization Agenda",
        id: "Sekolah Negeri Diserang Agenda Privatisasi"
      },
      content: {
        en: "Corporate interests are systematically dismantling our public education system. Greedy charter school operators and voucher advocates are siphoning away desperately needed funds from struggling public schools, all while lining their own pockets. Our dedicated teachers—who already sacrifice so much for poverty-stricken students—face unconscionable budget cuts while billionaires push their privatization schemes. These reformers care nothing about education quality; they only see dollar signs. We must stand with our heroic teachers and protect public education from these predatory corporate raiders.",
        id: "Kepentingan korporat secara sistematis meruntuhkan sistem pendidikan publik kita. Operator sekolah *charter* yang tamak dan para pendukung *voucher* menguras dana yang sangat dibutuhkan dari sekolah-sekolah publik yang sedang berjuang, seraya memperkaya diri sendiri. Guru-guru kita yang berdedikasi—yang telah mengorbankan begitu banyak untuk siswa-siswa yang dilanda kemiskinan—menghadapi pemotongan anggaran yang tidak masuk akal, sementara para miliarder mendorong skema privatisasi mereka. Para 'reformis' ini sama sekali tidak peduli pada kualitas pendidikan; mereka hanya melihat tanda dolar. Kita harus berdiri bersama guru-guru kita yang heroik dan melindungi pendidikan publik dari penjarah korporat yang buas ini."
      }
    },
    articleB: {
      source: "Parents for School Choice",
      bias: "Pro-school choice",
      title: {
        en: "Empowering Parents Through Education Options",
        id: "Memberdayakan Orang Tua Melalui Pilihan Pendidikan"
      },
      content: {
        en: "For too long, teachers unions have held our children's education hostage to protect their own interests. Thousands of students remain trapped in failing schools while union bosses fight any attempt at meaningful reform. Parents—especially in underserved communities—are demanding the freedom to choose the best education for their children, whether that's a charter school, private school, or homeschooling. But the education establishment continues its fear-mongering campaign, protecting the status quo at the expense of student success. It's time to put children first and break the unions' monopoly on education.",
        id: "Terlalu lama, serikat guru telah menyandera pendidikan anak-anak kita untuk melindungi kepentingan mereka sendiri. Ribuan siswa tetap terjebak di sekolah yang gagal sementara bos serikat melawan setiap upaya reformasi yang bermakna. Orang tua—terutama di komunitas yang kurang terlayani—menuntut kebebasan untuk memilih pendidikan terbaik bagi anak-anak mereka, baik itu sekolah *charter*, sekolah swasta, atau *homeschooling*. Tapi establishment pendidikan melanjutkan kampanye menakut-nakuti mereka, melindungi status quo dengan mengorbankan kesuksesan siswa. Saatnya mengutamakan anak-anak dan memecahkan monopoli serikat atas pendidikan."
      }
    }
  },
  {
    topic: {
      en: "Immigration Policy",
      id: "Kebijakan Imigrasi"
    },
    articleA: {
      source: "Border Security Today",
      bias: "Restrictionist",
      title: {
        en: "Border Crisis Threatens National Security",
        id: "Krisis Perbatasan Mengancam Keamanan Nasional"
      },
      content: {
        en: "Our southern border is in complete chaos. Waves of illegal immigrants are flooding across, overwhelming our communities and draining public resources. Criminal cartels are exploiting our weak border enforcement, trafficking dangerous drugs and weapons into American neighborhoods. Law-abiding citizens are paying the price while politicians turn a blind eye to this invasion. Every country has the right—the duty—to protect its borders and control who enters. Yet open-borders advocates recklessly dismiss these legitimate security concerns as 'xenophobia.' We need leaders with the courage to enforce our laws and protect American families.",
        id: "Perbatasan selatan kita dalam kekacauan total. Gelombang imigran ilegal membanjiri masuk, membebani komunitas kita dan menguras sumber daya publik. Kartel kriminal mengeksploitasi penegakan perbatasan kita yang lemah, menyelundupkan narkoba dan senjata berbahaya ke lingkungan warga Amerika. Warga negara taat hukum membayar mahal akibatnya sementara politisi menutup mata terhadap invasi ini. Setiap negara memiliki hak—bahkan kewajiban—untuk melindungi perbatasannya dan mengontrol siapa yang masuk. Namun para pendukung perbatasan terbuka secara sembrono menepis kekhawatiran keamanan yang sah ini sebagai 'xenofobia.' Kita membutuhkan pemimpin dengan keberanian untuk menegakkan hukum kita dan melindungi keluarga-keluarga Amerika."
      }
    },
    articleB: {
      source: "New Americans Coalition",
      bias: "Pro-immigration",
      title: {
        en: "Compassion and Justice for Immigrant Families",
        id: "Belas Kasih dan Keadilan bagi Keluarga Imigran"
      },
      content: {
        en: "Heartbreaking images of families torn apart at the border reveal the cruelty of our broken immigration system. Desperate refugees fleeing violence and persecution are being treated like criminals by xenophobic politicians who exploit fear for political gain. These vulnerable people—including innocent children—deserve compassion, not demonization. They're seeking the same opportunities our own ancestors sought when they came to America. Yet hardliners continue their inhumane crusade, spreading racist rhetoric and proposing cruel policies that violate our nation's values. We must reject this hatred and embrace our identity as a nation of immigrants.",
        id: "Gambar-gambar memilukan keluarga yang dipisahkan di perbatasan mengungkapkan kekejaman sistem imigrasi kita yang rusak. Pengungsi putus asa yang melarikan diri dari kekerasan dan penganiayaan diperlakukan seperti penjahat oleh politisi xenofobia yang mengeksploitasi ketakutan untuk keuntungan politik. Orang-orang rentan ini—termasuk anak-anak tak berdosa—layak mendapat belas kasih, bukan demonisasi. Mereka mencari peluang yang sama yang dicari nenek moyang kita sendiri ketika mereka datang ke Amerika. Namun garis keras melanjutkan kampanye tidak manusiawi mereka, menyebarkan retorika rasis dan mengusulkan kebijakan kejam yang melanggar nilai-nilai bangsa kita. Kita harus menolak kebencian ini dan merangkul identitas kita sebagai bangsa imigran."
      }
    }
  }
];

/**
 * Get a random Bias Blindspot Challenge
 * POST /api/dojo/bias-challenge
 */
export const getBiasChallenge = async (req, res) => {
  try {
    const { language = 'en', apiKey } = req.body;
    
    console.log('=== getBiasChallenge Called ===');
    console.log('Language:', language);
    
    // Select a random challenge from the bias database
    const randomIndex = Math.floor(Math.random() * biasDatabase.length);
    const challenge = biasDatabase[randomIndex];

    console.log('Selected challenge topic:', typeof challenge.topic === 'string' ? challenge.topic : challenge.topic.en);
    
    // Get text in the requested language (no translation needed!)
    const lang = language === 'id' ? 'id' : 'en';
    
    const response = {
      challengeId: uuidv4(),
      topic: typeof challenge.topic === 'string' ? challenge.topic : (challenge.topic[lang] || challenge.topic.en),
      articleA: {
        source: challenge.articleA.source,
        bias: challenge.articleA.bias,
        title: typeof challenge.articleA.title === 'string' ? challenge.articleA.title : (challenge.articleA.title[lang] || challenge.articleA.title.en),
        content: typeof challenge.articleA.content === 'string' ? challenge.articleA.content : (challenge.articleA.content[lang] || challenge.articleA.content.en)
      },
      articleB: {
        source: challenge.articleB.source,
        bias: challenge.articleB.bias,
        title: typeof challenge.articleB.title === 'string' ? challenge.articleB.title : (challenge.articleB.title[lang] || challenge.articleB.title.en),
        content: typeof challenge.articleB.content === 'string' ? challenge.articleB.content : (challenge.articleB.content[lang] || challenge.articleB.content.en)
      },
      instructions: language === 'id' 
        ? "Sorot contoh bahasa bermuatan, ajakan emosional, dan pembingkaian bias di kedua artikel. Perhatikan bagaimana setiap sumber menyajikan topik yang sama melalui perspektif yang berbeda."
        : "Highlight examples of loaded language, emotional appeals, and biased framing in both articles. Notice how each source presents the same topic through a different lens."
    };

    console.log(`✅ Returned ${lang.toUpperCase()} content`);
    console.log('Article A title:', response.articleA.title.substring(0, 50) + '...');
    console.log('Article B title:', response.articleB.title.substring(0, 50) + '...');
    console.log('=============================');
    
    res.json(response);

  } catch (error) {
    console.error('❌ Error in getBiasChallenge:', error);
    res.status(500).json({
      error: {
        message: error.message || 'Failed to fetch bias challenge',
        status: 500
      }
    });
  }
};

/**
 * Analyze user's bias highlights and provide feedback
 * POST /api/dojo/analyze-bias-highlights
 */
export const analyzeBiasHighlights = async (req, res) => {
  try {
    const { challengeId, articleAHighlights, articleBHighlights, topic, language = 'en' } = req.body;

    if (!articleAHighlights || !articleBHighlights || !topic) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields',
          status: 400
        }
      });
    }

    // Count highlights by category
    const countByCategory = (highlights) => {
      return highlights.reduce((acc, h) => {
        acc[h.category] = (acc[h.category] || 0) + 1;
        return acc;
      }, {});
    };

    const articleAStats = countByCategory(articleAHighlights);
    const articleBStats = countByCategory(articleBHighlights);
    const totalHighlights = articleAHighlights.length + articleBHighlights.length;

    // Generate feedback based on highlights
    let feedback = {
      overallScore: 0,
      strengths: [],
      improvements: [],
      insights: [],
      categoryBreakdown: {
        loaded: (articleAStats.loaded || 0) + (articleBStats.loaded || 0),
        emotional: (articleAStats.emotional || 0) + (articleBStats.emotional || 0),
        framing: (articleAStats.framing || 0) + (articleBStats.framing || 0)
      }
    };

    // Feedback messages in English and Indonesian
    const messages = {
      en: {
        excellentThoroughness: "Excellent thoroughness! You identified a substantial number of bias indicators across both articles.",
        goodEffort: "Good effort in identifying bias indicators in both articles.",
        tryMore: "Try to identify more examples of bias. Look closely at word choices, emotional language, and how facts are framed.",
        allThreeTypes: "Great job identifying all three types of bias: loaded language, emotional appeals, and biased framing!",
        twoTypes: "You identified two types of bias. Try to also look for the third category to get a more complete picture.",
        focusDifferent: "Focus on identifying different types of bias, not just one category. Look for loaded language, emotional appeals, AND biased framing.",
        balanced: "Well-balanced analysis! You recognized that both articles contain bias, not just one perspective.",
        evenBalance: "Try to identify bias in BOTH articles more evenly. Remember, both perspectives use biased language—not just one side.",
        insight1: "Both articles use emotionally charged language to influence readers rather than presenting neutral facts.",
        insight2: "Notice how each source frames the same issue completely differently based on their ideological perspective.",
        insight3: "Loaded language often reveals the author's bias more clearly than the facts they present.",
        expert: "Outstanding! You have a keen eye for identifying bias in different forms.",
        proficient: "Good work! You're developing strong skills in recognizing biased language.",
        developing: "You're on the right track. Keep practicing to sharpen your bias detection skills.",
        beginner: "Keep practicing! Bias detection is a skill that improves with experience."
      },
      id: {
        excellentThoroughness: "Luar biasa! Anda mengidentifikasi banyak indikator bias di kedua artikel.",
        goodEffort: "Usaha yang baik dalam mengidentifikasi indikator bias di kedua artikel.",
        tryMore: "Coba identifikasi lebih banyak contoh bias. Perhatikan pilihan kata, bahasa emosional, dan bagaimana fakta dibingkai.",
        allThreeTypes: "Kerja bagus mengidentifikasi ketiga jenis bias: bahasa bermuatan, ajakan emosional, dan pembingkaian bias!",
        twoTypes: "Anda mengidentifikasi dua jenis bias. Coba juga cari kategori ketiga untuk gambaran yang lebih lengkap.",
        focusDifferent: "Fokus mengidentifikasi berbagai jenis bias, bukan hanya satu kategori. Cari bahasa bermuatan, ajakan emosional, DAN pembingkaian bias.",
        balanced: "Analisis seimbang! Anda mengenali bahwa kedua artikel mengandung bias, bukan hanya satu perspektif.",
        evenBalance: "Coba identifikasi bias di KEDUA artikel secara lebih merata. Ingat, kedua perspektif menggunakan bahasa bias—bukan hanya satu sisi.",
        insight1: "Kedua artikel menggunakan bahasa emosional untuk mempengaruhi pembaca daripada menyajikan fakta netral.",
        insight2: "Perhatikan bagaimana setiap sumber membingkai isu yang sama dengan sangat berbeda berdasarkan perspektif ideologis mereka.",
        insight3: "Bahasa bermuatan sering mengungkap bias penulis lebih jelas daripada fakta yang mereka sajikan.",
        expert: "Luar biasa! Anda memiliki mata yang tajam untuk mengidentifikasi bias dalam berbagai bentuk.",
        proficient: "Kerja bagus! Anda mengembangkan keterampilan kuat dalam mengenali bahasa bias.",
        developing: "Anda di jalur yang benar. Terus berlatih untuk mengasah keterampilan deteksi bias Anda.",
        beginner: "Terus berlatih! Deteksi bias adalah keterampilan yang meningkat dengan pengalaman."
      }
    };

    const msg = messages[language] || messages.en;

    // Evaluate completeness
    if (totalHighlights >= 10) {
      feedback.strengths.push(msg.excellentThoroughness);
      feedback.overallScore += 30;
    } else if (totalHighlights >= 5) {
      feedback.strengths.push(msg.goodEffort);
      feedback.overallScore += 20;
    } else {
      feedback.improvements.push(msg.tryMore);
      feedback.overallScore += 10;
    }

    // Evaluate category diversity
    const categoriesUsed = Object.keys({...articleAStats, ...articleBStats}).length;
    if (categoriesUsed === 3) {
      feedback.strengths.push(msg.allThreeTypes);
      feedback.overallScore += 30;
    } else if (categoriesUsed === 2) {
      feedback.improvements.push(msg.twoTypes);
      feedback.overallScore += 20;
    } else {
      feedback.improvements.push(msg.focusDifferent);
      feedback.overallScore += 10;
    }

    // Evaluate balance between articles
    const articleARatio = articleAHighlights.length / totalHighlights;
    if (articleARatio >= 0.4 && articleARatio <= 0.6) {
      feedback.strengths.push(msg.balanced);
      feedback.overallScore += 25;
    } else {
      feedback.improvements.push(msg.evenBalance);
      feedback.overallScore += 10;
    }

    // Specific insights based on the topic
    feedback.insights.push(msg.insight1);
    feedback.insights.push(msg.insight2);
    feedback.insights.push(msg.insight3);

    // Cap score at 100
    feedback.overallScore = Math.min(feedback.overallScore, 100);

    // Add performance message
    if (feedback.overallScore >= 80) {
      feedback.performanceLevel = language === 'id' ? 'Ahli' : 'Expert';
      feedback.message = msg.expert;
    } else if (feedback.overallScore >= 60) {
      feedback.performanceLevel = language === 'id' ? 'Mahir' : 'Proficient';
      feedback.message = msg.proficient;
    } else if (feedback.overallScore >= 40) {
      feedback.performanceLevel = language === 'id' ? 'Berkembang' : 'Developing';
      feedback.message = msg.developing;
    } else {
      feedback.performanceLevel = language === 'id' ? 'Pemula' : 'Beginner';
      feedback.message = msg.beginner;
    }

    res.json(feedback);

  } catch (error) {
    console.error('Error in analyzeBiasHighlights:', error);
    res.status(500).json({
      error: {
        message: 'Failed to analyze bias highlights',
        status: 500
      }
    });
  }
};
