import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameBanner } from "./componentes/GameBanner";
import "./styles/main.css";
import logoImg from "./assets/Logo.svg";
import { CreateAdBanner } from "./componentes/CreateAdBanner";
import { GameController } from "phosphor-react";
import { Input } from "./componentes/Form/Input";
import axios from "axios";
import { CreateAdModal } from "./componentes/Form/CreateAdModal";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]); //essa variavel games é um array de um objeto com a interface

  useEffect(() => {
   axios("http://localhost:3333/games")
   .then(response => {
    setGames(response.data)
   })
  }, [])

  return (
    <div className="max-w-[1344px] max-auto flex flex-col items-center m-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-gradient bg-clip-text">duo</span>{" "}
        está aqui!
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-20">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
