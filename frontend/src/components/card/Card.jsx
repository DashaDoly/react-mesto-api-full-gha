import {useContext} from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Likes from '../likes/Likes.jsx';

export default function Card({ card, onCardClick, onTrashClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <article className="place">

      {currentUser._id === card.owner._id &&
        <button
        type="button"
        className="place__trash-button"
        aria-label="кнопка удаления фото-карточки"
        onClick={() => onTrashClick(card._id)}
        />
      }
      <img
        src={card.link}
        alt={card.name}
        className="place__photo"
        onClick={() => onCardClick({ name: card.name, link: card.link })}
      />
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
        <Likes likes={card.likes} my_id={currentUser._id} card_id={card._id} />
      </div>
    </article>
  )
}
