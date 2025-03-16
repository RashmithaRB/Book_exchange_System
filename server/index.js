const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const EmployeeModel=require('./models/Employee')
const BookModel=require('./models/Book')


const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://rbangerakhushi:SZIyHew32yI3fvGH@cluster0.hyr7o.mongodb.net/employee");


app.post("/login",(req,res)=>{
    const{email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password==password){
                res.json("Success")
            }else{
                res.json("Password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))
})

// Retrieve All Books
app.get("/home", (req, res) => {
    BookModel.find()
    .then(books => res.json(books))
    .catch(err => res.json(err));
});
  
app.post("/addBook", async (req, res) => {
    try {
        const { title, author, year } = req.body;
        if (!title || !author || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newBook = new BookModel({ title, author, year });
        await newBook.save();
        res.json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3001,()=>{
    console.log("server is running")
})
