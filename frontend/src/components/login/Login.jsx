import useFormValidation from "../../utils/useFormValidation";
import SignSection from "../signSection/SignSection";

export default function Login({ onLogin, isSend }) {
  const { values, errors, isInputValid, isValid, handleChange } = useFormValidation();

  function handleLogin(evt) {
    evt.preventDefault();
    onLogin(values.password, values.email)
  }

  return (
    <SignSection
      name="login"
      title="Вход"
      titleButton="Войти"
      onSubmit={handleLogin}
      isSend={isSend}
      sendingTitle="Вход..."
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
