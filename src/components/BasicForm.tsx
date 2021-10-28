import { FormEvent } from "react";
import useValidInput from "../hooks/use-valid-input";

const BasicForm = () => {
    const {
        value: firstName,
        isValid: isValidFirstname,
        hasError: firstnameHasError,
        changeHandler: firstnameChangeHandler,
        blurHandler: firstnameBlurHandler,
        reset: resetFirstname
    } = useValidInput({ validateFn: (text: string) => text.trim().length > 0 });

    const {
        value: lastName,
        isValid: isValidLastname,
        hasError: lastnameHasError,
        changeHandler: lastnameChangeHandler,
        blurHandler: lastnameBlurHandler,
        reset: resetLastname
    } = useValidInput({ validateFn: (text: string) => text.trim().length > 0 });

    const {
        value: email,
        isValid: isValidEmail,
        hasError: emailHasError,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
        reset: resetEmail
    } = useValidInput({ validateFn: (text: string) => text.includes('@') });

    const isFormValid = isValidFirstname && isValidLastname && isValidEmail;

    const firstnameClasses = firstnameHasError ? 'form-control invalid' : 'form-control';
    const lastnameClasses = lastnameHasError ? 'form-control invalid' : 'form-control';
    const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!isFormValid) return;

        resetFirstname();
        resetLastname();
        resetEmail();
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='control-group'>
                <div className={firstnameClasses}>
                    <label htmlFor='firstname'>First Name</label>
                    <input
                        type='text'
                        id='firstname'
                        value={firstName}
                        onBlur={firstnameBlurHandler}
                        onChange={firstnameChangeHandler} />
                    {firstnameHasError && <p className="error-text"> Firstname must not be empty. </p>}
                </div>
                <div className={lastnameClasses}>
                    <label htmlFor='lastname'>Last Name</label>
                    <input
                        type='text'
                        id='lastname'
                        value={lastName}
                        onBlur={lastnameBlurHandler}
                        onChange={lastnameChangeHandler} />
                    {lastnameHasError && <p className="error-text"> Lastname must not be empty. </p>}
                </div>
            </div>
            <div className={emailClasses}>
                <label htmlFor='email'>E-Mail Address</label>
                <input
                    type='text'
                    id='email'
                    value={email}
                    onBlur={emailBlurHandler}
                    onChange={emailChangeHandler} />
                {emailHasError && <p className="error-text"> Please enter valid email. </p>}
            </div>
            <div className='form-actions'>
                <button type='submit' disabled={!isFormValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
