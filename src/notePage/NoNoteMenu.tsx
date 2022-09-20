import { FunctionComponent } from "react";

interface IProps {
  setId: Function;
  setEditar: Function;
}

const NoNoteMenu: FunctionComponent<IProps> = ({ setId, setEditar }) => {
  return (
    <div className="grid place-content-center h-full space-y-4">
      <p className={"max-w-[270px] text-center"}>
        Selecciona una nota para editarla o crea una nueva
      </p>
      <button
        className="flex p-2 rounded-lg border-gray-200 border-2 place-content-center"
        onClick={() => {
          setId("new");
          setEditar(true);
        }}
      >
        <img src="/icons/add.svg" alt="add button" className="h-5 my-auto" />
        <p className="my-auto ml-2">Nueva nota</p>
      </button>
    </div>
  );
};

export default NoNoteMenu;
