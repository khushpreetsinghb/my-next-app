import ServerComponentExample from "@/components/basics/ServerComponentExample";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Next.js</h1>
      
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <ServerComponentExample />
        </div>
      </div>
    </main>
  );
}
