import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../popupWithForm/PopupWithForm"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isInputValid, isValid, handleChange, reset, setValue } = useFormValidation();


  useEffect(() => {
    setValue("userName", currentUser.name);
    setValue("userJob", currentUser.about)
  }, [setValue, currentUser]);

  function closeWithReset() {
    onClose();
    reset({ userName: currentUser.name, userJob: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({userName: values.userName, userJob: values.userJob}, reset);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={closeWithReset}
      isSend={isSend}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        id="user-name-input"
        type="text"
        required
        minLength={2}
        maxLength={40}
        placeholder="Имя"
        name="userName"
        className={`form__input form__input_text_name ${isInputValid.userName === undefined || isInputValid.userName ? '' : 'form__input_type_error'}`}
        value={values.userName ? values.userName : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="user-name-input-error form__input-error">{errors.userName}</span>
      <input
        id="job-input"
        type="text"
        required
        minLength={2}
        maxLength={200}
        placeholder="О себе"
        name="userJob"
        className={`form__input form__input_text_job ${isInputValid.userJob === undefined || isInputValid.userJob ? '' : 'form__input_type_error'}`}
        value={values.userJob ? values.userJob : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="job-input-error form__input-error">{errors.userJob}</span>
    </PopupWithForm>
  )
}
