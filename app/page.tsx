import MuiNavbar from "@/components/MuiNavbar";
import Count from "@/components/Count";
import UserCard from "@/components/UserCard";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main>
      <MuiNavbar />
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Next.js</h1>
      <div className="container mx-auto px-4">
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
        </div>
      </div>
    </main>
  );
}
