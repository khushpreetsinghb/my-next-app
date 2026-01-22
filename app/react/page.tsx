import Count from "@/components/basics/Count";
import UserCard from "@/components/basics/UserCard";
import TodoList from "@/components/basics/TodoList";
import LiftingStateUp from "@/components/basics/LiftingStateUp";
import UseMemoExample from "@/components/hooks/UseMemoExample";
import UseCallbackExample from "@/components/hooks/UseCallbackExample";
import UseReducerExample from "@/components/hooks/UseReducerExample";
import ReactMemoExample from "@/components/hooks/ReactMemoExample";
import Link from "next/link";

export default function ReactPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to React JS</h1>
      
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Count />
          </div>
          <div className="md:col-span-1">
            <UserCard name="John Doe" email="john@example.com" role="Admin" avatar='./assets/istockphoto-1220827245-612x612.jpg' />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <TodoList />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <LiftingStateUp />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <UseMemoExample />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <UseCallbackExample />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <UseReducerExample />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <ReactMemoExample />
          </div>
        </div>
        
        {/* Todo List Link Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">More Examples</h2>
          <div className="bg-gray-50 p-6 rounded-lg inline-block">
            <h3 className="text-lg font-semibold mb-3">Todo List with API Data</h3>
            <p className="text-gray-600 mb-4">See a complete example of fetching and displaying data from an API with pagination.</p>
            <Link 
              href="/react/todo-list"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              View Todo List Example
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
