import { renderToStaticMarkup } from "react-dom/server";
import { Input } from "../interfaces/classes/Input";
import AddInput from "../components/simple/AddInput";

const generateInputs = (
  inputs: Input[],
  useStaticRender = false,
  nextFunction: (index: number, nextIndex: number) => void,
  handleInputDelete: (index: number) => void,
  handleEditData: (index: number) => void
) => {
  const html = inputs.map((input, index) => {
    return (
      <>
        <tr>
          <AddInput
            type={input.getType()}
            name={input.getName()}
            required={input.getRequired()}
            placeholder={input.getPlaceholder()}
            radio={input.getRadioOptions()}
          />
          <td>
            {index + 1 < inputs.length ? (
              <svg
                className="cursor-pointer hover:stroke-blue-700 rotate-180"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                onClick={() => {
                  if (nextFunction) {
                    nextFunction(index, index + 1);
                  }
                }}
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            ) : (
              ""
            )}
          </td>
          <td>
            <svg
              className="cursor-pointer hover:stroke-blue-300"
              onClick={() => {
                handleEditData(index);
              }}
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </td>
          <td>
            <svg
              className="cursor-pointer hover:stroke-red-500"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              onClick={() => {
                handleInputDelete(index);
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="3 6 5 6 21 6" />{" "}
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
              <line x1="10" x2="10" y1="11" y2="17" />{" "}
              <line x1="14" x2="14" y1="11" y2="17" />{" "}
            </svg>
          </td>
        </tr>
      </>
    );
  });

  if (useStaticRender) {
    return renderToStaticMarkup(
      <form>
        <table className="border-separate border-spacing-1">{html}</table>
      </form>
    );
  }

  return <table className="border-separate border-spacing-3">{html}</table>;
};

export default generateInputs;
