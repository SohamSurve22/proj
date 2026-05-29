import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Admin() {
  const [bookForm, setBookForm] = useState({ bookTitle: "", author: "", category: "", isbn: "", available: true });
  const [issueForm, setIssueForm] = useState({ bookId: "", studentName: "", studentRollNo: "", issueDate: "", returnDate: "" });
  const [editBookId, setEditBookId] = useState("");
  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);

  const loadBooks = async () => {
    try {
      const res = await axios.get(`${API}/books`);
      setBooks(res.data);
    } catch (err) {
      alert("Could not load books");
    }
  };

  const loadIssues = async () => {
    try {
      const res = await axios.get(`${API}/issues`);
      setIssues(res.data);
    } catch (err) {
      alert("Could not load issued books");
    }
  };

  useEffect(() => {
    loadBooks();
    loadIssues();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    try {
      if (editBookId) {
        await axios.put(`${API}/book/${editBookId}`, bookForm);
        alert("Book updated");
      } else {
        await axios.post(`${API}/book`, bookForm);
        alert("Book added");
      }
      setBookForm({ bookTitle: "", author: "", category: "", isbn: "", available: true });
      setEditBookId("");
      loadBooks();
    } catch (err) {
      alert("Could not save book");
    }
  };

  const editBook = (book) => {
    setEditBookId(book._id);
    setBookForm({
      bookTitle: book.bookTitle,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
      available: book.available
    });
  };

  const cancelEdit = () => {
    setEditBookId("");
    setBookForm({ bookTitle: "", author: "", category: "", isbn: "", available: true });
  };

  const toggleAvailability = async (book) => {
    try {
      await axios.put(`${API}/book/${book._id}`, { available: !book.available });
      loadBooks();
    } catch (err) {
      alert("Could not update book");
    }
  };

  const issueBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/issue`, issueForm);
      alert("Book issued");
      setIssueForm({ bookId: "", studentName: "", studentRollNo: "", issueDate: "", returnDate: "" });
      loadBooks();
      loadIssues();
    } catch (err) {
      alert(err?.response?.data?.message || "Could not issue book");
    }
  };

  const markReturned = async (issueId) => {
    try {
      await axios.put(`${API}/issue/${issueId}`, { status: "Returned" });
      loadBooks();
      loadIssues();
    } catch (err) {
      alert("Could not mark returned");
    }
  };

  return (
    <>
      <div className="adminGrid">
        <div className="card">
          <h3>{editBookId ? "Update Book" : "Add Book"}</h3>
          <form onSubmit={addBook} className="formGrid">
            <input
              placeholder="Book Title"
              value={bookForm.bookTitle}
              onChange={(e) => setBookForm({ ...bookForm, bookTitle: e.target.value })}
              required
            />
            <input placeholder="Author" value={bookForm.author} onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} required />
            <input
              placeholder="Category"
              value={bookForm.category}
              onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
              required
            />
            <input placeholder="ISBN" value={bookForm.isbn} onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })} required />
            <select
              value={bookForm.available.toString()}
              onChange={(e) => setBookForm({ ...bookForm, available: e.target.value === "true" })}
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            <button type="submit">{editBookId ? "Update Book" : "Add Book"}</button>
            {editBookId && (
              <button type="button" onClick={cancelEdit}>
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="card">
          <h3>Issue Book</h3>
          <form onSubmit={issueBook} className="formGrid">
            <select value={issueForm.bookId} onChange={(e) => setIssueForm({ ...issueForm, bookId: e.target.value })} required>
              <option value="">Select Available Book</option>
              {books
                .filter((book) => book.available)
                .map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.bookTitle} - {book.author}
                  </option>
                ))}
            </select>
            <input
              placeholder="Student Name"
              value={issueForm.studentName}
              onChange={(e) => setIssueForm({ ...issueForm, studentName: e.target.value })}
              required
            />
            <input
              placeholder="Roll Number"
              value={issueForm.studentRollNo}
              onChange={(e) => setIssueForm({ ...issueForm, studentRollNo: e.target.value })}
              required
            />
            <input
              type="date"
              value={issueForm.issueDate}
              onChange={(e) => setIssueForm({ ...issueForm, issueDate: e.target.value })}
              required
            />
            <input
              type="date"
              value={issueForm.returnDate}
              onChange={(e) => setIssueForm({ ...issueForm, returnDate: e.target.value })}
              required
            />
            <button type="submit">Issue Book</button>
          </form>
        </div>
      </div>

      <div className="card">
        <h3>Manage Books</h3>
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.bookTitle}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.isbn}</td>
                <td>{book.available ? "Yes" : "No"}</td>
                <td>
                  <button type="button" onClick={() => editBook(book)}>
                    Edit
                  </button>{" "}
                  <button type="button" onClick={() => toggleAvailability(book)}>
                    {book.available ? "Mark Unavailable" : "Mark Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Track Return Dates</h3>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Book</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.studentName}</td>
                <td>{issue.studentRollNo}</td>
                <td>{issue.bookTitle}</td>
                <td>{issue.issueDate}</td>
                <td>{issue.returnDate}</td>
                <td>{issue.status}</td>
                <td>
                  {issue.status === "Issued" ? (
                    <button type="button" onClick={() => markReturned(issue._id)}>
                      Mark Returned
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
