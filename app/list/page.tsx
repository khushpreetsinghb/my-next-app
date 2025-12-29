"use client";
import TodoCards from "@/components/todos/TodoCards";

export default function ListPage() {
    return (
        <main>
            <h1 className="text-3xl font-bold text-center">Todo List</h1>
            <div className="container mx-auto px-4">
                <TodoCards />
            </div>
        </main>
    );
}
