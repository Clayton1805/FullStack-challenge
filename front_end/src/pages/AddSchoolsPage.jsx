import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import AMaisAppContext from '../context/AMaisAppContext';
import { DOMAIN } from '../config';

import '../style/forms.css';

function AddSchoolsPage() {
  const history = useHistory();

  const {
    user,
  } = useContext(AMaisAppContext);

  const [inputValues, setInputValues] = useState({
    name: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const [erros, setErros] = useState({
    name: [],
    address: [],
  });

  const handleChangeInputValues = ({ target }) => {
    setInputValues({ ...inputValues, [target.id]: target.value });
  };

  const handleClick = () => {
    axios.post(
      `http://${DOMAIN}/schools`,
      inputValues,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token,
        },
      }
    )
    .then(() => {
      history.push('/escolas');
    })
    .catch(({ response }) => {
      if (response) {
        if (response.data.arrayErrors) {
          const arrayNameErros = [];
          const arrayAddressErros = [];
          console.log('arrayErrors', response.data.arrayErrors)
          response.data.arrayErrors.forEach((objErro) => {
            switch (objErro.param) {
              case 'name':
                return arrayNameErros.push(objErro);            
              case 'address':
                return arrayAddressErros.push(objErro);   
              default: return null;
            } 
          });
          setErros({
            name: arrayNameErros,
            address: arrayAddressErros,
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
        <h1>Cadastrar escola</h1>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            placeholder="ex: SENAI"
            value={ inputValues.name }
            onChange={ handleChangeInputValues }
          />
        </label>
        <ul>
          {erros.name.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="address">
          Endereço
          <input
            type="text"
            id="address"
            value={ inputValues.address }
            onChange={ handleChangeInputValues }
          />
        </label>
        <ul>
          {erros.address.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
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

export default AddSchoolsPage;
