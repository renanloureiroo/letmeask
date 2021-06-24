import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import illustrationsImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useState, FormEvent } from "react";
import { database } from "../services/firebase";

export const Home = () => {
  const history = useHistory();

  const [roomCode, setRoomCode] = useState("");

  const { user, signInWithGoogle } = useAuth();

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Sala não existe");
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

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

          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
