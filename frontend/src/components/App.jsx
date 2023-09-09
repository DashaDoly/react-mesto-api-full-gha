import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer"
import PopupWithForm from "./popupWithForm/PopupWithForm.jsx";
import ImagePopup from "./imagePopup/ImagePopup.jsx";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup.jsx";
import Register from "./register/Register.jsx";
import Login from "./login/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from "./infoTooltip/InfoTooltip.jsx";
import { register, authorize, getUserData } from "../utils/auth.js";

function App() {
  const navigate = useNavigate();

  // стейт попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isZoomImagePopupOpen, setIsZoomImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [dataZoomCard, setDataZoomCard] = useState({});
  const [isSend, setIsSend] = useState(false);

  // стейты контекста
  const [currentUser, setCurrentUser] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  // стейты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState('');

  // стейты для регистрации, логина
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const setStatesToClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsZoomImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }, [])

  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setStatesToClosePopups();
      document.removeEventListener('keydown', closePopupByEsc);
    }
  }, [setStatesToClosePopups])

  const closePopups = useCallback(() => {
    setStatesToClosePopups();
    document.removeEventListener('keydown', closePopupByEsc);
  }, [setStatesToClosePopups, closePopupByEsc])

  function setEventListenerForDocument() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerForDocument();
  }

  function handleTrashButtonClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleCardClick(dataCard) {
    setIsZoomImagePopupOpen(true);
    setDataZoomCard(dataCard);
    setEventListenerForDocument();
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsSend(true);
    api.deleteCard(deleteCardId, localStorage.jwt)
      .then(res => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }));
        closePopups();
        setIsSend(false);
      })
      .catch(error => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true)
    api.setUserInfo(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res);
        closePopups();
        reset();
        setIsSend(false)
      })
      .catch(error => console.error(`Ошибка при редактировании профиля ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true)
    api.setUserAvatar(dataUser, localStorage.jwt)
    .then(res => {
        setCurrentUser(res);
        closePopups();
        reset();
        setIsSend(false)
    })
      .catch(error => console.error(`Ошибка при редактировании аватара ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleAddPlace(dataCard, reset) {
    setIsSend(true)
    api.addNewCard(dataCard, localStorage.jwt)
      .then(res => {
        setCards([res, ...cards])
        closePopups();
        reset();
        setIsSend(false)
      })
      .catch(error => console.error(`Ошибка при создании новой карточки ${error}`))
      .finally(() => setIsSend(false))
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
    .then(([dataUser, dataCards]) => {
      setCurrentUser(dataUser);
      setCards(dataCards);
    })
      .catch(error => console.error(`Ошибка при загрузке исходных данных ${error}`))
  }, []);

  function handleRegister(password, email) {
    setIsSend(true)
    register(password, email)
      .then(() => {
        setIsInfoTooltipOpen(true)
        setIsSuccess(true)
        window.scrollTo(0, 0)
        navigate('/sign-in')
      })
      .catch(error => {
        setIsInfoTooltipOpen(true)
        setIsSuccess(false)
        console.error(`Ошибка при регистрации ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleAuthorize(password, email) {
    setIsSend(true)
    authorize(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        window.scrollTo(0, 0)
        navigate('/')
      })
      .catch(error => {
        setIsInfoTooltipOpen(true)
        setIsSuccess(false)
        console.error(`Ошибка при авторизации ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then(res => {
          setUserEmail(res.email)
          setIsLoggedIn(true)
          navigate('/')
        })
        .catch(error => console.error(`Ошибка при повторном входе ${error}`))
    } else {
      setIsLoggedIn(false)
    }
  }, [navigate])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">

        <Routes>
          <Route path="/" element={
            <>
              <Header name="main" userEmail={userEmail} />
              <ProtectedRoute
                element={Main}
                loggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onTrashClick={handleTrashButtonClick}
                cards={cards}
              />
            </>
          } />
          <Route path="/sign-up" element={
            <>
              <Header name="signup"/>
              <Register onRegister={handleRegister} isSend={isSend}/>
            </>
          } />
          <Route path="/sign-in" element={
            <>
              <Header name="signin" />
              <Login onLogin={handleAuthorize} isSend={isSend} />
            </>
          } />
          <Route path="*" element={ <Navigate to="/" replace/> } />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopups}
          isSuccess={isSuccess}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
          isSend={isSend}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSend={isSend}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
          onAddPlace={handleAddPlace}
          isSend={isSend}
          sendingTitle="Создание..."
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closePopups}
          onSubmit={handleCardDelete}
          isSend={isSend}
          sendingTitle="Удаление..."
        />

        <ImagePopup
          dataCard={dataZoomCard}
          isOpen={isZoomImagePopupOpen}
          onClose={closePopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
