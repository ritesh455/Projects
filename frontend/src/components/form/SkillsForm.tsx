import React, { useState } from "react";
import { useResumeData } from "../../context/ResumeContext";

export default function SkillsForm() {
  const { resume, setResume, loading } = useResumeData();
  const [input, setInput] = useState("");

  if (loading) {
    return <p className="text-sm text-gray-500">Loading skills...</p>;
  }

  const skills: string[] = resume?.skills || [];

  const addSkill = (skill: string) => {
    setResume((prev: any) => ({
      ...prev,
      skills: [...(prev?.skills || []), skill],
    }));
  };

  const removeSkill = (index: number) => {
    setResume((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleAdd = (val?: string) => {
    const raw = (val ?? input).trim();
    if (!raw) return;

    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((s) => addSkill(s));

    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">Skills</h2>

      <div className="flex gap-2 flex-wrap mb-3">
        {skills.map((s: string, i: number) => (
          <div
            key={i}
            className="px-3 py-1 bg-gray-100 rounded-full border flex items-center gap-2"
          >
            <span>{s}</span>
            <button
              onClick={() => removeSkill(i)}
              className="text-sm text-red-500"
              aria-label={`Remove ${s}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border w-full p-2 rounded"
          placeholder="Add a skill and press Enter or comma"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={() => handleAdd()}
          className="px-3 py-2 border rounded bg-gray-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
