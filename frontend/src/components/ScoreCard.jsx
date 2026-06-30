export default function ScoreCard({ feedback }) {
  if (!feedback) return null;

  return (
    <div className="score-card">

      <div className="score-header">
        <h3 className="score-title">
          AI Evaluation
        </h3>

        <div className="score-badge">
          {feedback.score ?? 0}/10
        </div>
      </div>

      <div className="score-body">

        <div className="score-section">
          <h4>Feedback</h4>
          <p>{feedback.feedback}</p>
        </div>

        <div className="score-section">
          <h4>Ideal Answer</h4>
          <p>{feedback.idealAnswer}</p>
        </div>

      </div>

    </div>
  );
}