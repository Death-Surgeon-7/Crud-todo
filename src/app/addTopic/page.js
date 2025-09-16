"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !description){
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/topics`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if(res.ok){
        router.push("/");
      } else {
        alert("Failed to add topic");
      }
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-400 rounded px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-400 rounded px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />
      <button 
        type="submit"
        className=" bg-blue-500 text-white px-4 py-2 rounded w-fit">
        Add Topic
      </button>
    </form>
  );
}
