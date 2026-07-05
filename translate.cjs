const { GoogleGenAI } = require("@google/genai");

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const textToTranslate = `Translate the following English UI strings and contract terms into Chinese (zh), Japanese (ja), Korean (ko), and Russian (ru). Return ONLY valid JSON where keys are the language codes (zh, ja, ko, ru) and values are objects with these keys: carOwner, carRenter, carOwnerDesc, carTerms (an array of 14 strings corresponding to the 14 respects).

carOwner: "Car owner"
carRenter: "Car renter"
carOwnerDesc: "who is the legal owner of car"

carTerms:
1. "Party (B) requests to rent the vehicle as specified in the above paragraph that belongs to Party (A)."
2. "Party (B) agrees to rent the vehicle described above from Party (A) for {purpose}. Party (B) shall not use the vehicle for any purpose other than {purpose}. Any change to the purpose of this rental requires prior written agreement."
3. "This contract is valid for a period of {duration} months, from {startDate} to {endDate}."
4. "This car is rented for {rentAmount} USD/month."
5. "Party (B) shall pay a security deposit of {deposit} USD to Party (A). This deposit shall cover any intentional or unintentional damage caused to the vehicle during the rental period. Party (A) shall refund the deposit to Party (B) upon termination of the contract, following a vehicle inspection and confirmation that no damage has occurred. In the event that Party (B) terminates the contract prematurely, the deposit shall be automatically forfeited to Party (A)."
6. "Party (B) shall pay the rental fee to Party (A) on the {day} of each month."
7. "Party (B) may not sub-lease or conduct any business with the vehicle rented from Party (A) or transfer its use to a third party without the permission of Party (A), the owner of the vehicle."
8. "In the event that Party (B) acts in violation of the law by using the vehicle during the rental period, Party (B) shall be held legally responsible on its own, without involving Party (A), and Party (A) shall not be liable for any damage caused by Party (B)'s use of the rental vehicle."
9. "9.1 In the event that the vehicle subject to the rental is slightly damaged or seriously damaged due to negligent use or fault of Party (B), the repair shall be the responsibility of Party (B), except in the case of wear and tear due to normal use, in which case the repair shall be the responsibility of Party (A). 9.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of {compensation} of the vehicle price to Party (A). 9.3 In the event that Party (B) uses the vehicle with collisions, scratches or other damages, Party (A) must be notified without allowing Party (B) to conceal the information of taking the vehicle for repair without the consent of Party (A)."
10. "During this rental period, any damage caused by the use of this vehicle, such as traffic accidents or transporting illegal goods, contraband, and other illegal activities, Party (B) shall be solely responsible for both criminal and civil liability."
11. "In the event that Party (B) fails to fulfill its obligation to pay the rent or pays the rent late by more than 7 days, or violates any of the terms of the contract, Party (A) has the right to terminate the contract and repossess the car without notice."
12. "The rental car in this contract is allowed to be used by Party (B) in the area around {area}. In case Party (B) uses it for a wrong purpose or goes to other provinces, it must notify Party (A) for permission, and Party (B) must be fully responsible for all costs and damages without involving Party (A)."
13. "13.1 This contract was made with the genuine and free consent of both parties to all the terms and conditions stated in this contract. 13.2 Any changes to the terms and conditions cannot be made unilaterally by either party unless both parties agree to do so. This contract shall be effective after both parties have signed (thumb print) and accepted this contract. 13.3 Both parties must perform their obligations as stipulated in the above contract fairly and equitably. In the event that either party has malicious intent by violating any of the provisions of the above contract, they will be held liable under applicable law."
14. "14.1 This contract shall be governed by and construed exclusively in accordance with the laws of Cambodia and subject to the jurisdiction of Cambodia. 14.2 This contract is effective and enforceable after both parties have signed and accepted this contract."
`;

  const response = await ai.models.generateContent({
    model: 'gemini-pro-latest',
    contents: textToTranslate,
    config: {
      responseMimeType: "application/json",
    }
  });

  fs.writeFileSync('translated.json', response.text);
  console.log("Translation done");
}

run();
