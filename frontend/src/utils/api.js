class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
          return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // загрузка информации о пользователе с сервера
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }

  // редактирование профиля
  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.userName,
        about: data.userJob
      })
    })
      .then(this._checkResponse);
  }

  // обновление аватара пользователя
  setUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatarLink
      })
    })
      .then(this._checkResponse);
  }

  // загрузка карточек с сервера
  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }

  // добавление новой карточки
  addNewCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.placeTitle,
        link: data.placeLink
      })
    })
      .then(this._checkResponse);
  }
  // постановка лайка
  addLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
    })
      .then(this._checkResponse);
  }

  // снятие лайка
  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
    })
      .then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;
