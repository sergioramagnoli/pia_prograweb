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
  let loadingBar = document.getElementById("loadingBar");
  if (loadingBar === null) {
    loadingBar = document.createElement("div");
    loadingBar.className =
      "bg-gray-200 absolute -z-[1] top-0 left-0 h-[4vh] place-items-center";
    loadingBar.id = "loadingBar";
  }
  const { id, setId } = useContext(NoteContext);
  const [width, setWidth] = useState(0);
  let increasingWidth: number | undefined;
  const load = () => {
    let w2 = 0;
    increasingWidth = setInterval(() => {
      setWidth(w2 + 0.1);
      w2 += 0.1;
      if (w2 >= 100 && messageUseCase === "") {
        clearMessage();
      }
    }, 10);
  };

  function clearMessage() {
    setWidth(0);
    clearInterval(increasingWidth);
    if (loadingBar !== null && loadingBar.parentNode !== null)
      loadingBar.parentNode.removeChild(loadingBar);
    setMessageUseCase("");
  }

  useEffect(() => {
    if (messageUseCase !== "") load();
  }, [messageUseCase]);

  useEffect(() => {
    // console.log(loadingBar, width);
    if (loadingBar) loadingBar.style.width = `${width}%`;
  }, [width]);

  return (
    <div className="relative w-full h-[4vh] grid place-items-center border-t">
      <div
        className="bg-gray-200 absolute -z-[1] top-0 left-0 h-[4vh] place-items-center"
        id="loadingBar"
      />
      <div className="px-4 w-full flex place-content-between z-[100] relative ">
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
                  clearMessage();
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
            clearMessage();
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
