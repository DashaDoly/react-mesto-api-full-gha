import { Link } from "react-router-dom";
import Form from "../form/Form";

export default function SignSection({name, title, titleButton, children, onSubmit, isSend, sendingTitle, isValid}) {
    return (
      <section className={`sign sign_for_${name}`}>
        <h2 className="sign__heading">{title}</h2>
        <Form
          name={name}
          titleButton={titleButton}
          children={children}
          onSubmit={onSubmit}
          isSend={isSend}
          sendingTitle={sendingTitle}
          isValid={isValid}
        />
        {name === 'register' && <p className="sign__caption">Уже зарегистрированы? <Link to={'/sign-in'} className="sign__caption-link">Войти</Link></p>}
      </section>
    )
}
