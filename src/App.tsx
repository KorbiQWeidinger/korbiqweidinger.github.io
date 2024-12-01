import GradualSpacing from "./components/ui/gradual-spacing";

function App() {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center h-screen w-screen">
      <GradualSpacing
        className="font-display text-center text-4xl font-bold -tracking-widest  text-black dark:text-white md:text-7xl md:leading-[5rem]"
        text="Coming Soon"
      />
    </div>
  );
}

export default App;
