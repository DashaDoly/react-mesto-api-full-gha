import Form from "../form/Form";

export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose, onSubmit, isSend, sendingTitle, isValid}) {
    return (
        <div className={`popup popup_for_${name} ${isOpen && "popup_opened"}`} onClick={onClose}>
        <div className="popup__container" onClick={evt => evt.stopPropagation()}>
          <button className="popup__close-button" onClick={onClose} />
          <h2 className="popup__heading">{title}</h2>
          <Form
            name={name}
            titleButton={titleButton}
            children={children}
            onSubmit={onSubmit}
            isSend={isSend}
            sendingTitle={sendingTitle}
            isValid={isValid}
          />
        </div>
      </div>
    )
}
