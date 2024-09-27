import AnswersItem from "./AnswersItem";

// eslint-disable-next-line react/prop-types
export default function AnswersList({ answersList, onAnswerSelect }) {

  return (
    <ul>
      {/* eslint-disable-next-line react/prop-types */}
      {answersList.map((answerItem, i) => (
        <AnswersItem answerItem={answerItem} key={i} onAnswerSelect={onAnswerSelect}/>
      ))}
    </ul>
  );
}
