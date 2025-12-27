import TodoCards from "@/components/todos/TodoCards";
import Navbar from "@/components/ReusableComponents/Navbar";

export default function ListPage() {
    return (
        <>
            <Navbar />
            <main className="bg-gray-50">
                <h1 className="text-3xl font-bold text-center py-6">
                    Todo List
                </h1>
                <TodoCards />
            </main>
        </>
    );
}
