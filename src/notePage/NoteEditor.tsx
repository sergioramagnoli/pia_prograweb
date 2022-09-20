import { FunctionComponent, useContext, useEffect, useState } from "react";
import EditorMenu from "./EditorMenu";
import { getNoteById } from "../apiCalls";
import { Note } from "../assets/types";
import NoNoteMenu from "./NoNoteMenu";
import Message from "./Message";
import { NoteContext } from "../App";

const NoteEditor: FunctionComponent = () => {
  const [editar, setEditar] = useState(false);
  const [messageUseCase, setMessageUseCase] = useState("");

  const { id, setId, body, setBody, title, setTitle, updatedAt, setUpdatedAt } =
    useContext(NoteContext);

  // get note info every time the id changes
  useEffect(() => {
    if (id !== "" && id !== "new") {
      getNoteById(id).then((note: Note) => {
        const updated_at = new Date(note.updated_at.slice(0, -1));
        setBody(note.body);
        setTitle(note.title);
        setUpdatedAt(
          `${updated_at.toLocaleDateString()} - ${updated_at.toLocaleTimeString()}`
        );
      });
    }
  }, [id]);

  // ensure editing is disabled when browsing trough notes
  useEffect(() => {
    setEditar(false);
  }, [id]);

  // ensure that message only shows for 10 seconds
  useEffect(() => {
    if (messageUseCase !== "")
      setTimeout(() => {
        setMessageUseCase("");
      }, 10200);
  }, [messageUseCase]);

  return (
    <div className="noteEditor">
      <NoteContext.Consumer>
        {({ id }) =>
          id == "" ? (
            <NoNoteMenu setId={setId} setEditar={setEditar} />
          ) : (
            <span>
              <div className="h-[6vh] flex justify-between mx-4">
                <input
                  placeholder="Nota sin nombre"
                  maxLength={80}
                  className="title my-2 w-3/4 truncate"
                  type="text"
                  disabled={!editar}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <EditorMenu
                  editar={editar}
                  setEditar={setEditar}
                  setMessageUseCase={setMessageUseCase}
                />
              </div>
              <div hidden={messageUseCase === ""}>
                <Message
                  messageUseCase={messageUseCase}
                  setMessageUseCase={setMessageUseCase}
                />
              </div>
              <textarea
                placeholder="Escribe aquí el cuerpo de tu nota"
                className="w-full h-[76vh] border-gray-200 border-y-2 bg-gray-50 p-4 font-mono resize-none"
                value={body}
                disabled={!editar}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <div className="px-4 justify-between flex">
                <span>
                  {body.split(" ").length} palabras | Ult. edición: {updatedAt}
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
