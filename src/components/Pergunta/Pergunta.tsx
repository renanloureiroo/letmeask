import { ReactNode } from "react";

type PerguntaProps = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
};

export const Pergunta = ({
  author,
  content,
  children,
  isAnswered = false,
  isHighLighted = false,
}: PerguntaProps) => {
  return (
    <div
      className={`question ${isAnswered ? "answered" : ""} 
          ${isHighLighted ? "highlighted" : ""}`}
    >
      <p>{content}</p>
      <div className="info-pergunta">
        <div className="author">
          <div className="avatar">
            <img src={author.avatar} alt="Foto de avatar do usuário" />
          </div>
          <span>{author.name}</span>
        </div>
        <div className="like">{children}</div>
      </div>
    </div>
  );
};
