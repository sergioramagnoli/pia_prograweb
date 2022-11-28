import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NoteContext } from "./NotesProvider";
import { Note } from "../assets/types";
import { getAllNotes } from "../apiCalls";

const NoteGrid: FunctionComponent = () => {
  const { id, setId } = useContext(NoteContext);
  const [notes, setNotes] = useState([] as Note[]);

  useEffect(() => {
    getAllNotes().then((notes: Note[]) => {
      setNotes(notes);
    });
  }, []);

  return (
    <div className="noteContainer">
      <ul className="w-full">
        {notes.length < 1 ? (
          <li className="note"></li>
        ) : (
          notes.map((note: Note) => (
            <li
              key={note.id}
              className={note.id === id ? "note opacity-75" : "note"}
            >
              <button onClick={() => setId(note.id)} className="w-full">
                <h3 className="title">{note.title}</h3>
                <p className="body">
                  {note.body.slice(0, 122) +
                    (note.body.length > 122 ? "..." : "")}
                </p>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NoteGrid;
