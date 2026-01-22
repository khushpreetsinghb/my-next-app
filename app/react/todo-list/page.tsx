"use client";
import TodoCards from "@/components/todos/TodoCards";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TodoListPage() {
  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/react"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to React Examples
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-8">Todo List with API Data</h1>
        <TodoCards />
      </div>
    </main>
  );
}
