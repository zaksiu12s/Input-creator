import DatePicker from "../layout/DatePicker";

const AddInput: React.FC<{
  type: string;
  name: string;
  required: boolean;
  placeholder: string;
  radio?: string[] | undefined;
}> = ({ type, name, required, placeholder, radio }) => {
  if (["Text", "Password", "Number"].includes(type)) {
    return (
      <>
        <td className="break-all">
          <div className="flex justify-end items-center flex-wrap break-all">
            <label className="font-bold first-letter:uppercase text-wrap break-all">
              {name == "" ? "Tekst" : name}
              {required ? <span className="text-red-500">*</span> : ""}
            </label>
          </div>
        </td>
        <td>
          <div className="flex relative">
            <input
              type={type}
              required={required}
              placeholder={placeholder}
              className={"border-2 flex-1 rounded-md p-1 "}
            />
          </div>
        </td>
      </>
    );
  } else if (["Date"].includes(type)) {
    return (
      <>
        <td>
          <div className="flex justify-end items-center flex-wrap break-all">
            <label className="font-bold first-letter:uppercase text-wrap break-all">
              {name == "" ? "Tekst" : name}
              {required ? <span className="text-red-500">*</span> : ""}
            </label>
          </div>
        </td>
        <td>
          <div className="flex">
            <DatePicker />
          </div>
        </td>
      </>
    );
  } else if (["Textarea"].includes(type)) {
    return (
      <>
        <td className="break-all">
          <div className="flex justify-end items-center flex-wrap break-all">
            <label className="font-bold first-letter:uppercase text-wrap break-all">
              {name == "" ? "Tekst" : name}
              {required ? <span className="text-red-500">*</span> : ""}
            </label>
          </div>
        </td>
        <td>
          <div className="flex relative">
            <textarea
              required={required}
              placeholder={placeholder}
              className={"border-2 flex-1 rounded-md p-1 "}
            />
          </div>
        </td>
      </>
    );
  } else if (["Radio"].includes(type)) {
    return (
      <>
        <td className="break-all">
          <div className="flex justify-end items-center flex-wrap break-all">
            <label
              className="font-bold first-letter:uppercase text-wrap break-all"
              htmlFor={name}
            >
              {name}
              {required ? <span className="text-red-500">*</span> : ""}
            </label>
          </div>
        </td>
        <td>
          {radio?.map((radioOption) => (
            <>
              <input
                type="radio"
                name={name}
                value={radioOption.trim()}
                placeholder={name}
              />
              <span className="p-1 pr-3">{radioOption.trim()}</span>
              <br></br>
            </>
          ))}
        </td>
      </>
    );
  } else {
    return (
      <>
        <td></td>
        <td className="flex justify-center items-center flex-wrap break-all">
          <button
            type="button"
            className="bg-gray-200 py-1.5 px-3 rounded-md text-wrap break-all"
          >
            {name == "" ? "Tekst" : name}
          </button>
        </td>
      </>
    );
  }
};

export default AddInput;
