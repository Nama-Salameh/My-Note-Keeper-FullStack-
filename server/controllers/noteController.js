const db = require("../database");

async function getAllNotes(req, res) {
  db.all("SELECT id, title, content, date FROM notes", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
}

async function createNote(req, res) {
  const { title, content, date } = req.body;
  db.run(
    "INSERT INTO notes (title, content, date) VALUES (?, ?, ?)",
    [title, content, date],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
}

async function updateNoteById(req, res) {
  const { title, content, date } = req.body;
  const id = req.params.id;
  db.run(
    "UPDATE notes SET title = ?, content = ?, date = ? WHERE id = ?",
    [title, content, date, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id });
    }
  );
}
async function deleteNoteById(req, res) {
  const id = req.params.id;
  db.run("DELETE FROM notes WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Deleted", changes: this.changes });
  });
}

module.exports = {
  getAllNotes,
  createNote,
  updateNoteById,
  deleteNoteById,
};
