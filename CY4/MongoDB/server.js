const express = require("express");
const connectDB = require("./config/config");


const Book = require("./models/book");


const app = express();


connectDB();
app.use(express.json());

const validateTitle = require("./middlewares/validateTitle");

app.post("/api/books", validateTitle, async (req, res) => {
 try {
   const { title, author, year, genre } = req.body;
   const newBook = new Book({ title, author, year, genre });
   await newBook.save();
   res.status(201).json(newBook);
 } catch (err) {
   res.status(500).json({ error: "Erro ao criar livro." });
 }
});

app.get("/api/books/:id", async (req, res, next) => {
 try {
   const { id } = req.params;
   const book = await Book.findById(id);
   if (!book) {
     return res.status(404).json({ error: "Livro não encontrado" });
   }
   res.json(book);
 } catch (err) {
   next(err); // Passa o erro para o middleware de tratamento
 }
});

app.patch("/api/books/:id", async (req, res) => {
 try {
   const { id } = req.params;
   const updates = req.body;
   const options = { new: true, runValidators: true };


   const updatedBook = await Book.findByIdAndUpdate(id, updates, options);
   if (!updatedBook)
     return res.status(404).json({ error: "Livro não encontrado" });


   res.json(updatedBook);
 } catch (err) {
   res.status(500).json({ error: "Erro ao atualizar livro." });
 }
});

app.delete("/api/books/:id", async (req, res) => {
 try {
   const { id } = req.params;
   const deletedBook = await Book.findByIdAndDelete(id);
   if (!deletedBook)
     return res.status(404).json({ error: "Livro não encontrado" });
   res.json({ message: "Livro excluído com sucesso" });
 } catch (err) {
   res.status(500).json({ error: "Erro ao excluir livro" });
 }
});


app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Ocorreu um erro no servidor." });
});



app.listen(3000, () => console.log("Server running on port 3000"));