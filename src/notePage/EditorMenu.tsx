import React, { FunctionComponent, useContext } from "react";
import { createNote, patchNote } from "../apiCalls";
import { NoteContext } from "./NotesProvider";

interface IProps {
  editar: boolean;
  setEditar: Function;
  setMessageUseCase: Function;
  title: string;
  setTitle: Function;
  body: string;
  setBody: Function;
  setUpdatedAt: Function;
}

const EditorMenu: FunctionComponent<IProps> = ({
  editar,
  setEditar,
  setMessageUseCase,
  title,
  setTitle,
  body,
  setBody,
  setUpdatedAt,
}) => {
  const { id, setId } = useContext(NoteContext);
  return (
    <div className="flex space-x-4">
      <button
        className="my-auto hover:scale-110 transition-all"
        onClick={() => {
          setMessageUseCase("deleteNote");
        }}
      >
        <img
          src="/icons/delete.svg"
          alt="delete button"
          className="h-6 my-auto mr-2"
        />
      </button>
      <button
        className="my-auto hover:scale-110 transition-all"
        onClick={() => {
          if (editar) {
            if (id === "new") {
              createNote(title, body).then((res) => {
                setMessageUseCase("newNoteSaved");
                setId(res.id);
              });
            } else if (id && id !== "") {
              void patchNote(title, body, id);
              setMessageUseCase("changesSaved");
            }
          }
          setEditar(!editar);
        }}
      >
        {!editar ? (
          <img
            src="/icons/edit.svg"
            alt="edit button"
            className="h-6 my-auto mr-2"
          />
        ) : (
          <img
            src="/icons/save.svg"
            alt="save button"
            className="h-6 my-auto mr-2"
          />
        )}
      </button>
      <button
        className="my-auto hover:scale-110 transition-all"
        onClick={() => {
          setId("");
          setBody("");
          setTitle("");
          setUpdatedAt("");
        }}
      >
        <img
          src="/icons/close.svg"
          alt="close button"
          className="h-6 my-auto"
        />
      </button>
    </div>
  );
};

export default EditorMenu;
