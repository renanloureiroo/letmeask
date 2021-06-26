import { useHistory, useParams } from "react-router-dom";

import { useRoom } from "../hooks/useRom";

import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Pergunta } from "../components/Pergunta/Pergunta";

import "../styles/room.scss";
import "../styles/pergunta.scss";
import logoImg from "../assets/images/logo.svg";
import deleteIgm from "../assets/images/delete.svg";
import checkIgm from "../assets/images/check.svg";
import answerIgm from "../assets/images/answer.svg";

type RoomParams = {
  id: string;
};

export const RoomAdmin = () => {
  const history = useHistory();
  const params = useParams<RoomParams>();

  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighLight: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined={true} onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          <span>{questions.length} perguntas</span>
        </div>

        <div className="questions">
          {questions &&
            questions.map((question) => (
              <Pergunta
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkIgm}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerIgm} alt="Dar destaque" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteIgm} alt="Remover pergunta" />
                </button>
              </Pergunta>
            ))}
        </div>
      </main>
    </div>
  );
};
