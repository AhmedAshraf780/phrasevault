"use client";
import { useEffect, useState } from "react";
import PhraseList from "../componenets/PhraseList";
import { userservice } from "../services/userservice";
import Nav from "../componenets/nav";

export default function PhrasalsPage() {
  const [phrasals, setPhrasals] = useState<{ text: string; meaning: string }[]>(
    []
  );

  // Fetch phrases once on mount
  useEffect(() => {
    const fetchPhrases = async () => {
      const data = await userservice.getPhrasals();
      if (data) {
        setPhrasals(data.phrasals);
      }
    };
    fetchPhrases();
  }, []); // empty dependency array means run once on mount

  // Add new phrase handler
  const addPhrase = async (newItem: { text: string; meaning: string }) => {
    // Optimistically update UI
    setPhrasals((prev) => [...prev, newItem]);

    // Update backend
    await userservice.addPhrasal(newItem.text, newItem.meaning);
  };

  const editPhrase = async (
    index: number,
    updatedItem: { text: string; meaning: string }
  ) => {
    setPhrasals((prev) => {
      const newPhrases = [...prev];
      newPhrases[index] = updatedItem;
      return newPhrases;
    });
    await userservice.updatePhrasals([
      ...phrasals.slice(0, index),
      updatedItem,
      ...phrasals.slice(index + 1),
    ]);
  };

  const removePhrase = async (index: number) => {
    setPhrasals((prev) => {
      const newPhrases = prev.filter((_, i) => i !== index);
      return newPhrases;
    });
    await userservice.updatePhrasals(phrasals.filter((_, i) => i !== index));
  };

  return (
    <>
      <Nav />
      <PhraseList
        title="Phrasals"
        items={phrasals}
        onAdd={addPhrase}
        onEdit={editPhrase}
        onRemove={removePhrase}
      />
    </>
  );
}
