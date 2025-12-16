import StoryForm from "../StoryForm";

export default function NewStoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--primary-color)" }}>
        Create New Story
      </h1>
      <StoryForm />
    </div>
  );
}
