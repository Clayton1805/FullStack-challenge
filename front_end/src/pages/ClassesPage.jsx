import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import AMaisAppContext from '../context/AMaisAppContext';
import { DOMAIN } from '../config';

function ClassesPage() {
  const history = useHistory();
  const { idSchool } = useParams();

  const {
    user,
  } = useContext(AMaisAppContext);

  const [classes, setClasses] = useState([])

  useEffect(() => {
    axios.get(
      `http://${DOMAIN}/classes`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token,
        },
        params: {
          idSchool
        },
      }
    ).then(({ data }) => setClasses(data));
  }, []);

  return (
    <div>
      <h2>Turmas:</h2>
      {user.role === 'director' && (
        <button
          type='button'
          onClick={ () => history.push(`/turmas/cadastrar/${idSchool}`) }
        >
          Adicionar uma turma
        </button>
      )}
      {classes.length === 0 && <span>Escola não possui turmas.</span>}
      {classes.map(({_id, grade, className}) => (
        <div key={_id}>
          <Link to={`/turmas/detalhes/${idSchool}/${_id}`}>
            <p>{ `serie: ${grade}°` }</p>
            <p>{ className }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ClassesPage;
