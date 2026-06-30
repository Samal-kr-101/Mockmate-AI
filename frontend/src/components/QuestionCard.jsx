export default function QuestionCard({ question, index }) {
  return (
    <div className="question-card-premium">

      <div className="qc-header">
        <span className="qc-badge">
          Question {typeof index === "number" ? index + 1 : ""}
        </span>
      </div>

      <p className="qc-text">
        {question}
      </p>

    </div>
  );
}