import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/home")
        .then(response => setBooks(response.data))
        .catch(error => console.log(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/addBook", {
                title,
                author,
                year: parseInt(year)
            });
            alert(response.data.message);
            setBooks([...books, response.data.book]); // Update the book list without reloading
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };
    

    return (
        <div className="container">
            <h2 className="mt-4">Book Management</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Year of Publishing</label>
                    <input type="number" className="form-control" onChange={(e) => setYear(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>

            <h3>Books List</h3>
            <ul className="list-group">
                {books.map((book, index) => (
                    <li key={index} className="list-group-item">
                        <strong>{book.title}</strong> by {book.author} ({book.year})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
