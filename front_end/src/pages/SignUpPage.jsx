import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import AMaisAppContext from '../context/AMaisAppContext';
import { DOMAIN } from '../config';

import '../style/forms.css';

function SignUpPage() {
  const history = useHistory();

  const {
    setUser,
  } = useContext(AMaisAppContext);

  const [typeUser, setTypeUser] = useState('student')

  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    namesOfResponsibles: [],
    contacts: [],
  });
  const [message, setMessage] = useState('');
  const [erros, setErros] = useState({
    name: [],
    email: [],
    password: [],
    cpf: [],
    namesOfResponsibles: [],
    contacts: [],
  });

  const handleChangeInputValues = ({ target }) => {
    setInputValues({ ...inputValues, [target.id]: target.value });
  };

  const handleChangeInputValuesArray =(target, index) => {
    const copyInputValues = [...inputValues[target.name]]
    copyInputValues[index] = target.value;
    setInputValues({ ...inputValues, [target.name]: copyInputValues })}

  const handleChangeTypeUser = ({target}) => setTypeUser(target.id);

  const handleClick = () => {
    axios.post(
      `http://${DOMAIN}/users/${typeUser}`,
      inputValues,
    )
    .then(({ data }) => {
      setUser(data)
      history.push('/escolas');
    })
    .catch(({ response }) => {
      if (response) {
        if (response.data.arrayErrors) {
          const arrayEmailErros = [];
          const arrayPasswordErros = [];
          const arrayNameErros = [];
          const arrayCpfErros = [];
          const arrayNamesOfResponsiblesErros = [];
          const arrayContactsErros = [];
          response.data.arrayErrors.forEach((objErro) => {
            switch (objErro.param) {
              case 'email':
                return arrayEmailErros.push(objErro);            
              case 'password':
                return arrayPasswordErros.push(objErro);   
              case 'name':
                return arrayNameErros.push(objErro);
              case 'cpf':
                return arrayCpfErros.push(objErro);
              case 'namesOfResponsibles':
              case 'namesOfResponsibles[0]':
              case 'namesOfResponsibles[1]':
                return arrayNamesOfResponsiblesErros.push(objErro);
              case 'contacts':
              case 'contacts[0]':
              case 'contacts[1]':
                return arrayContactsErros.push(objErro);
              default: return null;
            } 
          });
          setErros({
            name: arrayNameErros,
            email: arrayEmailErros,
            password: arrayPasswordErros,
            cpf: arrayCpfErros,
            namesOfResponsibles: arrayNamesOfResponsiblesErros,
            contacts: arrayContactsErros,
          })
          return;
        }
        return setMessage(response.data);
      }
    });
  };

  return (
    <div className="login-register">
      <div>
        <label htmlFor="student">
          <input
            type="radio"
            id="student"
            name="type_user"
            checked={typeUser === 'student'}
            onChange={ handleChangeTypeUser }
          />
          estudante
        </label>
        <label htmlFor="teacher">
          <input
            type="radio"
            id="teacher"
            name="type_user"
            checked={typeUser === 'teacher'}
            onChange={ handleChangeTypeUser }
          />
          professor
        </label>
        <label htmlFor="director">
          <input
            type="radio"
            id="director"
            name="type_user"
            checked={typeUser === 'director'}
            onChange={ handleChangeTypeUser }
          />
          diretor
        </label>
      </div>
      <form>
        <h1>Cadastro</h1>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            placeholder="ex: José Rodolfo"
            value={ inputValues.name }
            onChange={ handleChangeInputValues }
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
            placeholder="ex: jose@gmail.com"
            value={ inputValues.email }
            onChange={ handleChangeInputValues }
          />
        </label>
        <ul>
          {erros.email.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="cpf">
          cpf
          <input
            type="text"
            id="cpf"
            placeholder="ex: 11533741883"
            value={ inputValues.cpf }
            onChange={ handleChangeInputValues }
          />
        </label>
        <ul>
          {erros.cpf.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            placeholder="ex: rio%86"
            value={ inputValues.password }
            onChange={ handleChangeInputValues }
          />
        </label>
        <ul>
          {erros.password.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        {typeUser === 'student' && (
          <>
            <label htmlFor="namesOfResponsibles">
              Nome dos responsáveis
            </label>

            <input
              type="text"
              id="namesOfResponsibles"
              name="namesOfResponsibles"
              placeholder="ex: Gilson Rodolfo Da Silva"
              value={ inputValues.namesOfResponsibles[0] }
              onChange={ ({ target }) => handleChangeInputValuesArray(target, 0) }
            />
            <ul>
              {erros.namesOfResponsibles.map((erros, index) => {
                const { msg, param } = erros;
                if (param === 'namesOfResponsibles[0]') return <li key={index}>{ msg }</li>
                return <></>
              })}            
            </ul>
            <input
              type="text"
              name="namesOfResponsibles"
              placeholder="ex: Aline de fatima (opcional)"
              value={ inputValues.namesOfResponsibles[1] }
              onChange={ ({ target }) => handleChangeInputValuesArray(target, 1) }
            />
            <ul>
              {erros.namesOfResponsibles.map((erros, index) => {
                const { msg, param } = erros;
                if (param !== 'namesOfResponsibles[0]') return <li key={index}>{ msg }</li>
                return <></>
              })}            
            </ul>
            <label htmlFor="contacts">
              telefone para contato
            </label>
            <input
              type="number"
              id="contacts"
              name="contacts"
              placeholder="ex: 12996803906"
              value={ inputValues.contacts[0] }
              onChange={ ({ target }) => handleChangeInputValuesArray(target, 0) }
            />
            <ul>
              {erros.contacts.map((erros, index) => {
                const { msg, param } = erros;
                if (param === 'contacts[0]') return <li key={index}>{ msg }</li>
                return <></>
              })}            
            </ul>
            <input
              type="number"
              name="contacts"
              placeholder="ex: 12996803906 (opcional)"
              value={ inputValues.contacts[1] }
              onChange={ ({ target }) => handleChangeInputValuesArray(target, 1) }
            />
            <ul>
              {erros.contacts.map((erros, index) => {
                const { msg, param } = erros;
                if (param !== 'contacts[0]') return <li key={index}>{ msg }</li>
                return <></>
              })}            
            </ul>
          </>
        )}
        <p>{message}</p>
        <button
          type="button"
          onClick={ handleClick }
          className="bttn_submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
