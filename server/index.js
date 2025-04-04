// const express=require("express")
// const mongoose=require('mongoose')
// const cors=require("cors")
// const EmployeeModel=require('./models/Employee')
// const BookModel=require('./models/Book')


// const app=express()
// app.use(express.json())
// app.use(cors())

// mongoose.connect("mongodb+srv://rbangerakhushi:SZIyHew32yI3fvGH@cluster0.hyr7o.mongodb.net/employee");


// app.post("/login",(req,res)=>{
//     const{email,password}=req.body;
//     EmployeeModel.findOne({email:email})
//     .then(user=>{
//         if(user){
//             if(user.password==password){
//                 res.json("Success")
//             }else{
//                 res.json("Password is incorrect")
//             }
//         }else{
//             res.json("No record existed")
//         }
//     })
// })

// app.post('/register',(req,res)=>{
//     EmployeeModel.create(req.body)
//     .then(employees=>res.json(employees))
//     .catch(err=>res.json(err))
// })

// // Retrieve All Books
// app.get("/home", (req, res) => {
//     BookModel.find()
//     .then(books => res.json(books))
//     .catch(err => res.json(err));
// });
  
// app.post("/addBook", async (req, res) => {
//     try {
//         const { title, author, year } = req.body;
//         if (!title || !author || !year) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         const newBook = new BookModel({ title, author, year });
//         await newBook.save();
//         res.json({ message: "Book added successfully", book: newBook });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


// app.listen(3001,()=>{
//     console.log("server is running")
// })
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://rbangerakhushi:SZIyHew32yI3fvGH@cluster0.hyr7o.mongodb.net/";
const dbName = "employee"; // Your database name
const collectionName = "books"; // Your collection name

// Function to connect to MongoDB
async function connectDB() {
    const client = new MongoClient(mongoURI);
    await client.connect();
    return client.db(dbName);
}

// Employee Login Route
app.post("/login", async (req, res) => {
    try {
        const db = await connectDB();
        const { email, password } = req.body;
        const user = await db.collection("employees").findOne({ email });
        
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("Password is incorrect");
            }
        } else {
            res.json("No record existed");
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Employee Registration Route
app.post("/register", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("employees").insertOne(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error registering employee" });
    }
});

// Retrieve All Books
app.get("/home", async (req, res) => {
    try {
        const db = await connectDB();
        const books = await db.collection(collectionName).find().toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Error fetching books" });
    }
});

// Add a New Book
app.post("/addBook", async (req, res) => {
    try {
        const db = await connectDB();
        const { title, author, year } = req.body;
        if (!title || !author || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const result = await db.collection(collectionName).insertOne({ title, author, year });
        res.json({ message: "Book added successfully", book: result });
    } catch (error) {
        res.status(500).json({ error: "Error adding book" });
    }
});

// Update a Book
app.put("/updateBook/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const { title, author, year } = req.body;
        const result = await db.collection(collectionName).updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { title, author, year } }
        );
        res.json({ message: "Book updated successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Error updating book" });
    }
});

// Delete a Book
app.delete("/deleteBook/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ message: "Book deleted successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Error deleting book" });
    }
});

// Search a Book by Title
app.get("/searchBook/:title", async (req, res) => {
    try {
        const db = await connectDB();
        const books = await db.collection(collectionName).find({ title: { $regex: req.params.title, $options: "i" } }).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Error searching for book" });
    }
});

// Start the Server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

