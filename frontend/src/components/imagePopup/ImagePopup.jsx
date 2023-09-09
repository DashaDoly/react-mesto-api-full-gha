export default function ImagePopup({dataCard, isOpen, onClose}) {
    return (
        <div className={`popup popup_for_image-zoom ${isOpen && "popup_opened"}`} onClick={onClose}>
        <div className="popup__figure-container" onClick={evt => evt.stopPropagation()}>
          <button className="popup__close-button" onClick={onClose}/>
          <figure className="popup__figure">
            <img
              src={dataCard.link ? dataCard.link : "#"}
              alt={dataCard.name ? dataCard.name : "#"}
              className="popup__image"
            />
            <figcaption className="popup__caption">{dataCard.name}</figcaption>
          </figure>
        </div>
      </div>
    )
}
