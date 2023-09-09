export default function InfoTooltip({isOpen, onClose, isSuccess}) {
    return (
        <div className={`popup ${isOpen && "popup_opened"}`} onClick={onClose}>
        <div className="popup__container popup__container_for_tooltip" onClick={evt => evt.stopPropagation()}>
          <button className="popup__close-button" onClick={onClose}/>
            <div
              className={`popup__tooltip-image ${!isSuccess && "popup__tooltip-image_type_fail"}`}
            />
            <p className="popup__tooltip-caption">{isSuccess? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        </div>
      </div>
    )
}

