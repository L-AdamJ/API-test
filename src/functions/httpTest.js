const { app } = require('@azure/functions');

app.http('RiskCalcMath', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const requestData = request.body;

         // Calculate BMI
        const weight = parseFloat(requestData.weight);
        const height = parseFloat(requestData.height);
        const bmi = ((weight / (height * height)) * 703);
        const systolicBP = parseInt(requestData.systolicBP);
        const diastolicBP = parseInt(requestData.diastolicBP);
 
        // Initialize risk scores
        let ageScore = 0;
        let bmiScore = 0;
        let bpScore = 0;
        let familyHistoryScore = 0;
 
        // Calculate risk scores
        if (data.age < 30) {
            ageScore = 0;
        } else if (requestData.age >= 30 && age < 45) {
            ageScore = 10;
        } else if (requestData.age >= 45 && age < 60){
            ageScore = 20;
        } else {
            ageScore = 30
        }
 
        if (bmi <= 24.9) {
            bmiScore = 0;
        } else if (bmi >= 25 && bmi <= 29.9) {
            bmiScore = 30;
        } else {
            bmiScore = 75;
        }
 
        if (systolicBP < 120 && diastolicBP < 80) {
            bpScore = 0;
        } else if(systolicBP >= 120 && systolicBP < 130 && diastolicBP < 80) {
            bpScore = 15;
        } else if(systolicBP >= 130 && systolicBP < 140 || diastolicBP >= 80 && diastolicBP < 90) {
            bpScore = 30;
        } else if(systolicBP >= 140 && systolicBP < 180 || diastolicBP >= 90 && diastolicBP < 120) {
            bpScore = 75;
        } else {
            bpScore = 100;
        }
 
        if (data.diabetes === "y") {
            familyHistoryScore += 10;
        }
        if (data.cancer === "y") {
            familyHistoryScore += 10;
        }
        if (data.alzheimers === "y") {
            familyHistoryScore += 10;
        }
 
        // Calculate total risk score
        const totalScore = ageScore + bmiScore + bpScore + familyHistoryScore;

        // Determine risk level
        let riskLevel = "";
        if (totalScore <=20) {
        riskLevel = "low-risk";
        } else if (totalScore > 20 && totalScore <= 50) {
        riskLevel = "moderate-risk";
        } else if (totalScore > 50 && totalScore <= 75){
        riskLevel = "high-risk";
        } else {
        riskLevel = "uninsurable"
        }

        return {body: {totalScore, riskLevel, ageScore, bmiScore, bpScore, familyHistoryScore, bmi}};
    }   

});
