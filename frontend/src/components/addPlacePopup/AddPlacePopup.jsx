import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../popupWithForm/PopupWithForm"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend, sendingTitle }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();

  function closeWithReset() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({placeTitle: values.placeTitle, placeLink: values.placeLink}, reset);
  }

  return (
    <PopupWithForm
      name="place-add"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={closeWithReset}
      isSend={isSend}
      sendingTitle={sendingTitle}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        id="place-name-input"
        type="text"
        required
        minLength={2}
        maxLength={30}
        placeholder="Название"
        name="placeTitle"
        className={`form__input form__input_text_place ${isInputValid.placeTitle === undefined || isInputValid.placeTitle ? '' : 'form__input_type_error'}`}
        value={values.placeTitle ? values.placeTitle : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="place-name-input-error form__input-error">{errors.placeTitle}</span>
      <input
        id="link-input"
        type="url"
        required
        placeholder="Ссылка на картинку"
        name="placeLink"
        className={`form__input form__input_text_link ${isInputValid.placeLink === undefined || isInputValid.placeLink ? '' : 'form__input_type_error'}`}
        value={values.placeLink ? values.placeLink : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="link-input-error form__input-error">{errors.placeLink}</span>
    </PopupWithForm>
  )
}
