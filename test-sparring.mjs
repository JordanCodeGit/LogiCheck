// Test complete Fallacy Sparring flow in Indonesian
const API_KEY = 'AIzaSyBWoOLW3gM0RrKUmCpCpFdX5b8KgLNwJd4';

const testSparringFlow = async () => {
  console.log('🧪 Testing Fallacy Sparring Flow (Indonesian)...\n');

  try {
    // Step 1: Get challenge in Indonesian
    console.log('📥 Step 1: Fetching challenge in Indonesian...');
    const startTime = Date.now();
    
    const challengeResponse = await fetch('http://localhost:5000/api/dojo/sparring-challenge?language=id');
    const challengeData = await challengeResponse.json();
    
    const loadTime = Date.now() - startTime;
    console.log(`⏱️  Load time: ${loadTime}ms`);
    
    if (!challengeData.success) {
      throw new Error('Challenge request failed');
    }

    console.log('\n📋 Challenge received:');
    console.log('Type:', challengeData.challenge.type);
    console.log('Scenario:', challengeData.challenge.scenario.substring(0, 100) + '...');
    console.log('Options:', challengeData.challenge.options);
    console.log('ScenarioIndex:', challengeData.challenge.scenarioIndex);

    // Step 2: Verify answer
    console.log('\n📤 Step 2: Verifying answer...');
    const verifyStartTime = Date.now();
    
    const verifyResponse = await fetch('http://localhost:5000/api/dojo/verify-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAnswer: challengeData.challenge.options[0], // Try first option
        scenarioIndex: challengeData.challenge.scenarioIndex,
        language: 'id',
        apiKey: API_KEY
      })
    });
    
    const verifyData = await verifyResponse.json();
    const verifyTime = Date.now() - verifyStartTime;
    console.log(`⏱️  Verify time: ${verifyTime}ms`);

    if (!verifyData.success) {
      throw new Error('Verify request failed: ' + JSON.stringify(verifyData));
    }

    console.log('\n✅ Verification result:');
    console.log('Correct:', verifyData.correct);
    console.log('Correct Answer:', verifyData.correctAnswer);
    console.log('Explanation:', verifyData.explanation.substring(0, 150) + '...');

    console.log('\n🎉 All tests passed!');
    console.log(`📊 Total time: ${loadTime + verifyTime}ms`);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

testSparringFlow();
