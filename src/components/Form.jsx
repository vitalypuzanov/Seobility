import axios from 'axios';
import React, { useState } from 'react';
import FormInput from './FormInput';
import './Form.css';

function Form() {
  const [status, setStatus] = useState({
    status: '',
  });
  const [values, setValues] = useState({
    username: '',
    email: '',
    phonenumber: '',
    birthday: '',
    text: '',
  });

  function fetchSampleData() {
    let url = 'http://jsonplaceholder.typicode.com/posts';
    let method = 'post';
    return axios[method](url, {
      username: values.name,
      email: values.email,
      phonenumber: values.phonenumber,
      birthday: values.birthday,
      text: values.text,
    })
      .then((response) => {
        return true;
      })

      .catch((error) => {
        console.log('error', error);
        return false;
      })
      .then((resultBoolean) => {
        if (resultBoolean) {
          setStatus({ status: 'Форма  отправлена' });
        } else {
          setStatus({ status: 'Форма не отправлена' });
        }
        if (resultBoolean) {
          setValues({ username: '', email: '', phonenumber: '', birthday: '', text: '' });
        }

        console.log('result bulian', resultBoolean);
        return resultBoolean;
      });
  }

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Имя Фамилия',
      errorMessage: 'Два слова, через пробел от 3 до 30 симоволов заглаными',
      label: 'Имя Фамилия',
      required: true,
      pattern: '^[A-Z]{3,30} [A-Z]{3,30}$',
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      label: 'Email',
      errorMessage: 'Отсутсвует @',
      pattern: '^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$',
      required: true,
      form: 'novalidate',
    },
    {
      id: 3,
      name: 'phonenumber',
      type: 'tel',
      placeholder: 'Номер телефона',
      label: 'Номер телефона',
      errorMessage: 'неверный номер',
      pattern: '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
      required: true,
    },
    {
      id: 4,
      name: 'birthday',
      type: 'date',
      placeholder: 'Дата рождения',
      label: 'Дата рождения',
      errorMessage: 'Заполните поле',
      required: true,
    },
    {
      id: 5,
      name: 'text',
      type: 'text',
      placeholder: 'Сообщение',
      label: 'Сообщение',
      errorMessage: 'Тектст от 10 до 300',
      pattern: '^.{10,300}$',
      required: true,
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    fetchSampleData();
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Форма связи</h1>
      {inputs.map((input) => (
        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} focused="false" />
      ))}
      {status.status ? <div>{status.status}</div> : <></>}

      <button>Отправить</button>
    </form>
  );
}

export default Form;
