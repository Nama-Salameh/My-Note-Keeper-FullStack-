import { createContext, useContext, useReducer , useEffect } from "react";

const NotesContext = createContext();

export function useNotes() {
  return useContext(NotesContext);
}

export function useNotesDispatch() {
  return useContext(NotesContext).dispatch;
}

export const NotesProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(notesReducer, initialNotes);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "setNotes", data });
      });
  } , []);


  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

const notesReducer = (notes, action) => {
  switch (action.type) {
    case "setNotes": {
      return action.data;
    }
    case "add": {
      return [
        ...notes,
        {
          id: action.id,
          title: action.title,
          content: action.content,
          date: action.date,
        },
      ];
    }
    case "delete": {
      return notes.filter((note) => note.id !== action.id);
    }
    case "update": {
      return notes.map((note) => {
        if (note.id === action.id) {
          return {
            ...note,
            title: action.title,
            content: action.content,
            date: action.date,
          };
        }
        return note;
      });
    }
    default:
      return notes;
  }
};

const initialNotes = [];
