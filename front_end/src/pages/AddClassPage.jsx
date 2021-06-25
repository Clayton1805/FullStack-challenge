import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import AMaisAppContext from '../context/AMaisAppContext';
import { DOMAIN } from '../config';

import '../style/forms.css';

function AddClassPage() {
  const history = useHistory();
  const { idSchool } = useParams();

  const {
    user,
  } = useContext(AMaisAppContext);

  const [inputValues, setInputValues] = useState({
    className: '',
    teacherId: '',
    grade: '',
    studentsId: [],
  });
  const [teachers, setTeachers ] = useState([]);
  const [students, setStudents ] = useState([])

  const [message, setMessage] = useState('');
  const [erros, setErros] = useState({
    className: [],
    teacherId: [],
    grade: [],
    studentsId: [],
  });

  useEffect(() => {
    axios.get(
      `http://${DOMAIN}/users/teacher`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token,
        },
      }
    )
    .then(({ data }) => {
      console.log('prof', data)
      setTeachers(data)
    });
    axios.get(
      `http://${DOMAIN}/users/student`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token,
        },
      }
    )
    .then(({ data }) => {
      console.log('stud', data)
      setStudents(data)
    })
  }, [])

  const handleChangeInputValues = ({ target }) => {
    setInputValues({ ...inputValues, [target.id]: target.value });
  };

  const handleClick = () => {
    axios.post(
      `http://${DOMAIN}/classes`,
      { ...inputValues, idSchool },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token,
        },
      }
    )
    .then(() => {
      history.push(`/turmas/${idSchool}`);
    })
    .catch(({ response }) => {
      if (response) {
        if (response.data.arrayErrors) {
          const arrayClassNameErros = [];
          const arrayTeacherIdErros = [];
          const arrayGradeIdErros = [];
          const arrayStudentsIdErros = [];
          console.log('arrayErrors', response.data.arrayErrors)
          response.data.arrayErrors.forEach((objErro) => {
            if (objErro.param.split("[")[0] === 'studentsId') {
              return arrayStudentsIdErros.push(objErro);
            }
            switch (objErro.param) {
              case 'className':
                return arrayClassNameErros.push(objErro);            
              case 'teacherId':
                return arrayTeacherIdErros.push(objErro);
              case 'grade':
                return arrayGradeIdErros.push(objErro);
              default: return null;
            }
          });
          setErros({
            className: arrayClassNameErros,
            teacherId: arrayTeacherIdErros,
            grade: arrayGradeIdErros,
            studentsId: arrayStudentsIdErros,
          })
          return;
        }
        return setMessage(response.data);
      }
    });
  };

  const [numberTagSelectAlunos, setNumberTagSelectAlunos] = useState(1)

  const renderSelectAlunos = () => {
    const arrayTagSelectAlunos = [];
    for (let index = 0; index < numberTagSelectAlunos; index += 1) {
      arrayTagSelectAlunos.push(
        <select
          name={ index }
          value={inputValues.studentsId[index]}
          onChange={ ({ target }) => {
            const copyStudentsId = [...inputValues.studentsId]
            copyStudentsId[index] = target.value;
            setInputValues({
              ...inputValues,
              studentsId: copyStudentsId,
            });
          }}
          className="selects"
        >
          <option value="" selected>Selecione um aluno</option>
          {students.map(({_id, name, cpf}) => (
            <option
              value={_id}
            >
              { `${name}, cpf: ${cpf}` }
            </option>
          ))}
        </select>
      );
    }
    return arrayTagSelectAlunos;
  }

  return (
    <div className="login-register">
      <form>
        <h1>Cadastrar Turma</h1>
        <label htmlFor="className">
          Nome da turma
          <input
            type="text"
            id="className"
            placeholder="ex: SENAI"
            value={ inputValues.className }
            onChange={ handleChangeInputValues }
          />
        </label>
        <ul>
          {erros.className.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="grade">
          Serie
          <input
            type="number"
            id="grade"
            placeholder="ex: 5"
            value={ inputValues.grade }
            onChange={ handleChangeInputValues }
          />
        </label>
        <ul>
          {erros.grade.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="teacherId">
          Professor responsável
          <select
            id="teacherId"
            value={inputValues.teacherId}
            onChange={ handleChangeInputValues }
            className="selects"
          >
            <option value="" selected>Selecione um professor</option>
            {teachers.map(({_id, name, cpf}) => (
              <option
                value={_id}
              >
                { `${name}, cpf: ${cpf}` }
              </option>
            ))}
          </select>
        </label>
        <ul>
          {erros.teacherId.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label>
          Adicionar alunos
        </label>
        {renderSelectAlunos()}
        <ul>
          {erros.studentsId.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <button
          type="button"
          className="bttn-add-select"
          onClick={ () => setNumberTagSelectAlunos(numberTagSelectAlunos + 1)}
        >
          Adicionar mais um aluno
        </button>
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

export default AddClassPage;
