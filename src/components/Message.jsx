export default function Message({question, answer}) {
  return(
    <div className="question-answer">
      <div className="question">
        <p>{question} :</p>
      </div>
      <div className="answer">
        <p>{answer}</p>
      </div>
    </div>
  )
}
