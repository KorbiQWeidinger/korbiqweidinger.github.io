import GradualSpacing from "./components/ui/gradual-spacing";
import Iphone15Pro from "./components/ui/iphone-15-pro";
import Safari from "./components/ui/safari";

function App() {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center w-screen my-40">
      <GradualSpacing
        className="font-display text-center text-4xl font-bold -tracking-widest  text-black dark:text-white md:text-7xl md:leading-[5rem]"
        text="Coming Soon"
      />
      <div className="flex flex-row items-center space-x-20 max-h-screen">
        <Safari
          url="https://www.zumgoldenenkalb.de"
          className="max-h-[600px]"
        />
        <Iphone15Pro
          url="https://www.zumgoldenenkalb.de"
          className="max-h-[550px]"
        />
      </div>
    </div>
  );
}

export default App;
