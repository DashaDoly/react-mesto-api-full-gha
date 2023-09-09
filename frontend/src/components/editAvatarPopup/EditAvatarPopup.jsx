import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../popupWithForm/PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {
  const input = useRef();
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();

  function closeWithReset() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatarLink: input.current.value}, reset)
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={closeWithReset}
      isSend={isSend}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        ref={input}
        id="avatar-input"
        type="url"
        required
        placeholder="Ссылка на картинку"
        name="avatarLink"
        className={`form__input form__input_text_link ${isInputValid.avatarLink === undefined || isInputValid.avatarLink ? '' : 'form__input_type_error'}`}
        value={values.avatarLink ? values.avatarLink : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="avatar-input-error form__input-error">{errors.avatarLink}</span>
    </PopupWithForm>
  )
}
