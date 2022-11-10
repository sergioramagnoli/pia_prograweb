import { FunctionComponent, useContext, useEffect, useState } from "react";
import { deleteNote } from "../apiCalls";
import { NoteContext } from "./NotesProvider";

interface IProps {
  messageUseCase: string;
  setMessageUseCase: Function;
}

const Message: FunctionComponent<IProps> = ({
  messageUseCase,
  setMessageUseCase,
}) => {
  const { id, setId } = useContext(NoteContext);
  const [width, setWidth] = useState(0);
  const load = () => {
    let w2 = 0;
    let increasingWidth = setInterval(() => {
      setWidth(w2 + 0.1);
      w2 += 0.1;
      if (w2 >= 100) {
        stop();
      }
    }, 10);
    function stop() {
      clearInterval(increasingWidth);
    }
  };

  useEffect(() => {
    if (messageUseCase !== "") load();
  }, [messageUseCase]);

  useEffect(() => {
    const loadingBar = document.getElementById("loadingBar");
    if (loadingBar) loadingBar.style.width = `${width}%`;
  }, [width]);

  return (
    <div className="relative w-full h-[5vh]">
      <div
        className="bg-gray-200 absolute -z-[100] top-0 left-0 h-[5vh]"
        id="loadingBar"
      />
      <div className="p-2 px-4 border-t-2 flex place-content-between z-[100] relative">
        {messageUseCase === "changesSaved" ? (
          <span>
            <p className="text-green-700">Se guardaron los cambios</p>
          </span>
        ) : messageUseCase === "deleteNote" ? (
          <span className="flex w-full place-content-between">
            <p className="text-red-700">
              ¿Seguro de que desea eliminar la nota?
            </p>
            <button
              className="hover:scale-110 transition-all"
              onClick={() => {
                deleteNote(id).then(() => {
                  setId("");
                });
              }}
            >
              <img
                src="/icons/done.svg"
                alt="confirm button"
                className="h-6 my-auto mr-6"
              />
            </button>
          </span>
        ) : messageUseCase === "newNoteSaved" ? (
          <span>
            <p className="text-green-700">Se guardó la nota</p>
          </span>
        ) : (
          <span></span>
        )}
        <button
          className="hover:scale-110 transition-all"
          onClick={() => {
            setMessageUseCase("");
          }}
        >
          <img
            src="/icons/close.svg"
            alt="close button"
            className="h-6 my-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default Message;
