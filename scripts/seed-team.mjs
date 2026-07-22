import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dummyTeam = [
  {
    name: "Alex Rivera",
    role: "Lead Engineer",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
    bio: "Alex brings 10 years of full-stack experience to the table, ensuring our technical architecture is scalable and robust.",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Sarah Chen",
    role: "Creative Director",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    bio: "Sarah is the visionary behind our award-winning designs. She blends aesthetic beauty with functional user experience.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Marcus Johnson",
    role: "Growth Strategist",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    bio: "Marcus ensures every project doesn't just look good, but achieves measurable business results and scales efficiently.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  }
];

async function seedDatabase() {
  console.log("Starting database seed...");
  try {
    for (const member of dummyTeam) {
      const docRef = await addDoc(collection(db, "team"), member);
      console.log("Document written with ID: ", docRef.id);
    }
    console.log("Seed complete!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

seedDatabase();
