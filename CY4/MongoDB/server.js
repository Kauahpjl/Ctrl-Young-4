const express = require("express");
const connectDB = require("./config/config");


const Book = require("./models/book");


const app = express();


connectDB();
app.use(express.json());


app.post("/api/books", async (req, res) => {
 try {
   const { title, author, year, genre } = req.body;
   const newBook = new Book({ title, author, year, genre });
   await newBook.save();
   res.status(201).json(newBook);
 } catch (err) {
   res.status(500).json({ error: "Erro ao criar livro" });
 }
});

app.get("/api/books", async (_req, res) => {
 try {
   const books = await Book.find();
   res.json(books);
 } catch (err) {
   res.status(500).json({ error: "Erro ao buscar livros" });
 }
});





app.listen(3000, () => console.log("Server running on port 3000"));