import React, { FunctionComponent } from "react";
import { createNote, patchNote } from "../apiCalls";

interface IProps {
  editar: boolean;
  setEditar: Function;
  noteId: string;
  setNoteId: Function;
  noteTitle: string;
  setNoteTitle: Function;
  noteBody: string;
  setNoteBody: Function;
  setNoteLastUpdate: Function;
  setMessageUseCase: Function;
}

const EditorMenu: FunctionComponent<IProps> = ({
  editar,
  setEditar,
  noteId,
  setNoteId,
  noteTitle,
  setNoteTitle,
  noteBody,
  setNoteBody,
  setNoteLastUpdate,
  setMessageUseCase,
}) => {
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
            if (noteId === "new") {
              createNote(noteTitle, noteBody).then((res) => {
                setNoteId(res.id);
              });
            } else if (noteId && noteId !== "") {
              void patchNote(noteTitle, noteBody, noteId);
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
          setNoteId("");
          setNoteBody("");
          setNoteTitle("");
          setNoteLastUpdate(new Date());
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
