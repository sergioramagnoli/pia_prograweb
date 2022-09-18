import { FunctionComponent } from "react";

interface IProps {
  useCase: "";
}

const Message: FunctionComponent<IProps> = ({ useCase }) => {
  return (
    <div>
      {useCase === "" ? (
        <span></span>
      ) : useCase === "deleteNote" ? (
        <span className="grid place-content-between">
          <p>¿Seguro que desea eliminar la nota?</p>
          <span>
            <button>Confirmar</button>
            <button>Cancelar</button>
          </span>
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};
