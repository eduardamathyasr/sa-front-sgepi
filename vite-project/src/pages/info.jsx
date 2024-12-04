import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/info.css';

const Info = () => {
  const [epis, setEpis] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  const navigate = useNavigate();

  const carregarEpis = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/listarEPi',
      headers: {},
    };

    // await.get

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.mensagem));
        setEpis(response.data.mensagem);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const carregarFuncionarios = () => {
    // Configuração da requisição
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/listarFun',
      headers: {},
    };
    // Faz a requisição para carregar os funcionários
    axios
      .request(config)
      .then((response) => {
        console.log('Funcionários carregados:', response.data.mensagem);
        // Atualiza o estado com os funcionários retornados pela API
        setFuncionarios(response.data.mensagem);
      })
      .catch((error) => {
        console.error('Erro ao carregar funcionários:', error);
      });
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    carregarEpis();
    carregarFuncionarios();
  }, []);


  // Função para redirecionar para a página de retirar EPI (apenas exemplo)
  const redirecionarParaRetirarEpi = (id) => {
    navigate(`/registrarRetDev/${id}`); // Navegar para a página de registro
  };

  // Função para redirecionar para a página de editar EPI (apenas exemplo)
  const redirecionarParaEditarEpi = (epiId) => {
    navigate(`/editarEpi/${epiId}`);
  };

  // Função para remover um EPI (apenas exemplo)
  const removerEpi = (id) => {
    axios.delete(`http://localhost:3000/deletarEPI/${id}`)
      .then(() => {
        carregarEpis(); // Atualiza a lista de EPIs após a remoção
      })
      .catch((error) => {
        console.error('Erro ao remover EPI:', error);
      });
  };

  // Função para redirecionar para a página de editar funcionário (apenas exemplo)
  const redirecionarParaEditarFuncionario = (funcionarioId) => {
    navigate(`/editarFun/${funcionarioId}`);
  };

  // Função para remover um funcionário (apenas exemplo)
  const removerFuncionario = (id) => {
    axios.delete(`http://localhost:3000/deletarFun/${id}`)
      .then(() => {
        carregarFuncionarios(); // Atualiza a lista de EPIs após a remoção
      })
      .catch((error) => {
        console.error('Erro ao remover Funcionario:', error);
      });
  };

  // Função para navegar para a página de cadastro de funcionário
  const irParaCadastroFuncionario = () => {
    navigate('/cadastroFun'); // Substitua pelo caminho correto
  };

  //// modificar o html.

  return (
    <div>
      <div className="container">
        <div className="column">
          <h1>EPI's</h1>
          <div className="epi-list">
            {epis.length === 0 ? (
              <p>Não há EPIs cadastrados.</p>
            ) : (
              epis.map((epi) => (
                <div key={epi.id} className="epi-item" data-id={epi.id}>
                  <div className="item">
                    <h3 className="name">{epi.nome}</h3>
                    <p className="details">
                      CA: {epi.numeroCA}<br />
                      Validade: {epi.validade}<br />
                      Status: {epi.qualidade}
                    </p>
                    <div className="epi-actions">
                      <button className="retirar" onClick={() => redirecionarParaRetirarEpi(epi.id)}>Registrar</button>
                      <button className="editar" onClick={() => redirecionarParaEditarEpi(epi.id)}>Editar</button>
                      <button className="remover" onClick={() => removerEpi(epi.id)}>Remover</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        <div className="column">
          <h1>Funcionários</h1>
          <div className="funcionario-list">
            {funcionarios.length === 0 ? (
              <p>Não há funcionários cadastrados.</p>
            ) : (
              funcionarios.map((funcionario) => (
                <div key={funcionario.id} className="item" data-id={funcionario.id}>
                  <h3 className="name">{funcionario.nome}</h3>
                  <p className="details">CPF: {funcionario.cpf}<br />Cargo: {funcionario.setor}</p>
                  <div className="funcionario-actions">
                    <button className="editar" onClick={() => redirecionarParaEditarFuncionario(funcionario.id)}>Editar</button>
                    <button className="remover" onClick={() => removerFuncionario(funcionario.id)}>Remover</button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
      <div>
          <button className="botaoVoltaDois" onClick={irParaCadastroFuncionario}>Voltar</button>
        </div>
    </div>
  );
};

export default Info;
