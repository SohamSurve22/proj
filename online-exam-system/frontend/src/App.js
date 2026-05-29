import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  // QUICK EDIT FOR EXAM:
  // - Change API URL above if backend port changes.

  // ── Form States ──
  const [qForm, setQForm] = useState({
    question: "", option1: "", option2: "", option3: "", option4: "",
    correctAnswer: "option1", subject: "",
  });

  const [examForm, setExamForm] = useState({ studentName: "", subject: "" });

  // ── Data States ──
  const [questions, setQuestions] = useState([]);
  const [results,   setResults]   = useState([]);

  // ── Exam States ──
  const [examQuestions, setExamQuestions] = useState([]); // filtered by subject
  const [answers,       setAnswers]       = useState({}); // { questionId: "option2", ... }
  const [examStarted,   setExamStarted]   = useState(false);
  const [examResult,    setExamResult]    = useState(null); // score after submit

  // ── Fetch on load ──
  useEffect(() => {
    fetchQuestions();
    fetchResults();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API}/questions`);
      setQuestions(res.data);
    } catch (err) {
      alert("Could not fetch questions");
    }
  };

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${API}/results`);
      setResults(res.data);
    } catch (err) {
      alert("Could not fetch results");
    }
  };

  // ── DASHBOARD CALCULATIONS ──
  const totalQuestions   = questions.length;
  const totalStudents    = results.length;
  const highestScore     = results.length > 0 ? Math.max(...results.map((r) => r.score)) : 0;
  const avgScore =
    results.length > 0
      ? (results.reduce((s, r) => s + r.score, 0) / results.length).toFixed(1)
      : 0;

  // ── ADD QUESTION ──
  const addQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/question`, qForm);
      alert("Question added successfully!");
      setQForm({ question: "", option1: "", option2: "", option3: "", option4: "", correctAnswer: "option1", subject: "" });
      fetchQuestions();
    } catch (err) {
      alert("Could not add question");
    }
  };

  // ── START EXAM ──
  // Filters questions by subject entered in examForm
  const startExam = (e) => {
    e.preventDefault();
    if (!examForm.studentName.trim() || !examForm.subject.trim()) {
      alert("Enter student name and subject");
      return;
    }
    // QUICK EDIT FOR EXAM: change filter logic here if needed
    const filtered = questions.filter(
      (q) => q.subject.toLowerCase() === examForm.subject.toLowerCase()
    );
    if (filtered.length === 0) {
      alert("No questions found for this subject. Please add questions first.");
      return;
    }
    setExamQuestions(filtered);
    setAnswers({});
    setExamResult(null);
    setExamStarted(true);
  };

  // ── SUBMIT EXAM ──
  // Score = count of questions where selected answer === correctAnswer
  const submitExam = async () => {
    let score = 0;
    examQuestions.forEach((q) => {
      if (answers[q._id] && answers[q._id] === q.correctAnswer) {
        score++;
      }
    });

    try {
      await axios.post(`${API}/result`, {
        studentName:    examForm.studentName,
        subject:        examForm.subject,
        score,
        totalQuestions: examQuestions.length,
      });
      setExamResult({ score, total: examQuestions.length });
      setExamStarted(false);
      alert(`Exam submitted! Score: ${score} / ${examQuestions.length}`);
      setExamForm({ studentName: "", subject: "" });
      fetchResults();
    } catch (err) {
      alert("Could not submit exam");
    }
  };

  // ── REUSABLE CARD ──
  const card = (title, body) => (
    <div className="card">
      <h2>{title}</h2>
      {body}
    </div>
  );

  return (
    <div className="container">

      {/* ── HEADER ── */}
      <header className="header">
        <h1>Online Examination System</h1>
        <p>Mumbai University — Full Stack Development Practical</p>
      </header>

      {/* ════════════════════════ DASHBOARD ════════════════════════ */}
      {card(
        "📊 Dashboard",
        <div className="stats">
          <div className="stat-box">
            <span className="stat-num">{totalQuestions}</span>
            <span className="stat-label">Total Questions</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{totalStudents}</span>
            <span className="stat-label">Students Attended</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{highestScore}</span>
            <span className="stat-label">Highest Score</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{avgScore}</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      )}

      {/* ════════════════════════ ADD QUESTION ════════════════════════ */}
      {card(
        "➕ Add Question",
        <form onSubmit={addQuestion} className="grid">
          <input
            className="span2"
            placeholder="Question Text"
            value={qForm.question}
            onChange={(e) => setQForm({ ...qForm, question: e.target.value })}
            required
          />
          <input
            placeholder="Option 1"
            value={qForm.option1}
            onChange={(e) => setQForm({ ...qForm, option1: e.target.value })}
            required
          />
          <input
            placeholder="Option 2"
            value={qForm.option2}
            onChange={(e) => setQForm({ ...qForm, option2: e.target.value })}
            required
          />
          <input
            placeholder="Option 3"
            value={qForm.option3}
            onChange={(e) => setQForm({ ...qForm, option3: e.target.value })}
            required
          />
          <input
            placeholder="Option 4"
            value={qForm.option4}
            onChange={(e) => setQForm({ ...qForm, option4: e.target.value })}
            required
          />
          {/* QUICK EDIT FOR EXAM: change default correct answer below */}
          <select
            value={qForm.correctAnswer}
            onChange={(e) => setQForm({ ...qForm, correctAnswer: e.target.value })}
          >
            <option value="option1">Correct: Option 1</option>
            <option value="option2">Correct: Option 2</option>
            <option value="option3">Correct: Option 3</option>
            <option value="option4">Correct: Option 4</option>
          </select>
          <input
            placeholder="Subject Name"
            value={qForm.subject}
            onChange={(e) => setQForm({ ...qForm, subject: e.target.value })}
            required
          />
          <button type="submit">Add Question</button>
        </form>
      )}

      {/* ════════════════════════ ATTEND EXAM ════════════════════════ */}
      {card(
        "📝 Attend Exam",
        <>
          {/* Step 1: Enter name + subject → start exam */}
          {!examStarted && !examResult && (
            <form onSubmit={startExam} className="grid">
              <input
                placeholder="Student Name"
                value={examForm.studentName}
                onChange={(e) => setExamForm({ ...examForm, studentName: e.target.value })}
                required
              />
              <input
                placeholder="Subject (must match exactly)"
                value={examForm.subject}
                onChange={(e) => setExamForm({ ...examForm, subject: e.target.value })}
                required
              />
              <button type="submit">Start Exam</button>
            </form>
          )}

          {/* Step 2: Exam in progress — show questions with radio options */}
          {examStarted && (
            <div className="exam-area">
              <p className="exam-info">
                Student: <strong>{examForm.studentName}</strong> &nbsp;|&nbsp;
                Subject: <strong>{examForm.subject}</strong> &nbsp;|&nbsp;
                Questions: <strong>{examQuestions.length}</strong>
              </p>

              {examQuestions.map((q, idx) => (
                <div key={q._id} className="question-block">
                  <p className="q-text">
                    <strong>Q{idx + 1}.</strong> {q.question}
                  </p>
                  {/* Map option1–option4 as radio buttons */}
                  {["option1", "option2", "option3", "option4"].map((opt) => (
                    <label key={opt} className="option-label">
                      <input
                        type="radio"
                        name={q._id}       // group radios by question id
                        value={opt}
                        checked={answers[q._id] === opt}
                        onChange={() => setAnswers({ ...answers, [q._id]: opt })}
                      />
                      {q[opt]}             {/* display e.g. q["option1"] */}
                    </label>
                  ))}
                </div>
              ))}

              <button className="submit-btn" onClick={submitExam}>
                Submit Exam
              </button>
            </div>
          )}

          {/* Step 3: Show result after submission */}
          {examResult && (
            <div className="result-box">
              <h3>✅ Exam Submitted</h3>
              <p>Score: <strong>{examResult.score} / {examResult.total}</strong></p>
              <p>Percentage: <strong>{Math.round((examResult.score / examResult.total) * 100)}%</strong></p>
              <button onClick={() => setExamResult(null)}>Take Another Exam</button>
            </div>
          )}
        </>
      )}

      {/* ════════════════════════ VIEW QUESTIONS ════════════════════════ */}
      {card(
        "📋 All Questions",
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Option 4</th>
              <th>Correct</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i) => (
              <tr key={q._id}>
                <td>{i + 1}</td>
                <td>{q.question}</td>
                <td>{q.option1}</td>
                <td>{q.option2}</td>
                <td>{q.option3}</td>
                <td>{q.option4}</td>
                {/* Highlight correct answer text in navy */}
                <td className="correct-cell">{q[q.correctAnswer]}</td>
                <td>{q.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ════════════════════════ VIEW RESULTS ════════════════════════ */}
      {card(
        "🏆 Student Results",
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Score</th>
              <th>Total Questions</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.studentName}</td>
                <td>{r.subject}</td>
                <td>{r.score}</td>
                <td>{r.totalQuestions}</td>
                <td>{Math.round((r.score / r.totalQuestions) * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default App;
