import { useState } from "react";

const useCustomForm = (form_fields) => {
    const [form_values_state, setFormValuesState] = useState(form_fields);

    const handleChangeInputValue = (event) => {
        const input_name = event.target.name;
        const input_value = event.target.value;
        console.log("Input Name:", input_name, "Input Value:", input_value);
        setFormValuesState(
            (prev_form_values_state) => {
                return {
                    ...prev_form_values_state,
                    [input_name]: input_value
                }
            }
        ) 
    }

    return {
        form_values_state,
        handleChangeInputValue
    }
};

export default useCustomForm;
