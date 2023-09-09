import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  // console.log(isValid)
  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((initialValues) => {
      return {...initialValues, [name]: value}
    })

    setErrors((initialErrors) => {
      return {...initialErrors, [name]: validationMessage}
    })

    setIsInputValid((initialIsInputValid) => {
      return {...initialIsInputValid, [name]: valid}
    })

    setIsValid(form.checkValidity())
  }

  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsInputValid({});
    setIsValid(false);
  }

  const setValue = useCallback((name, value) => {
    setValues((initialValues) => {
      return {...initialValues, [name]: value}
    })
  }, [])

  return {
    values, errors, isInputValid, isValid, handleChange, reset, setValue
  }
}
