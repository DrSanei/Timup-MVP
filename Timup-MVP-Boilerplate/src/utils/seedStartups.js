import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

export const seedStartups = async () => {
  console.log('🟡 Seeding process started...');
  const db = getFirestore();
  const startupsRef = collection(db, 'startups');

  try {
    const snapshot = await getDocs(startupsRef);
    console.log(`📦 Found ${snapshot.size} documents in 'startups' collection`);

    if (!snapshot.empty) {
      console.log('✅ Startups already seeded. Skipping seeding.');
      return;
    }

    const dummyStartups = [
      { name: 'MediTrack', category: 'HealthTech', value: 2.5 },
      { name: 'FinNova', category: 'FinTech', value: 3.1 },
      { name: 'GoldChain', category: 'Marketplace', value: 1.8 },
      { name: 'EduSync', category: 'EdTech', value: 2.0 },
      { name: 'GreenGo', category: 'CleanTech', value: 1.2 },
    ];

    for (const startup of dummyStartups) {
      await addDoc(startupsRef, startup);
      console.log(`🟢 Added: ${startup.name}`);
    }

    console.log('🌱 Dummy startups seeded successfully.');
  } catch (err) {
    console.error('🔥 Error while seeding startups:', err);
  }
};
