import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function User() {
  const [search, setSearch] = useState({ bookTitle: "", author: "", category: "" });
  const [books, setBooks] = useState([]);
  const [issues, setIssues] = useState([]);

  const loadBooks = async (query = "") => {
    const res = await axios.get(`${API}/books${query}`);
    setBooks(res.data);
  };

  const loadIssues = async () => {
    const res = await axios.get(`${API}/issues`);
    setIssues(res.data);
  };

  useEffect(() => {
    loadBooks();
    loadIssues();
  }, []);

  const searchBooks = async (e) => {
    e.preventDefault();
    try {
      const q = `?bookTitle=${search.bookTitle}&author=${search.author}&category=${search.category}`;
      loadBooks(q);
    } catch (err) {
      alert("Search failed");
    }
  };

  return (
    <>
      <div className="card">
        <h3>Search Books</h3>
        <form onSubmit={searchBooks} className="formGrid">
          <input
            placeholder="Book Title"
            value={search.bookTitle}
            onChange={(e) => setSearch({ ...search, bookTitle: e.target.value })}
          />
          <input placeholder="Author" value={search.author} onChange={(e) => setSearch({ ...search, author: e.target.value })} />
          <input
            placeholder="Category"
            value={search.category}
            onChange={(e) => setSearch({ ...search, category: e.target.value })}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="card">
        <h3>Available Book Catalog</h3>
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Available</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Issued Books & Return Dates</h3>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Book</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default User;
