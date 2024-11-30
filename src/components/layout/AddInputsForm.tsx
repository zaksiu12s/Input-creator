import { useEffect, useState } from "react";
import InputTypes, { InputTypesArr } from "../../interfaces/types/InputTypes";
import { Input } from "../../interfaces/classes/Input";
// import AddInputsPreview from "./AddInputsPreview";

const AddInputsForm: React.FC<{
  inputs: Input[];
  addInput: React.Dispatch<React.SetStateAction<Input[]>>;
  update?: {
    index: number;
    turnOffEditing: React.Dispatch<React.SetStateAction<[boolean, number]>>;
  };
}> = ({ inputs, addInput, update }) => {
  const [newInputType, setNewInputType] = useState<InputTypes>("Text");
  const [newInputPlaceholder, setNewInputPlaceholder] = useState<string>("");
  const [newInputName, setNewInputName] = useState<string>("");
  const [newInputRequired, setNewInputRequired] = useState<boolean>(false);
  const [newInputRadio, setNewInputRadio] = useState<string>("");

  const handleInputFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(newInputName.length >= 1)) {
      alert("Please enter an input name.");
      return;
    }

    if (update !== undefined) {
      const inputsArr = inputs;
      const input = new Input(
        newInputType,
        newInputName,
        newInputPlaceholder,
        newInputRequired,
        newInputRadio
      );
      inputsArr[update.index] = input;
      localStorage.setItem("inputs", JSON.stringify([...inputsArr]));
      addInput([...inputsArr]);
      update.turnOffEditing([false, -1]);
      return;
    }

    if (inputs.find((input) => input.getName() === newInputName)) {
      alert("Input name already exists.");
      return;
    }

    const input = new Input(
      newInputType,
      newInputName,
      newInputPlaceholder,
      newInputRequired,
      newInputRadio
    );
    addInput([...inputs, input]);
    localStorage.setItem("inputs", JSON.stringify([...inputs, input]));

    setNewInputRadio("");
    setNewInputType("Text");
    setNewInputPlaceholder("");
    setNewInputName("");
    setNewInputRequired(false);
  };

  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;

    if (InputTypesArr.includes(target.value)) {
      setNewInputType(target.value as InputTypes);
    }
  };

  useEffect(() => {
    if (update !== undefined) {
      console.log(update.index);
      console.log(inputs[update.index].getType());
      setNewInputType(inputs[update.index].getType() as InputTypes);
      setNewInputName(inputs[update.index].getName());
      setNewInputPlaceholder(inputs[update.index].getPlaceholder());
      setNewInputRequired(inputs[update.index].getRequired());
      if (inputs[update.index].getRadioOptions().length > 0) {
        setNewInputRadio(inputs[update.index].getRadioOptions().join(","));
      }
    }
  }, [update, inputs]);

  return (
    <>
      <div className="w-full flex justify-center items-center border-b-2 pb-10">
        <form onSubmit={handleInputFormSubmit} className="grid grid-cols-1">
          <label className="font-bold text-lg" htmlFor="input-type">
            Rodzaj:
          </label>
          <select
            className="border-2 py-1.5 px-2 rounded-lg mb-2"
            id="input-type"
            value={newInputType}
            onChange={handleSelectChange}
          >
            <option>Text</option>
            <option>Number</option>
            <option>Date</option>
            <option>Password</option>
            <option>Textarea</option>
            <option>Radio</option>
            <option>Submit</option>
          </select>

          <label className="font-bold text-lg" htmlFor="input-name">
            Nazwa:
          </label>
          <input
            className="border-2 py-1.5 px-2 rounded-lg mb-2"
            placeholder="Wpisz nazwę inputa"
            id="input-name"
            type="text"
            value={newInputName}
            onChange={(e) => {
              setNewInputName(e.target.value);
            }}
          />

          {newInputType !== "Radio" ? (
            <>
              <label className="font-bold text-lg" htmlFor="input-placeholder">
                Placeholder:
              </label>
              <input
                className="border-2 py-1.5 px-2 rounded-lg mb-2"
                id="input-placeholder"
                placeholder="Wpisz placeholder inputa"
                type="text"
                value={newInputPlaceholder}
                onChange={(e) => {
                  setNewInputPlaceholder(e.target.value);
                }}
                disabled={newInputType === "Date" || newInputType === "Submit"}
              />
            </>
          ) : (
            <>
              <label className="font-bold text-lg" htmlFor="input-placeholder">
                Wartości: <span className="text-sm">(po przecinku)</span>
              </label>
              <input
                className="border-2 py-1.5 px-2 rounded-lg mb-2"
                id="input-placeholder"
                placeholder="Wpisz wartości radio"
                type="text"
                value={newInputRadio}
                onChange={(e) => {
                  setNewInputRadio(e.target.value);
                }}
              />
            </>
          )}

          <div className="mb-2 flex items-center gap-1">
            <label
              className="font-bold cursor-pointer"
              htmlFor="input-required"
            >
              Pole wymagane:
            </label>
            <input
              className="cursor-pointer"
              id="input-required"
              type="checkbox"
              checked={newInputRequired}
              disabled={newInputType === "Submit"}
              onChange={() => {
                setNewInputRequired(!newInputRequired);
              }}
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-gray-200 px-2.5 py-1.5 w-max rounded-lg"
            >
              {update ? "Aktualizuj" : "Dodaj"}
            </button>
          </div>
        </form>
      </div>

      {/* <div className="w-full p-10 px-2 border-b-2">
        <AddInputsPreview
          newInputType={newInputType}
          newInputPlaceholder={newInputPlaceholder}
          newInputRequired={newInputRequired}
          newInputName={newInputName}
        />
      </div> */}
    </>
  );
};

export default AddInputsForm;
