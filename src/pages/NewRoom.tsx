import { Link } from "react-router-dom";
// import { useContext } from "react";

import illustrationsImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss";

import { Button } from "../components/Button";

// import { AuthContext } from "../contexts/AuthContext";

export const NewRoom = () => {
  // const { user } = useContext(AuthContext);

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationsImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire duvídas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <h2>Criar um nova sala</h2>
          <form action="POST">
            <input type="text" placeholder="Nome da sala" />
            <Button>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala que já existe?{" "}
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
