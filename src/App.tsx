import { useCallback, useEffect, useState } from "react";
import { Input } from "./interfaces/classes/Input";
import generateInputs from "./helpers/generateInputs";
import preventDefault from "./helpers/preventDefault";
import AddInputsForm from "./components/layout/AddInputsForm";
import InputTypes from "./interfaces/types/InputTypes";

function App() {
  const [inputs, addInput] = useState<Input[]>([]);
  const [editingData, setEditingData] = useState<[boolean, number]>([
    false,
    -1,
  ]);

  const handleInputRearrange = useCallback(
    (index: number, nextIndex: number) => {
      const newInputs = [...inputs];
      const [input1, input2] = [newInputs[index], newInputs[nextIndex]];

      if (nextIndex > newInputs.length) {
        return;
      }

      if (nextIndex < 0) {
        return;
      }

      newInputs[index] = input2;
      newInputs[nextIndex] = input1;

      addInput([...newInputs]);
      localStorage.setItem("inputs", JSON.stringify([...newInputs]));
    },
    [inputs]
  );

  const handleInputDelete = useCallback(
    (index: number) => {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);

      addInput([...newInputs]);
      localStorage.setItem("inputs", JSON.stringify(newInputs));
    },
    [inputs]
  );

  const handleEditData = (index: number) => {
    setEditingData([true, index]);
  };

  useEffect(() => {
    const storedInputs = localStorage.getItem("inputs");
    if (storedInputs) {
      try {
        const parsedInputs: [
          {
            name: string;
            placeholder: string;
            type: InputTypes;
            required: boolean;
            radioOptions: string[];
          }
        ] = JSON.parse(storedInputs);
        const inputArr = parsedInputs.map((input) => {
          if (input.radioOptions.length == 0) {
            return new Input(
              input.type,
              input.name,
              input.placeholder,
              input.required
            );
          }

          return new Input(
            input.type,
            input.name,
            input.placeholder,
            input.required,
            input.radioOptions.join(",")
          );
        });
        addInput(inputArr);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <>
      {editingData[0] ? (
        <>
          <div className="absolute left w-full h-[100svh]">
            <div className="w-full h-full flex justify-center items-center relative">
              <div className="z-50 bg-white p-20 border-4 rounded-2xl">
                <AddInputsForm
                  inputs={inputs}
                  addInput={addInput}
                  update={{
                    index: editingData[1],
                    turnOffEditing: setEditingData,
                  }}
                />
              </div>
              <div
                className="absolute cursor-pointer w-full h-full left-0 right-0"
                onClick={() => {
                  setEditingData([false, -1]);
                }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="flex justify-center">
        <div className="max-w-[1000px] flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center py-3 px-2">
            Edytuj swój formularz:
          </h1>
          <AddInputsForm inputs={inputs} addInput={addInput} />

          {inputs.length > 0 ? (
            <div className="border-b-2 w-full">
              <div className="flex justify-center w-full">
                <form
                  id="createdForm"
                  onSubmit={preventDefault}
                  className="flex flex-col items-center max-w-max py-10"
                >
                  {generateInputs(
                    inputs,
                    false,
                    handleInputRearrange,
                    handleInputDelete,
                    handleEditData
                  )}
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex gap-2 py-10 justify-center items-center">
            <div>
              <svg
                className="cursor-pointer hover:stroke-red-500 w-10"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                onClick={() => {
                  addInput([]);
                  localStorage.removeItem("inputs");
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="3 6 5 6 21 6" />{" "}
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
                <line x1="10" x2="10" y1="11" y2="17" />{" "}
                <line x1="14" x2="14" y1="11" y2="17" />{" "}
              </svg>
            </div>
            <div>tak</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
