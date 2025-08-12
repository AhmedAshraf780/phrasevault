"use client";
import { useEffect, useState } from "react";
import PhraseList from "../../../componenets/PhraseList";
import { userservice } from "../../../services/userservice";

export default function PhrasesPage() {
  const [phrases, setPhrases] = useState<{ text: string; meaning: string }[]>(
    []
  );

  // Fetch phrases once on mount
  useEffect(() => {
    const fetchPhrases = async () => {
      const data = await userservice.getPhrases();
      if (data && data) {
        setPhrases(data);
      }
    };
    fetchPhrases();
  }, []); // empty dependency array means run once on mount

  // Add new phrase handler
  const addPhrase = async (newItem: { text: string; meaning: string }) => {
    // Optimistically update UI
    setPhrases((prev) => [...prev, newItem]);

    // Update backend
    await userservice.addPhrase(newItem.text, newItem.meaning);
  };

  const editPhrase = async (
    index: number,
    updatedItem: { text: string; meaning: string }
  ) => {
    setPhrases((prev) => {
      const newPhrases = [...prev];
      newPhrases[index] = updatedItem;
      return newPhrases;
    });
    await userservice.updatePhrases([
      ...phrases.slice(0, index),
      updatedItem,
      ...phrases.slice(index + 1),
    ]);
  };

  const removePhrase = async (index: number) => {
    setPhrases((prev) => {
      const newPhrases = prev.filter((_, i) => i !== index);
      return newPhrases;
    });
    await userservice.updatePhrases(phrases.filter((_, i) => i !== index));
  };

  return (
    <PhraseList
      title="Phrases"
      items={phrases}
      onAdd={addPhrase}
      onEdit={editPhrase}
      onRemove={removePhrase}
    />
  );
}
