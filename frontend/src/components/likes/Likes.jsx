import { useState, useEffect } from "react";
import api from "../../utils/api.js";

export default function Likes({ likes, my_id, card_id }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some(item => my_id === item._id))
  }, [likes, my_id])

  function handleLike() {
    if (isLike) {
      api.deleteLike(card_id, localStorage.jwt)
        .then(res => {
          setIsLike(false);
          setCount(res.likes.length);
        })
      .catch(error => console.error(`Ошибка при удалении лайка ${error}`))
    } else {
      api.addLike(card_id, localStorage.jwt)
        .then(res => {
          setIsLike(true);
          setCount(res.likes.length);
        })
      .catch(error => console.error(`Ошибка при добавлении лайка ${error}`))
    }
  }

  return (
    <div className="place__like">
      <button
        type="button"
        className={`place__like-button ${isLike ? 'place__like-button_active' : ''}`}
        aria-label="кнопка добавления лайка"
        onClick={handleLike}
      />
      <span className="place__like-counter">{count}</span>
    </div>
  )
}
