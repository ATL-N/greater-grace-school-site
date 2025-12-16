"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function StoriesDashboard() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      if (!res.ok) throw new Error("Failed to fetch stories");
      const data = await res.json();
      setStories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      try {
        const res = await fetch(`/api/stories/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete story');
        // Refetch stories to update the list
        setStories(stories.filter(story => story.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="p-8 rounded-lg shadow-lg" style={{ backgroundColor: "var(--background-color)" }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--primary-color)" }}>
          Manage Stories
        </h1>
        <Link href="/admin/stories/new">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <PlusCircle size={20} />
            Create New Story
          </div>
        </Link>
      </div>

      {/* Stories List */}
      {loading && <p>Loading stories...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!loading && !error && (
        <div className="space-y-4">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div
                key={story.id}
                className="p-4 border rounded-lg flex justify-between items-center transition-shadow hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-lg">{story.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(story.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link href={`/admin/stories/edit/${story.id}`}>
                    <div className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer">
                      <Edit size={16} /> Edit
                    </div>
                  </Link>
                  <button onClick={() => handleDelete(story.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-gray-500">No stories found.</p>
              <p className="text-gray-500 mt-2">
                Click "Create New Story" to get started.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
