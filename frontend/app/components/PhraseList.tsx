import { FormEvent, useState } from "react";

type Phrase = {
  text: string;
  meaning: string;
};

type phraseProps = {
  title: string;
  items: Phrase[];
  onAdd: (item: Phrase) => void;
  onEdit: (index: number, item: Phrase) => void;
  onRemove: (index: number) => void;
};

export default function PhraseList({
  title,
  items,
  onAdd,
  onEdit,
  onRemove,
}: phraseProps) {
  const [showForm, setShowForm] = useState(false);
  const [newPhrase, setNewPhrase] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editPhrase, setEditPhrase] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Handle adding new phrase
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPhrase.trim() && newDescription.trim()) {
      onAdd({ text: newPhrase, meaning: newDescription });
      setNewPhrase("");
      setNewDescription("");
      setShowForm(false);
    }
  };

  // Handle editing existing phrase
  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null && editPhrase.trim() && editDescription.trim()) {
      onEdit(editingIndex, { text: editPhrase, meaning: editDescription });
      setEditingIndex(null);
      setEditPhrase("");
      setEditDescription("");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600 transition"
        >
          +
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-black/60 border border-white/10 rounded-xl p-4 shadow-md hover:shadow-lg transition relative"
          >
            {editingIndex === idx ? (
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <input
                  type="text"
                  value={editPhrase}
                  onChange={(e) => setEditPhrase(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white mb-2"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white mb-2"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingIndex(null)}
                    className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-white">
                  {item.text}
                </h2>
                <p className="text-gray-300 text-sm mb-4">{item.meaning}</p>

                {/* Edit & Delete buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingIndex(idx);
                      setEditPhrase(item.text);
                      setEditDescription(item.meaning);
                    }}
                    className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600 text-white text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemove(idx)}
                    className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-white text-xs"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Popup Form for adding new phrase */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">Add New</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Phrase"
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
              <textarea
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 text-white"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
