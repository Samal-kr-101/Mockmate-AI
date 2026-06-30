import api from "./api";

/* =========================
   CREATE INTERVIEW
========================= */
export const createInterview = async (data) => {
  const res = await api.post("/interviews/create", data);
  return res.data;
};

/* =========================
   GET MY INTERVIEWS (HISTORY)
========================= */
export const getMyInterviews = async () => {
  const res = await api.get("/interviews/my");
  return res.data;
};

/* =========================
   GET ALL INTERVIEWS (ADMIN / OPTIONAL)
   ⚠️ Only use if backend supports /interviews
========================= */
export const getAllInterviews = async () => {
  const res = await api.get("/interviews");
  return res.data;
};

/* =========================
   GENERATE QUESTIONS
========================= */
export const generateQuestions = async (id) => {
  const res = await api.post(
    `/interviews/${id}/generate-questions`
  );
  return res.data;
};

/* =========================
   START INTERVIEW
========================= */
export const startInterview = async (id) => {
  const res = await api.post(
    `/interviews/${id}/start`
  );
  return res.data;
};

/* =========================
   SUBMIT ANSWER
========================= */
export const submitAnswer = async (data) => {
  const res = await api.post(
    "/interviews/submit-answer",
    data
  );
  return res.data;
};

/* =========================
   GET REPORT
========================= */
export const getReport = async (id) => {
  const res = await api.get(
    `/interviews/${id}/report`
  );
  return res.data;
};


