import preventDefault from "../../helpers/preventDefault";
import InputTypes from "../../interfaces/types/InputTypes";
import AddInput from "../simple/AddInput";

const AddInputsPreview: React.FC<{
  newInputType: InputTypes;
  newInputPlaceholder: string;
  newInputName: string;
  newInputRequired: boolean;
}> = ({
  newInputName,
  newInputType,
  newInputPlaceholder,
  newInputRequired,
}) => {
  return (
    <form id="preview" onSubmit={preventDefault}>
      <div>
        <h1 className="text-2xl font-bold">Preview:</h1>
        {newInputType} input field.
      </div>
      <table className="border-separate border-spacing-3">
        <tr>
          <AddInput
            type={newInputType}
            placeholder={newInputPlaceholder}
            name={newInputName}
            required={newInputRequired}
          />
        </tr>
      </table>
    </form>
  );
};

export default AddInputsPreview;
