import Card from "../card/Card.jsx";
import {useContext} from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onTrashClick, cards }) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile content__section">
        <div className="profile__info">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="фото профиля" className="profile__avatar" />
          </div>
          <div className="profile__description">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="кнопка открытия попапа редактирования профиля"
              onClick={onEditProfile}
            />
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="кнопка добавления фотокарточек"
          onClick={onAddPlace}
        />
      </section>
      <section className="places content__section" aria-label="Фото-карточки">
        {cards?.map(item => {
          return (
            <div key={item._id}>
              <Card card={item} onCardClick={onCardClick} onTrashClick={onTrashClick} />
            </div>
          )
        })}
      </section>
    </main>
  )
}
