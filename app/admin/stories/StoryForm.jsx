"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';


// This schema is for client-side validation
const storySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  content: z.string().min(20, "Content must be at least 20 characters long"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  category: z.string().optional(),
  videoId: z.string().optional(),
  images: z.array(z.object({
    url: z.string().url(),
    caption: z.string().optional(),
  })).max(6).default([]),
});

const Tiptap = ({ value, onChange, onBlur }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false, // Explicitly prevent SSR
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onBlur,
    editorProps: {
      attributes: {
        class: 'prose max-w-none border border-gray-300 rounded-md p-3 min-h-[200px] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
        style: 'background-color: var(--background-color); color: var(--text-color);'
      },
    },
  });

  return <EditorContent editor={editor} />;
};


export default function StoryForm({ story }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: story?.title || "",
      description: story?.description || "",
      content: story?.content || "",
      date: story ? new Date(story.date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
      category: story?.category || "",
      videoId: story?.videoId || "",
      images: story?.images || [],
    },
  });

  const contentValue = watch("content");
  const imagesValue = watch("images");

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (imagesValue.length + files.length > 6) {
      alert("You can only upload a maximum of 6 images.");
      return;
    }
    
    setIsUploading(true);
    
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error(`Failed to upload ${file.name}`);
        
        const { url } = await res.json();
        
        setValue("images", [...imagesValue, { url, caption: '' }], { shouldValidate: true, shouldDirty: true });

      } catch (error) {
        alert(error.message);
      }
    }
    setIsUploading(false);
  };

  const handleRemoveImage = (urlToRemove) => {
    setValue("images", imagesValue.filter(img => img.url !== urlToRemove), { shouldValidate: true, shouldDirty: true });
  };
  
  const handleCaptionChange = (url, caption) => {
    setValue("images", imagesValue.map(img => img.url === url ? { ...img, caption } : img), { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, date: new Date(data.date).toISOString() };
      const response = await fetch(
        story ? `/api/stories/${story.id}` : "/api/stories",
        {
          method: story ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save story");
      }
      
      alert(`Story successfully ${story ? 'updated' : 'created'}!`);
      router.push("/admin/stories");
      router.refresh();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 rounded-lg shadow-lg" style={{ backgroundColor: "var(--background-color)" }}>
      <div>
        <label htmlFor="title" className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>Title</label>
        <input {...register("title")} id="title" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>Description (Short Summary)</label>
        <textarea {...register("description")} id="description" rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}></textarea>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

       <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1" style={{ color: "var(--text-color)" }}>Full Content</label>
        <Tiptap 
          value={contentValue}
          onChange={value => setValue("content", value, { shouldValidate: true, shouldDirty: true })}
          onBlur={() => {}}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>Date</label>
          <input {...register("date")} id="date" type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>Category</label>
          <input {...register("category")} id="category" placeholder="e.g., Academic, Sports" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>
      </div>

      <div>
          <label htmlFor="videoId" className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>YouTube Video ID</label>
          <input {...register("videoId")} id="videoId" placeholder="e.g., lhQG2xpyJS4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
          {errors.videoId && <p className="text-red-500 text-sm mt-1">{errors.videoId.message}</p>}
      </div>

      {/* --- Integrated Image Uploader --- */}
      <div>
        <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text-color)" }}>Images (Max 6)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {imagesValue?.map((image, index) => (
            <div key={index} className="relative group border rounded-lg p-2">
              <img src={image.url} alt={`Upload preview ${index}`} className="w-full h-24 object-cover rounded-md" />
              <input
                type="text"
                placeholder="Caption (optional)"
                defaultValue={image.caption || ''}
                onBlur={(e) => handleCaptionChange(image.url, e.target.value)}
                className="mt-2 text-xs w-full border-gray-300 rounded"
                style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(image.url)}
                className="absolute top-0 right-0 m-1 bg-red-500 text-white rounded-full p-1 opacity-75 group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {(imagesValue?.length || 0) < 6 && (
            <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 p-4" style={{ borderColor: "var(--accent-color)"}}>
                <Upload className="text-gray-400" />
                <span className="text-sm text-gray-500">{isUploading ? <Loader className="animate-spin" /> : 'Upload'}</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
            </label>
          )}
        </div>
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
      </div>
      {/* --- End Integrated Image Uploader --- */}


      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50" style={{ color: "var(--text-color)" }}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          {isSubmitting || isUploading ? "Saving..." : "Save Story"}
        </button>
      </div>
    </form>
  );
}
