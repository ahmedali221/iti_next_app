"use server";

export async function fetchTodos() {
  try {
    const res = await fetch("http://localhost:3000/api/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data.data || [];
  } catch (err) {
    throw new Error(err.message);
  }
}
