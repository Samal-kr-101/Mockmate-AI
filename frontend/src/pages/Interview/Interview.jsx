import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  generateQuestions,
  startInterview,
  submitAnswer,
} from "../../services/interviewService";

import QuestionCard from "../../components/QuestionCard";
import ScoreCard from "../../components/ScoreCard";

export default function Interview() {

  const [searchParams] =
    useSearchParams();

  const navigate =
    useNavigate();

  const interviewId =
    searchParams.get("id");

  const [question, setQuestion] =
    useState(null);

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [listening, setListening] =
    useState(false);

  const [recognition, setRecognition] =
    useState(null);

    const [currentQuestion, setCurrentQuestion] =
useState(1);

const [totalQuestions, setTotalQuestions] =
useState(0);

  // ==========================
  // Speech Recognition Setup
  // ==========================
useEffect(() => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    console.log(
      "Speech Recognition not supported"
    );

    return;
  }

  const recognitionInstance =
    new SpeechRecognition();

  recognitionInstance.continuous = true;
  recognitionInstance.interimResults = false;
  recognitionInstance.maxAlternatives = 1;
  recognitionInstance.lang = "en-US";

  recognitionInstance.onstart = () => {
    console.log("🎤 Listening...");
    setListening(true);
  };

  recognitionInstance.onaudiostart = () => {
    console.log("🎧 Audio started");
  };

  recognitionInstance.onsoundstart = () => {
    console.log("🔊 Sound detected");
  };

  recognitionInstance.onspeechstart = () => {
    console.log("🗣 Speech detected");
  };

  // recognitionInstance.onresult = (event) => {

  //   console.log("RESULT:", event);

  //   let transcript = "";

  //   for (
  //     let i = 0;
  //     i < event.results.length;
  //     i++
  //   ) {
  //     transcript +=
  //       event.results[i][0]
  //         .transcript;
  //   }

  //   console.log(
  //     "TRANSCRIPT:",
  //     transcript
  //   );

  //   setAnswer(transcript);
  // };


  recognitionInstance.interimResults = false;

//   recognitionInstance.onresult = (event) => {

//   let transcript = "";

//   for (
//     let i = event.resultIndex;
//     i < event.results.length;
//     i++
//   ) {

//     transcript +=
//       event.results[i][0].transcript + " ";
//   }

//   setAnswer(prev => prev + transcript);
// };



recognitionInstance.onresult = (event) => {
  let transcript = "";

  for (
    let i = event.resultIndex;
    i < event.results.length;
    i++
  ) {
    transcript += event.results[i][0].transcript + " ";
  }

  setAnswer(prev =>
    (prev + transcript)
      .replace(/\s+/g, " ")
      .trim()
  );
};

  recognitionInstance.onerror =
    (event) => {

      console.log(
        "ERROR:",
        event.error
      );

      setListening(false);
    };

  recognitionInstance.onend =
    () => {

      console.log(
        "🛑 Recognition ended"
      );

      setListening(false);
    };

  setRecognition(
    recognitionInstance
  );

}, []);

  // ==========================
  // Initialize Interview
  // ==========================
  useEffect(() => {

    if (interviewId) {
      initializeInterview();
    }

  }, [interviewId]);



// ==========================
// Text To Speech
// ==========================
const speakQuestion = (text) => {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};


  // ==========================
  // Start Interview
  // ==========================
  const initializeInterview =
    async () => {

      try {

        await generateQuestions(
          interviewId
        );

        const session =
          await startInterview(
            interviewId
          );

        setQuestion(session.question);

setCurrentQuestion(session.currentQuestion);

setTotalQuestions(session.totalQuestions);

        speakQuestion(
          session.question.question
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }
    };

  // ==========================
  // Voice Controls
  // ==========================


const startListening = () => {
  if (!recognition || listening) return;

  window.speechSynthesis.cancel();

  setAnswer("");

  recognition.start();
};

  const stopListening = () => {
  if (!recognition || !listening) return;

  recognition.stop();
};

  // ==========================
  // Submit Answer
  // ==========================
  const handleSubmit =
    async () => {

      try {

        if (!answer.trim()) {
          toast.error("Please provide an answer");
          return;
        }

        const result =
          await submitAnswer({
            interviewId,
            questionId:
              question._id,
            answer,
          });

        setFeedback(
          result.evaluation
        );

        if (
          result.completed
        ) {

          setTimeout(() => {

            navigate(
              `/report?id=${interviewId}`
            );

          }, 3000);

          return;
        }

        setTimeout(() => {


          setCurrentQuestion(
  result.currentQuestion
);

setTotalQuestions(
  result.totalQuestions
);
          stopListening();

setQuestion(result.nextQuestion);

setAnswer("");

setFeedback(null);

speakQuestion(result.nextQuestion.question);

        }, 5000);

      } catch (error) {

        console.error(
          "Submit Error:",
          error
        );

      }
    };

  // ==========================
  // Loading
  // ==========================
  if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2>🎤 Preparing Your AI Interview...</h2>
      <p>Please wait while we generate your interview questions.</p>
    </div>
  );
}

  if (!question) {

    return (
      <h2>
        No Question Found
      </h2>
    );
  }

  // ==========================
  // UI
  // ==========================
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
      }}
    >


      <div
  style={{
    marginBottom: "25px",
  }}
>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#fff",
      fontSize: "18px",
    }}
  >
    <span>
      Question {currentQuestion} / {totalQuestions}
    </span>

    <span>
      {Math.round(
        (currentQuestion /
          totalQuestions) *
          100
      )}
      %
    </span>
  </div>

  <div
    style={{
      width: "100%",
      height: "12px",
      background: "#2d3748",
      borderRadius: "10px",
      overflow: "hidden",
    }}
  >

    <div
      style={{
        width: `${
          (currentQuestion /
            totalQuestions) *
          100
        }%`,
        height: "100%",
        background:
          "linear-gradient(90deg,#00d4ff,#00ff95)",
        transition:
          "all .5s ease",
      }}
    />

  </div>

</div>

      <QuestionCard
        question={
          question.question
        }
      />

      <div
      className="button-container"
        style={{
          marginBottom: "15px",
        }}
      >

        {!listening ? (

          <button
            className="record-btn"
            onClick={startListening}
          >
            🎤 Start Recording
          </button>

        ) : (

          <button
            className="stop-btn"
            onClick={
              stopListening
            }
          >
            ⏹ Stop Recording
          </button>

        )}

      </div>

      <textarea
        className="answer-textarea"
        rows="8"
        value={answer}
        onChange={(e) =>
          setAnswer(
            e.target.value
          )
        }
        placeholder="Your answer..."
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
        }}
      />

     <div className="transcript-box">
    <strong>Transcript:</strong>
    <p>{answer}</p>
  </div>

      <button
        className="submit-btn"
        onClick={
          handleSubmit
        }
      >
        Submit Answer
      </button>

      <ScoreCard
        feedback={
          feedback
        }
      />

    </div>
  );
}

