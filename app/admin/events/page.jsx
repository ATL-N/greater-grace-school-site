"use client";

import { useState } from "react";
import Link from "next/link";

// Mock events data
const initialEvents = [
  {
    id: 1,
    title: "Annual Sports Day 2024",
    description:
      "Our annual interschool sports competition featuring track events, team sports, and individual challenges.",
    date: "March 15, 2024",
    status: "published",
  },
  {
    id: 2,
    title: "Science Fair 2024",
    description:
      "Students showcase their innovative science projects and experiments to the school community and guest judges.",
    date: "February 20, 2024",
    status: "published",
  },
  {
    id: 3,
    title: "Annual Cultural Day",
    description:
      "A celebration of diverse cultures through performances, exhibitions, and interactive activities.",
    date: "December 10, 2023",
    status: "published",
  },
  {
    id: 4,
    title: "Graduation Ceremony 2024",
    description:
      "Celebrating the achievements of our graduating class as they prepare for their next chapter.",
    date: "May 28, 2024",
    status: "published",
  },
];

export default function AdminEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    title: "",
    description: "",
    date: "",
    fullContent: "",
    status: "draft",
    images: [],
    videoId: "",
  });

  // File upload state
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleAddEvent = () => {
    setCurrentEvent({
      id: events.length + 1,
      title: "",
      description: "",
      date: "",
      fullContent: "",
      status: "draft",
      images: [],
      videoId: "",
    });
    setShowForm(true);
    setIsEditing(false);
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setShowForm(true);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(filesArray);
      setUploadMessage(`${filesArray.length} files selected`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate image upload
    const uploadedImagePaths = imageFiles.map(
      (file, index) =>
        `/images/events/${currentEvent.title
          .toLowerCase()
          .replace(/\s+/g, "-")}-${index + 1}.jpg`
    );

    const eventToSave = {
      ...currentEvent,
      images:
        uploadedImagePaths.length > 0
          ? uploadedImagePaths
          : currentEvent.images,
    };

    if (isEditing) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === currentEvent.id ? eventToSave : event
        )
      );
    } else {
      // Add new event
      setEvents([...events, eventToSave]);
    }

    // Reset form
    setShowForm(false);
    setImageFiles([]);
    setUploadMessage("");
    setCurrentEvent({
      id: null,
      title: "",
      description: "",
      date: "",
      fullContent: "",
      status: "draft",
      images: [],
      videoId: "",
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setImageFiles([]);
    setUploadMessage("");
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleChangeStatus = (id, newStatus) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: newStatus } : event
      )
    );
  };

  return (
    <main className="min-h-screen">
      {/* Admin Header */}
      <header
        className="bg-gray-100"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--primary-color)" }}
            >
              Admin Dashboard
            </h1>
            <Link href="/admin">
              <div
                className="inline-block px-4 py-2 rounded-md text-sm font-medium shadow-md"
                style={{ backgroundColor: "var(--background-color)" }}
              >
                Back to Dashboard
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Events Management</h2>
          <button
            onClick={handleAddEvent}
            className="px-4 py-2 rounded-md text-sm font-medium shadow-md"
            style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            Add New Event
          </button>
        </div>

        {/* Event Form */}
        {showForm && (
          <div
            className="mb-8 p-6 rounded-lg shadow-lg animated-element"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Event" : "Add New Event"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={currentEvent.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={currentEvent.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Short Description
                  </label>
                  <textarea
                    name="description"
                    value={currentEvent.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  ></textarea>
                </div>

                {/* Full Content */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Full Content (HTML supported)
                  </label>
                  <textarea
                    name="fullContent"
                    value={currentEvent.fullContent}
                    onChange={handleInputChange}
                    rows="8"
                    className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                  ></textarea>
                </div>

                {/* YouTube Video ID */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    YouTube Video ID
                  </label>
                  <input
                    type="text"
                    name="videoId"
                    value={currentEvent.videoId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g. dQw4w9WgXcQ"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={currentEvent.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Event Images
                  </label>
                  <div className="flex items-center space-x-2">
                    <label
                      className="px-4 py-2 rounded-md cursor-pointer text-sm font-medium"
                      style={{
                        backgroundColor: "var(--secondary-color)",
                        color: "white",
                      }}
                    >
                      <span>Select Files</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                    <span className="text-sm">{uploadMessage}</span>
                  </div>
                </div>

                {/* Current Images (when editing) */}
                {isEditing &&
                  currentEvent.images &&
                  currentEvent.images.length > 0 && (
                    <div className="md:col-span-2 mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Current Images
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {currentEvent.images.map((image, index) => (
                          <div
                            key={index}
                            className="rounded-lg overflow-hidden h-24"
                          >
                            <img
                              src={image}
                              alt={`Event image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Form Buttons */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md text-sm font-medium"
                  style={{ backgroundColor: "var(--background-color)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-sm font-medium"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                  }}
                >
                  {isEditing ? "Update Event" : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{event.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor:
                          event.status === "published"
                            ? "rgba(0, 180, 216, 0.2)"
                            : "rgba(239, 35, 60, 0.2)",
                        color:
                          event.status === "published"
                            ? "var(--primary-color)"
                            : "var(--secondary-color)",
                      }}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="px-3 py-1 text-xs rounded"
                        style={{ backgroundColor: "var(--accent-color)" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="px-3 py-1 text-xs rounded"
                        style={{
                          backgroundColor: "var(--secondary-color)",
                          color: "white",
                        }}
                      >
                        Delete
                      </button>
                      {event.status === "draft" ? (
                        <button
                          onClick={() =>
                            handleChangeStatus(event.id, "published")
                          }
                          className="px-3 py-1 text-xs rounded"
                          style={{
                            backgroundColor: "var(--primary-color)",
                            color: "white",
                          }}
                        >
                          Publish
                        </button>
                      ) : (
                        <button
                          onClick={() => handleChangeStatus(event.id, "draft")}
                          className="px-3 py-1 text-xs rounded"
                          style={{ backgroundColor: "var(--background-color)" }}
                        >
                          Unpublish
                        </button>
                      )}
                      <Link href={`/events/${event.id}`} target="_blank">
                        <div
                          className="px-3 py-1 text-xs rounded flex items-center"
                          style={{ backgroundColor: "var(--accent-color)" }}
                        >
                          Preview
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
