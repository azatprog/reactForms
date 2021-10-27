import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

const SimpleInput = () => {
    const [enteredName, setEnteredName] = useState<string>('');
    const [isNameTouched, setIsNameTouched] = useState(false);

    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [isEmailTouched, setIsEmailTouched] = useState(false);

    const isNameValid = enteredName.trim().length > 0;
    const nameInputIsInvalid = !isNameValid && isNameTouched;

    const isEmailValid = enteredEmail.trim().includes('@');
    const emailInputIsInvalid = !isEmailValid && isEmailTouched;

    const isFormValid = isNameValid && isEmailValid;

    const nameInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredName(event.target.value);
    };

    const emailInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(event.target.value);
    };

    const formSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        setIsNameTouched(true);

        if (!isNameValid) return;
        console.log(enteredName);

        setEnteredName('');
        setIsNameTouched(false);

        setEnteredEmail('');
        setIsEmailTouched(false);
    };

    const nameInputBlurHandler = (_: FocusEvent<HTMLInputElement>) => {
        setIsNameTouched(true);
    };

    const emailInputBlurHandler = (_: FocusEvent<HTMLInputElement>) => {
        setIsEmailTouched(true);
    };

    const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    value={enteredName}
                    onBlur={nameInputBlurHandler}
                    onChange={nameInputChangeHandler} />
                {nameInputIsInvalid && <p className="error-text"> Name must not be empty. </p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input
                    type='text'
                    id='email'
                    value={enteredEmail}
                    onBlur={emailInputBlurHandler}
                    onChange={emailInputChangeHandler} />
                {emailInputIsInvalid && <p className="error-text"> Please enter valid email. </p>}
            </div>
            <div className="form-actions">
                <button disabled={!isFormValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
