import InputTypes from "../types/InputTypes";

export class Input {
    private type: InputTypes;
    private name: string;
    private placeholder: string;
    private required: boolean;
    private radioOptions: string[] = [];

    constructor(
        type: InputTypes,
        name: string,
        placeholder: string,
        required: boolean,
        radioOptions?: string

    ) {
        this.name = name;
        this.type = type;
        this.placeholder = placeholder;
        this.required = required;

        if (type === "Submit") {
            this.required = false;
            this.placeholder = "";
        }

        if (type === "Date") {
            this.placeholder = "";
        }

        if (type === "Radio" && radioOptions !== "" && radioOptions) {
            this.placeholder = "";
            this.radioOptions = radioOptions.split(",");
        }
    }

    public getType(): string {
        return this.type;
    }

    public getPlaceholder(): string {
        return this.placeholder;
    }

    public getRequired(): boolean {
        return this.required;
    }

    public getName(): string {
        return this.name;
    }

    public getRadioOptions(): string[] {
        if (this.type === "Radio") {
            return this.radioOptions;
        }

        return this.radioOptions;
    }
}