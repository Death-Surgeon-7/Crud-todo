"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({id , title, description}) {
  
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => { 
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
      router.refresh();
      router.push("/");
    } catch (eroor) {
      console.log("error updating topic", error);
    }
  }
  
  return (
    <form
      onSubmit={handleSubmit} 
      className="flex flex-col gap-3 p-4">
      <input
        onChange={(e)=> setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-400 rounded px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e)=> setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-400 rounded px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />
      <button 
        
        className=" bg-blue-500 text-white px-4 py-2 rounded w-fit">
        Edit Topic
      </button>
    </form>
  );
}
