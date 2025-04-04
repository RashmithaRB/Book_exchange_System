// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Home() {
//     const [title, setTitle] = useState("");
//     const [author, setAuthor] = useState("");
//     const [year, setYear] = useState("");
//     const [books, setBooks] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:3001/home")
//         .then(response => setBooks(response.data))
//         .catch(error => console.log(error));
//     }, []);

//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         axios.post('http://localhost:3001/addBook',{title,author,year})
//         .then(result=>console.log(result))
//         .catch(err=>console.log(err))

//     }
    

//     return (
//         <div className="container">
//             <h2 className="mt-4">Book Management</h2>
//             <form onSubmit={handleSubmit} className="mb-4">
//                 <div className="mb-3">
//                     <label className="form-label">Title</label>
//                     <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} required />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Author</label>
//                     <input type="text" className="form-control" onChange={(e) => setAuthor(e.target.value)} required />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Year of Publishing</label>
//                     <input type="number" className="form-control" onChange={(e) => setYear(e.target.value)} required />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Add Book</button>
//             </form>

//             <h3>Books List</h3>
//             <ul className="list-group">
//                 {books.map((book, index) => (
//                     <li key={index} className="list-group-item">
//                         <strong>{book.title}</strong> by {book.author} ({book.year})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [books, setBooks] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [editId, setEditId] = useState(null);

    // Fetch all books on page load
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get("http://localhost:3001/home")
            .then(response => setBooks(response.data))
            .catch(error => console.log(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            // Update existing book
            axios.put(`http://localhost:3001/updateBook/${editId}`, { title, author, year })
                .then(() => {
                    fetchBooks();
                    setEditId(null);
                    setTitle("");
                    setAuthor("");
                    setYear("");
                })
                .catch(err => console.log(err));
        } else {
            // Add new book
            axios.post("http://localhost:3001/addBook", { title, author, year })
                .then(() => {
                    fetchBooks();
                    setTitle("");
                    setAuthor("");
                    setYear("");
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteBook/${id}`)
            .then(() => fetchBooks())
            .catch(err => console.log(err));
    };

    const handleEdit = (book) => {
        setEditId(book._id);
        setTitle(book.title);
        setAuthor(book.author);
        setYear(book.year);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/searchBook/${searchTitle}`)
            .then(response => setBooks(response.data))
            .catch(error => console.log(error));
    };

    return (
        <div className="container">
            <h2 className="mt-4">Book Management</h2>

            {/* Add / Update Book Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Year of Publishing</label>
                    <input type="number" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editId ? "Update Book" : "Add Book"}
                </button>
            </form>

            {/* Search Book Form */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Search by Title</label>
                    <input type="text" className="form-control" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-secondary">Search</button>
            </form>

            {/* Books List */}
            <h3>Books List</h3>
            <ul className="list-group">
                {books.map((book) => (
                    <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{book.title}</strong> by {book.author} ({book.year})
                        </div>
                        <div>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(book)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;

