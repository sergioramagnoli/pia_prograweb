import { FunctionComponent, useContext, useEffect, useState } from "react";
import NoteContext from "./NoteContext";
import EditorMenu from "./EditorMenu";
import { getNoteById } from "../apiCalls";
import { Note } from "../assets/types";
import NoNoteMenu from "./NoNoteMenu";

const NoteEditor: FunctionComponent = () => {
  const [editar, setEditar] = useState(false);
  const [noteBody, setNoteBody] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteId, setNoteId] = useContext(NoteContext);
  const [noteLastUpdate, setNoteLastUpdate] = useState(new Date());

  // get note info every time the id changes
  useEffect(() => {
    if (noteId !== "" && noteId !== "new") {
      getNoteById(noteId).then((note: Note) => {
        setNoteBody(note.body);
        setNoteTitle(note.title);
        setNoteLastUpdate(new Date(note.updated_at.slice(0, -1)));
      });
    }
  }, [noteId]);

  // ensure editing is disabled when browsing trough notes
  useEffect(() => {
    setEditar(false);
  }, [noteId]);

  return (
    <div className="noteEditor">
      <NoteContext.Consumer>
        {([noteId]) =>
          noteId == "" ? (
            <NoNoteMenu setNoteId={setNoteId} setEditar={setEditar} />
          ) : (
            <span>
              <div className="h-[6vh] flex justify-between mx-4">
                <input
                  placeholder="Nota sin nombre"
                  maxLength={80}
                  className="title my-2 w-3/4 truncate"
                  type="text"
                  disabled={!editar}
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                ></input>
                {/* BOTONES DE EDITAR, CERRAR Y GUARDAR */}
                <EditorMenu
                  editar={editar}
                  setEditar={setEditar}
                  noteId={noteId}
                  setNoteId={setNoteId}
                  noteTitle={noteTitle}
                  setNoteTitle={setNoteTitle}
                  noteBody={noteBody}
                  setNoteBody={setNoteBody}
                  setNoteLastUpdate={setNoteLastUpdate}
                />
              </div>
              <textarea
                placeholder="Escribe aquí el cuerpo de tu nota"
                className="w-full h-[76vh] border-gray-200 border-y-2 bg-gray-50 p-4 font-mono resize-none"
                value={noteBody}
                disabled={!editar}
                onChange={(e) => setNoteBody(e.target.value)}
              ></textarea>
              <div className="px-4 justify-between flex">
                <span>
                  {noteBody.split(" ").length} palabras | Ult. edición:{" "}
                  {noteLastUpdate.toLocaleDateString()}
                </span>
              </div>
            </span>
          )
        }
      </NoteContext.Consumer>
    </div>
  );
};

export default NoteEditor;
