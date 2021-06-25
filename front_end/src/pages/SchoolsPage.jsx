import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import AMaisAppContext from '../context/AMaisAppContext';
import { DOMAIN } from '../config';

function SchoolsPage() {
  const history = useHistory();

  const {
    user,
  } = useContext(AMaisAppContext);

  const [schools, setSchools] = useState([])

  useEffect(() => {
    axios.get(
      `http://${DOMAIN}/schools`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token,
        }
      }
    ).then(({ data }) => setSchools(data));
  }, [])

  return (
    <div>
      <h2>Escolas:</h2>
      {user.role === 'director' && (
        <button
          type='button'
          onClick={ () => history.push('/escolas/cadastrar') }
        >
          Adicionar uma escola
        </button>
      )}
      {schools.length === 0 && <span>Nenhuma escola cadastrada.</span>}
      {schools.map(({_id, name, address}) => (
        <div key={_id}>
          <Link to={`/turmas/${_id}`}>
            <p><b>{ name }</b></p>
            <p>{`localização: ${address}`}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SchoolsPage;
