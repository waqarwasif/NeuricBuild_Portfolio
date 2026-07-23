"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, DocumentData, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useFirestoreCollection<T = DocumentData>(collectionName: string) {
  // Initialize loading to true so it doesn't need to be set synchronously in the effect
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      setError("Database configuration missing.");
      return;
    }

    // We use onSnapshot for real-time live updates!
    const q = query(collection(db, collectionName));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        
        // Try to sort by an 'order' field if it exists, or 'id' if it's numeric/string so items are consistent
        docs.sort((a: any, b: any) => {
          if (typeof a.order === 'number' && typeof b.order === 'number') return a.order - b.order;
          if (a.id && b.id) return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
          return 0;
        });

        setData(docs);
        setError(null);
      } catch (err: unknown) {
        console.error(`Error processing ${collectionName}:`, err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }, (err) => {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err.message);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading, error };
}
