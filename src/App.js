import React from 'react';

const formFields = [
  {
    id: 'nome',
    label: 'Nome',
    type: 'text'
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email'
  },
  {
    id: 'senha',
    label: 'Senha',
    type: 'password'
  },
  {
    id: 'cep',
    label: 'Cep',
    type: 'text'
  },
  {
    id: 'rua',
    label: 'Rua',
    type: 'text'
  },
  {
    id: 'numero',
    label: 'Número',
    type: 'text'
  },
  {
    id: 'bairro',
    label: 'Bairro',
    type: 'text'
  },
  {
    id: 'cidade',
    label: 'Cidade',
    type: 'text'
  },
  {
    id: 'estado',
    label: 'Estado',
    type: 'text'
  },
];

const App = () => {
  const [mensagem, setMensagem] = React.useState('');

  const [form, setForm] = React.useState(
    formFields.reduce((acc, field) => {
      return {
        ...acc,
        [field.id]: '',
      };
    }, {}),
  );

  const [response, setResponse] = React.useState(null);

  function handleChange({target}) {
    const {id, value} = target;
    setForm({...form, [id]: value});
  };

  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://ranekapi.origamid.dev/json/api/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    }).then(response => {
      setResponse(response);
    });
  };

  const [select, setSelect] = React.useState('');
  
  return (
    <>
      <form>
        <textarea value={mensagem}
        onChange={({target}) => setMensagem(target.value)} 
        rows="5"
        />
        <p>{mensagem}</p>
      </form>
      <form onSubmit={handleSubmit}>
        {formFields.map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} value={form[id]} onChange={handleChange} />
          </div>
        ))}
        {response && response.ok && <p>Formulário Enviado</p>}
        <button>Enviar</button>
      </form>
      <form>
        <select value={select} onChange={({target}) => setSelect(target.value)} id="produtos">
          <option value="" disabled>Selecione</option>
          <option value="notebook">Notebook</option>
          <option value="smartphone">Smartphone</option>
          <option value="tablet">Tablet</option>
        </select>
        {select}
      </form>
    </>
  );
};

export default App;