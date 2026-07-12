import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getReport } from "../../services/interviewService";
import QuestionCard from "../../components/QuestionCard";
import "./Report.css";

export default function Report() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const interviewId = searchParams.get("id");

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!interviewId) return;
    fetchReport();
  }, [interviewId]);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const res = await getReport(interviewId);
      const data = res?.data?.report || res?.data || res;

      setReport(data);

    } catch (err) {
      console.error(err);
      setReport(null);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="report-loading">
        Loading Report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="report-empty">
        No Report Found
      </div>
    );
  }

  return (
    <div className="report-page">

      <div className="report-header">

        <div className="report-topbar">
          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>
        </div>

        <h1 className="report-title">
          Interview Report
        </h1>

        <div className="report-meta">
          <span className="meta-item">
            Role: {report.selectedRole}
          </span>

          <span className="meta-item">
            Difficulty: {report.difficulty}
          </span>
        </div>

      </div>

      {/* Stats */}

      <div className="report-stats">

        <div className="stat-card">
          <h3>Total Score</h3>
          <p>{report.totalScore}</p>
        </div>

        <div className="stat-card">
          <h3>Total Questions</h3>
          <p>{report.questions.length}</p>
        </div>

        <div className="stat-card">
          <h3>Questions Answered</h3>
          <p>
            {
              report.questions.filter(
                q => q.candidateAnswer?.trim()
              ).length
            }
          </p>
        </div>

        <div className="stat-card">
          <h3>Average Score</h3>
          <p>
            {
              report.questions.length
                ? (
                    report.totalScore /
                    report.questions.length
                  ).toFixed(1)
                : 0
            }
          </p>
        </div>

      </div>

      {/* Questions */}

      <div className="question-list">

        {report.questions.map((q, index) => (
          <QuestionCard
            key={q._id}
            index={index}
            question={q.question}
            answer={q.candidateAnswer}
            feedback={q.feedback}
            score={q.score}
          />
        ))}

      </div>

    </div>
  );
}