import { useParams } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import "../styles/room.scss";
import logoImg from "../assets/images/logo.svg";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLight: boolean;
  }
>;

type Questions = {
  author: {
    name: string;
    avatar: string;
  };
  id: string;
  content: string;
  isAnswered: boolean;
  isHighLight: boolean;
};

type RoomParams = {
  id: string;
};

export const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");

  const roomId = params.id;

  async function handleSendQuest(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLight: false,
      isAnswered: false,
    };

    await database.ref(`/rooms/${roomId}/questions`).push(question);
    setNewQuestion("");
  }

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLight: value.isHighLight,
            isAnswered: value.isAnswered,
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          <span>{questions.length} perguntas</span>
        </div>
        <form onSubmit={handleSendQuest}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <div className="user-avatar">
                  <img src={user.avatar} alt="Foto do usuário" />
                </div>
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login.</button>
              </span>
            )}
            <Button disabled={!user} type="submit">
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div></div>
      </main>
    </div>
  );
};