import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../pages/editar.css';

const EditarFun = () => {
  const { funcionarioId } = useParams(); // Obtém o ID do funcionário da URL
  const navigate = useNavigate();

  const [funcionario, setFuncionario] = useState({
    nome: '',
    cpf: '',
    setor: '',
  });

  useEffect(() => {
    const carregarFuncionario = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3000/listarFun/${funcionarioId}`);
        setFuncionario(resposta.data.mensagem)
      } catch (error) {
        console.error('Erro ao carregar dados do funcionário:', error);
        alert('Erro ao carregar os dados do funcionário.');
      }
    };

    carregarFuncionario()
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFuncionario((prev) => ({ ...prev, [name]: value }));
  };

  const editarFuncionarioHandler = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.put(`http://localhost:3000/editarFun/${funcionarioId}`, funcionario);
      if (resposta.status === 200) {
        alert('Funcionário atualizado com sucesso!');
        navigate('/info'); // Redireciona para a lista
      } else {
        alert('Erro ao editar o funcionário.');
      }
    } catch (error) {
      console.error('Erro ao editar funcionário:', error);
      alert('Erro ao editar o funcionário, tente novamente.');
    }
  };

  return (
    <div>
      <h1>Atualizar Funcionário</h1>
      <div className="container">
        <form onSubmit={editarFuncionarioHandler}>
          <div className="form-group">
            <label htmlFor="nome"
            >Nome do Funcionário:</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={funcionario.nome}
              onChange={handleInputChange}
              placeholder="Nome do Funcionário"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={funcionario.cpf}
              onChange={handleInputChange}
              placeholder="CPF"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="setor"
            > Setor:</label>
            <input
              type="text"
              name="setor"
              id="setor"
              value={funcionario.setor}
              onChange={handleInputChange}
              placeholder="Setor"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit">Atualizar Funcionário</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarFun;
