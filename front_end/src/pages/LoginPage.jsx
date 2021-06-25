import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import AMaisAppContext from '../context/AMaisAppContext';
import { DOMAIN } from '../config';

import '../style/forms.css';

function LoginPage() {
  const history = useHistory();

  const {
    setUser,
  } = useContext(AMaisAppContext);

  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [errMessage, setErrMessage] = useState('');

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleClick = () => {
    axios.post(
      `http://${DOMAIN}/login`,
      inputValues,
    ).then(({ data }) =>{
      setUser(data)
      history.push('/escolas');
    }).catch(({ response }) => {
      if (response) {
        return setErrMessage(response.data);
      }
    });
  };

  const redirectCadastro = () => history.push('/cadastro');

  return (
    <div className="login-register">
      <form>
        <h1>Login</h1>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={ inputValues.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="pass">
          Senha
          <br />
          <input
            type="password"
            id="pass"
            name="password"
            value={ inputValues.password }
            onChange={ handleChange }
          />
        </label>
        <span>{ errMessage }</span>
        <button
          id="enter"
          type="button"
          onClick={ handleClick }
          className="bttn_submit"
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={ redirectCadastro }
          className="bttn-text"
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
