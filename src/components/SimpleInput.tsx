import { FormEvent } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = () => {
    const {
        value: enteredName,
        isValid: isNameValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput({ validateFn: (value: string) => value.trim().length > 0 });

    const {
        value: enteredEmail,
        isValid: isEmailValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput({ validateFn: (value: string) => value.trim().includes('@') });

    const isFormValid = isNameValid && isEmailValid;

    const formSubmitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (!isNameValid) return;
        console.log(enteredName);

        resetNameInput();
        resetEmailInput();
    };

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    value={enteredName}
                    onBlur={nameBlurHandler}
                    onChange={nameChangeHandler} />
                {nameInputHasError && <p className="error-text"> Name must not be empty. </p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input
                    type='text'
                    id='email'
                    value={enteredEmail}
                    onBlur={emailBlurHandler}
                    onChange={emailChangeHandler} />
                {emailInputHasError && <p className="error-text"> Please enter valid email. </p>}
            </div>
            <div className="form-actions">
                <button disabled={!isFormValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
