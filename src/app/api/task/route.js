import { NextResponse } from "next/server";

let tasks = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    completed: false,
  },
];

export async function GET() {
  return NextResponse.json({ message: "Hello World", data: tasks });
}

export async function POST(request) {
  const newTask = await request.json();
  tasks.push(newTask);
  return NextResponse.json({
    message: "Task added successfully",
    data: newTask,
  });
}

export async function PUT(request) {
  const existingTask = await request.json();
  tasks = tasks.map((task) => {
    if (task.id === existingTask.id) {
      task.title = existingTask.title;
      task.completed = existingTask.completed;
    }
    return task;
  });

  return NextResponse.json({
    message: "task updated ",
  });
}

export async function DELETE(request) {
  const { id } = await request.json();
  tasks = tasks.filter((task) => task.id !== id);

  return NextResponse.json({
    message: "task deleted ",
  });
}
