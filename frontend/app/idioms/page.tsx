"use client";
import { useEffect, useState } from "react";
import PhraseList from "../components/PhraseList";
import { userservice } from "../services/userservice";
import Nav from "../components/nav";

export default function IdiomsPage() {
  const [idioms, setIdioms] = useState<{ text: string; meaning: string }[]>([]);

  // Fetch phrases once on mount
  useEffect(() => {
    const fetchPhrases = async () => {
      const data = await userservice.getIdioms();
      if (data) {
        setIdioms(data.idioms);
      }
    };
    fetchPhrases();
  }, []); // empty dependency array means run once on mount

  // Add new phrase handler
  const addPhrase = async (newItem: { text: string; meaning: string }) => {
    // Optimistically update UI
    setIdioms((prev) => [...prev, newItem]);

    // Update backend
    await userservice.addIdiom(newItem.text, newItem.meaning);
  };

  const editPhrase = async (
    index: number,
    updatedItem: { text: string; meaning: string }
  ) => {
    setIdioms((prev) => {
      const newPhrases = [...prev];
      newPhrases[index] = updatedItem;
      return newPhrases;
    });
    await userservice.updateIdioms([
      ...idioms.slice(0, index),
      updatedItem,
      ...idioms.slice(index + 1),
    ]);
  };

  const removePhrase = async (index: number) => {
    setIdioms((prev) => {
      const newPhrases = prev.filter((_, i) => i !== index);
      return newPhrases;
    });
    await userservice.updateIdioms(idioms.filter((_, i) => i !== index));
  };

  return (
    <>
      <Nav />
      <PhraseList
        title="Idioms"
        items={idioms}
        onAdd={addPhrase}
        onEdit={editPhrase}
        onRemove={removePhrase}
      />
    </>
  );
}
