export default function InterviewCard({ interview, navigate }) {
  return (
    <div className="interview-card">

      <div className="card-header">
        <h3 className="card-title">
          {interview.selectedRole}
        </h3>

        <span className={`badge ${interview.difficulty?.toLowerCase()}`}>
          {interview.difficulty}
        </span>
      </div>

      <div className="card-body">
        <p>
          <span>Questions:</span> {interview.totalQuestions}
        </p>

        <p>
          <span>Score:</span> {interview.totalScore ?? 0}
        </p>

        <p>
          <span>Status:</span> {interview.status ?? "pending"}
        </p>
      </div>

      <button
        className="report-btn"
        onClick={() =>
          navigate(`/report?id=${interview._id}`)
        }
      >
        View Report
      </button>

    </div>
  );
}