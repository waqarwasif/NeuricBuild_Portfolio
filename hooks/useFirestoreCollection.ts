"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, DocumentData, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useFirestoreCollection<T = DocumentData>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // We use onSnapshot for real-time live updates!
    const q = query(collection(db, collectionName));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        
        // Try to sort by an 'order' field if it exists, or 'id' if it's numeric/string sortable
        docs.sort((a: any, b: any) => {
          if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
          if (a.id && b.id) return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
          return 0;
        });

        setData(docs);
        setError(null);
      } catch (err: any) {
        console.error(`Error processing ${collectionName}:`, err);
        setError(err.message);
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
