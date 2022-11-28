import { FunctionComponent, useContext, useEffect, useState } from "react";
import EditorMenu from "./EditorMenu";
import { getNoteById } from "../apiCalls";
import { Note } from "../assets/types";
import NoNoteMenu from "./NoNoteMenu";
import Message from "./Message";
import { NoteContext } from "./NotesProvider";

const NoteEditor: FunctionComponent = () => {
  const [editar, setEditar] = useState(false);
  const [messageUseCase, setMessageUseCase] = useState("");

  const { id } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  // get note info every time the id changes
  useEffect(() => {
    if (id !== "" && id !== "new") {
      getNoteById(id).then((note: Note) => {
        const updated_at = new Date(note.updated_at.slice(0, -1));
        setBody(note.body);
        setTitle(note.title);
        setUpdatedAt(
          `${updated_at.toLocaleDateString()} a las ${updated_at.toLocaleTimeString()}`
        );
      });
    }
  }, [id]);

  // ensure editing is disabled when browsing trough notes
  useEffect(() => {
    setEditar(id === "new");
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
          id === "" ? (
            <NoNoteMenu setEditar={setEditar} />
          ) : (
            <>
              <div className="h-[10vh] flex justify-between mx-4">
                <input
                  placeholder="Nota sin nombre"
                  maxLength={80}
                  className="title w-3/4 truncate h-full"
                  type="text"
                  disabled={!editar}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <EditorMenu
                  editar={editar}
                  setEditar={setEditar}
                  setMessageUseCase={setMessageUseCase}
                  title={title}
                  setTitle={setTitle}
                  body={body}
                  setBody={setBody}
                  setUpdatedAt={setUpdatedAt}
                />
              </div>
              <div hidden={messageUseCase === ""}>
                <Message
                  messageUseCase={messageUseCase}
                  setMessageUseCase={setMessageUseCase}
                />
              </div>
              <textarea
                placeholder="Escribe aquí tu nota"
                value={body}
                disabled={!editar}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <div className="px-4 pt-1 justify-between flex align-middles">
                {body.split(" ").length} palabras | Última edición: {updatedAt}
              </div>
            </>
          )
        }
      </NoteContext.Consumer>
    </div>
  );
};

export default NoteEditor;
