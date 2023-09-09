export default function Form({name, titleButton, children, onSubmit, isSend, sendingTitle, isValid=true }) {
  return (
    <form
    className={`form form_for_${name}`}
    name={`form-${name}`}
    noValidate
    onSubmit={onSubmit}
    >
    {children}
    <button
      type="submit"
      className={`form__submit-button ${(name === 'register' || name ===  'login') && 'form__submit-button_for_sign'} ${isValid ? '' : 'form__submit-button_disabled'}`}
      disabled={isSend}
    >
      {isSend ? sendingTitle || "Сохранение..." : titleButton || "Сохранить"}
    </button>
  </form>
  )
}
