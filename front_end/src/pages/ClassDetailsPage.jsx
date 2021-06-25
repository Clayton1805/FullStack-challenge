import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import AMaisAppContext from '../context/AMaisAppContext';
import { DOMAIN } from '../config';

function ClassDetailsPage() {
  const { idSchool, idClass } = useParams();

  const {
    user,
  } = useContext(AMaisAppContext);

  const [Class, setClass] = useState({ students: [], teacher: {}, observation: [] });

  useEffect(() => {
    axios.get(
      `http://${DOMAIN}/classes/details`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token,
        },
        params: {
          idSchool,
          idClass
        },
      }
    ).then(({ data }) => setClass(data));
  }, []);

  return (
    <div>
      <h2>{`${Class.grade}° Serie, ${Class.className}`}</h2>
      {Class.observation.length !== 0 && (
        <>
          <h3>Observações sobre a turma</h3>
          {Class.observation.map(({_id, text, date}) => (
            <div key={_id}>
              <span>{ `data: ${Date(date)}` }</span>
              <p>{ text }</p>
            </div>
          ))}
        </>
      )}
      <div>
        <h3>Professor responsável:</h3>
        <p>{ `Nome: ${Class.teacher.name}` }</p>
        <p>{ `Cpf: ${Class.teacher.cpf}` }</p>
      </div>
      {(Class.students.length === 0)
        ? <span>Turma não possui alunos.</span>
        : (
          <div>
            <h3>Alunos:</h3>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>cpf</th>
                  <th>Responsáveis</th>
                </tr>
              </thead>
              <tbody>
                {Class.students.map(({_id, name, cpf, namesOfResponsibles }) => (
                  <tr key={_id}>
                    <td>{ name }</td>
                    <td>{ cpf }</td>
                    <td>{ namesOfResponsibles.join(", ") }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}

export default ClassDetailsPage;
