"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const { task } = useParams();
  return (
    <>
      <h1>Task: {task}</h1>
      <p>Task ID: {task}</p>
      <p>Task Details: {task.title}</p>
      <button onClick={() => alert("Task action triggered!")}>
        Perform Task Action
      </button>
    </>
  );
}
