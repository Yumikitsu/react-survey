// Components don't need to be separeted into individual files
// Here we have a smaller component that helps compose the AnswersItem below

{ /* eslint-disable-next-line react/prop-types */ }
function ItemsList({ list }) {
  return (
    <ul>
      { /* eslint-disable-next-line react/prop-types */ }
      {list.map(([key, value]) => (
        value !== '' && <li key={key}>{value}</li>
      ))}
    </ul>
  );
}

// This is the main component being exported from this file
export default function AnswersItem({
  // Feel free to change this props names to what suits you best
  // Rememeber here we're destructuring answerItem, which is the prop name that we've passed
  // eslint-disable-next-line react/prop-types
  answerItem: { id, consistency, color, logo, bestFeatures, worstFeatures, spendTime, review, username }, onAnswerSelect
}) {
  return (
    <li>
      <article className="answer">
        <button className="answer-edit" onClick={() => onAnswerSelect(id, false)}>Edit</button>
        <button className="answer-delete" onClick={() => onAnswerSelect(id, true)}>Delete</button>
        <h3>{username || "Anon"} said:</h3>
        <p>
          <em>How do you rate your rubber duck consistency?</em>
          <span className="answer__line">{consistency}</span>
        </p>
        <p>
          <em>How do you rate your rubber duck colour?</em>
          <span className="answer__line">{color}</span>
        </p>
        <p>
          <em>How do you rate your rubber duck logo?</em>
          <span className="answer__line">{logo}</span>
        </p>
        <p><em>What would you say are the best features of your rubber duck?</em></p>
        <ItemsList list={Object.entries(bestFeatures)} />

        <p><em>What would you say are the worst features of your rubber duck?</em></p>
        <ItemsList list={Object.entries(worstFeatures)} />

        <p><em>How do you like to spend time with your rubber duck?</em></p>
        <ItemsList list={Object.entries(spendTime)} />

        <p>
          <em>What else have you got to say about your rubber duck?</em>
          <span className="answer__line">{review}</span>
        </p>
      </article>
    </li>
  );
}
