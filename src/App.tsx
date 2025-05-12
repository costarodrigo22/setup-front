import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";

function App() {
  return (
    <div className="w-40 mt-10 flex flex-col">
      <Button className="cursor-pointer font-bold">botão...</Button>

      <Input className="mt-10" placeholder="input" />
    </div>
  );
}

export default App;
