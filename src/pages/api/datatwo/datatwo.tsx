import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const groupsCollection = collection(db, 'groups');
      const snapshot = await getDocs(groupsCollection);
      const groups = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: doc.id,
          users: Array.isArray(data.users) ? data.users.map(user => ({
            name: user.name || '',
            email: user.email || '',
            id: user.id || ''
          })) : [],
          members: data.members || [],
          created: data.created ? data.created.toDate().toISOString() : null
        };
      });

      res.status(200).json(groups);
    } catch (error) {
      const errMsg = (error instanceof Error) ? error.message : 'Unknown error occurred';
      console.error('Error fetching groups:', errMsg);
      res.status(500).json({ error: 'Internal Server Error', details: errMsg });
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
