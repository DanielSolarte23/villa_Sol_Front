import NavBar from "./components/Header";

export default function Home() {
  return (
    <div className="bg-white h-screen w-full">
      <NavBar />
      <main className="h-[85%] w-full flex flex-col justify-center items-center text-6xl">
        <h1 className="text-green-700">Bienvenido</h1>
        <p>Conjunto residencial Villa del sol</p>
      </main>
    </div>
  );
}
