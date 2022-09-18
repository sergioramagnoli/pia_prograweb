import { FunctionComponent, useContext, useEffect, useState } from "react";
import NoteContext from "./NoteContext";
import { getAllNotes } from "../apiCalls";
import { Note } from "../assets/types";

const server = "http://localhost:3000";

const NoteGrid: FunctionComponent = () => {
  const [noteId, setNoteId] = useContext(NoteContext);
  const [notes, setNotes] = useState<Note[]>([]);
  const [status, setStatus] = useState("loading");
  const getNotes = () => {
    getAllNotes().then((notes: Note[]) => {
      setNotes(notes);
      setStatus("loaded");
    });
  };
  useEffect(() => {
    getNotes();
  }, [noteId]);
  return (
    <div className="noteContainer">
      <ul className="w-full">
        {notes.length < 1 ? (
          <li className="note">
            {status === "loading" ? (
              <h3 className="title p-2">Cargando...</h3>
            ) : status === "loaded" ? (
              <h3 className="title p-2">No se encontraron notas</h3>
            ) : (
              <span className="p-2 place-content-center grid space-y-2">
                <h3 className="title">Ocurrió un error al traer las notas</h3>
                <button
                  className="flex p-2 rounded-lg border-gray-200 border-2 place-content-center"
                  onClick={() => {
                    getNotes();
                  }}
                >
                  {/*<img*/}
                  {/*  src="/icons/add.svg"*/}
                  {/*  alt="add button"*/}
                  {/*  className="h-5 my-auto"*/}
                  {/*/>*/}
                  <p className="my-auto ml-2">Intentar de nuevo</p>
                </button>
              </span>
            )}
          </li>
        ) : (
          notes.map((note: Note) => (
            <li className="note" key={note.id}>
              <button onClick={() => setNoteId(note.id)}>
                <h3 className="title border-b-2 border-gray-200 p-2">
                  {note.title}
                </h3>
                <p className="body p-2">
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
