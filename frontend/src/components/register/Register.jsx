import useFormValidation from "../../utils/useFormValidation";
import SignSection from "../signSection/SignSection";

export default function Register({ onRegister, isSend }) {
  const { values, errors, isInputValid, isValid, handleChange } = useFormValidation();

  function handleRegister(evt) {
    evt.preventDefault();
    onRegister(values.password, values.email)
  }

  return (
    <SignSection
      name="register"
      title="Регистрация"
      titleButton="Зарегистрироваться"
      onSubmit={handleRegister}
      isSend={isSend}
      sendingTitle="Регистрация..."
      isValid={isValid}
    >
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className={`form__input form__input_type_sign ${isInputValid.email === undefined || isInputValid.email ? '' : 'form__input_type_error'}`}
        value={values.email ? values.email : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="email-input-error form__input-error">{errors.email}</span>
      <input
        name="password"
        type="password"
        required
        placeholder="Пароль"
        minLength={5}
        className={`form__input form__input_type_sign ${isInputValid.password === undefined || isInputValid.password ? '' : 'form__input_type_error'}`}
        value={values.password ? values.password : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="link-input-error form__input-error">{errors.password}</span>
    </SignSection>
  )
}
