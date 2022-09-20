import { FunctionComponent, useContext } from "react";
import { NoteContext } from "../App";
import { Note } from "../assets/types";

const NoteGrid: FunctionComponent = () => {
  const { id, setId, notes } = useContext(NoteContext);

  return (
    <div className="noteContainer">
      <ul className="w-full">
        {notes.length < 1 ? (
          <li className="note">Hello</li>
        ) : (
          notes.map((note: Note) => (
            <li className="note" key={note.id}>
              <button
                className={note.id === id ? "opacity-50" : ""}
                onClick={() => setId(note.id)}
              >
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
