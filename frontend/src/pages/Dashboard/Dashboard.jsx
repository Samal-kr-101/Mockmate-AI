import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createInterview,
  getMyInterviews,
} from "../../services/interviewService";



import StatsCard from "../../components/StatsCard";
import InterviewCard from "../../components/InterviewCard";
import Navbar from "../../components/Navbar";

import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const scrollToCreate = () => {
  const section = document.getElementById("create-interview");



  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  const [interviews, setInterviews] = useState([]);

  const [showAll, setShowAll] = useState(false);


  const [form, setForm] = useState({
    selectedRole: "",
    difficulty: "easy",
    totalQuestions: 5,
  });

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const data = await getMyInterviews();
      setInterviews(data);
    } catch (err) {
      console.log(err);
    }
  };

const handleCreate = async () => {
  if (!form.selectedRole.trim()) {
    // alert("Please enter a role");
    toast.error("Please enter a role");
    return;
  }

  try {
    const interview = await createInterview(form);
    if (interview?._id) {
      navigate(`/interview?id=${interview._id}`);
    }
  } catch (error) {
    console.error(error);
  }
};

   const visibleInterviews = showAll
  ? interviews
  : interviews.slice(0, 5);

  const completed = interviews.filter(
    (i) => i.isCompleted
  ).length;

  const avgScore =
    interviews.length === 0
      ? 0
      : Math.round(
          interviews.reduce(
            (a, b) => a + b.totalScore,
            0
          ) / interviews.length
        );

  const best =
    interviews.length === 0
      ? 0
      : Math.max(...interviews.map((i) => i.totalScore));

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="hero">

          <div className="hero-title">

            <h1>AI Interview Dashboard</h1>

            <p>
              Train with AI-driven interviews, get scored instantly, and improve with every attempt.
            </p>

          </div>

<button
  className="primary-btn"
  onClick={(e) => {
    scrollToCreate();

    // only run create if needed
    handleCreate(e);
  }}
>
  + New Interview
</button>

        </div>

        <div className="stats-grid">

          <StatsCard
            title="Total Interviews"
            value={interviews.length}
          />

          <StatsCard
            title="Completed"
            value={completed}
          />

          <StatsCard
            title="Average Score"
            value={`${avgScore}%`}
          />

          <StatsCard
            title="Best Score"
            value={`${best}%`}
          />

        </div>

        <div className="create-card" id="create-interview">

          <h2>Create New Interview</h2>

          <div className="input-group">

  <label className="input-label">Role</label>

    
  <input
    className="dashboard-input"
    type="text"
    placeholder="Backend Developer"
    value={form.selectedRole}
    onChange={(e) =>
      setForm({
        ...form,
        selectedRole: e.target.value,
      })
    }
    required
  />

  <small className="input-hint">
    Example: Full Stack Developer, Data Analyst, AI Engineer, HR Interview, DSA
  </small>

</div>
          <select
            className="dashboard-input"
            onChange={(e) =>
              setForm({
                ...form,
                difficulty: e.target.value,
              })
            }
          >
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>

          <button
            className="primary-btn full"
            onClick={handleCreate}
            
          >
            Start AI Interview
          </button>
            
        </div>
        
        

        <div className="recent">

          <h2>Recent Interviews</h2>

          {/* {interviews.map((interview) => (
            <InterviewCard
              key={interview._id}
              interview={interview}
              navigate={navigate}
            />
          ))} */}

         
  <div className="interview-grid">
  {visibleInterviews.map((item) => (
  <InterviewCard
    key={item._id}
    interview={item}
    navigate={navigate}
  />
))}
</div>

<button
  className="view-more-btn"
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "Show Less" : "View More"}
</button>

        </div>

      </div>
    </>
  );
}