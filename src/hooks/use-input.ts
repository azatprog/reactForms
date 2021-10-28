import { ChangeEvent, FocusEvent, useState } from 'react';

const useInput = ({ validateFn }: { validateFn: (val: string) => boolean }) => {
    const [enteredValue, setEnteredValue] = useState<string>('');
    const [isTouched, setIsTouched] = useState(false);

    const isValueValid = validateFn(enteredValue);
    const hasError = !isValueValid && isTouched;

    const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (_: FocusEvent<HTMLInputElement>) => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: isValueValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
};

export default useInput;