import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import AMaisAppContext from '../context/AMaisAppContext';
import { DOMAIN } from '../config';

import '../style/CSS.css';

function SignUpPage() {
  const history = useHistory();

  const {
    setUser,
  } = useContext(AMaisAppContext);

  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [erros, setErros] = useState({
    name: [],
    email: [],
    password: [],
  });

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleClick = () => {
    axios.post(
      `http://${DOMAIN}/register`,
      inputValues,
    )
    .then(({ data }) => {
      setUser(data)
      history.push('/sorteio');
      // setMessage('Um email foi enviado para você, onde você pode validar sua conta.');
    })
    .catch(({ response }) => {
      if (response) {
        if (response.data.arrayErrors) {
          const arrayEmailErros = [];
          const arrayPasswordErros = [];
          const arrayNameErros = [];
    
          response.data.arrayErrors.forEach((objErro) => {
            switch (objErro.param) {
              case 'email':
                return arrayEmailErros.push(objErro);            
              case 'password':
                return arrayPasswordErros.push(objErro);   
              case 'name':
                return arrayNameErros.push(objErro);   
              default: return null;
            } 
          });
          setErros({
            name: arrayNameErros,
            email: arrayEmailErros,
            password: arrayPasswordErros,
          })
          return;
        }
        return setMessage(response.data);
      }
    });
  };

  return (
    <div className="login-register">
      <form>
        <h1>Cadastro</h1>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            name="name"
            placeholder="ex: José Rodolfo"
            value={ inputValues.name }
            onChange={ handleChange }
          />
        </label>
        <ul>
          {erros.name.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ex: jose@gmail.com"
            value={ inputValues.email }
            onChange={ handleChange }
          />
        </label>
        <ul>
          {erros.email.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            name="password"
            placeholder="ex: rio%86"
            value={ inputValues.password }
            onChange={ handleChange }
          />
        </label>
        <ul>
          {erros.password.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <p>{message}</p>
        <button
          id="sign-up"
          type="button"
          onClick={ handleClick }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
