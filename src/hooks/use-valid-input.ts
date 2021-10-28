import { ChangeEvent, useState } from "react";

const useValidInput = ({ validateFn }: { validateFn: (text: string) => boolean }) => {
    const [input, setInput] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateFn(input);
    const hasError = !isValid && isTouched;

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const blurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setInput('');
        setIsTouched(false);
    };

    return {
        value: input,
        isValid,
        hasError,
        changeHandler,
        blurHandler,
        reset
    }
};

export default useValidInput;