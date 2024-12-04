import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/cadastro.css';

const CadastroFun = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [cargo, setCargo] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);

    const navigate = useNavigate();

    // Carrega os funcionários ao montar o componente
    useEffect(() => {
        const fetchFuncionarios = () => {
            axios
                .get('http://localhost:3000/listarFun')
                .then((response) => {
                    setFuncionarios(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar funcionários:', error);
                });
        };

        fetchFuncionarios();
    }, []);

    // Função para cadastrar um funcionário
    const cadastrarFuncionario = (event) => {
        event.preventDefault();

        const novoFuncionario = { nome, cpf, setor: cargo };

        axios
            .post('http://localhost:3000/cadastrarFun', novoFuncionario, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                // Atualiza a lista de funcionários localmente
                setFuncionarios((prevFuncionarios) => [...prevFuncionarios, response.data]);

                // Limpa os campos do formulário
                setNome('');
                setCpf('');
                setCargo('');

                // Navega para a página de informações
                navigate('/info');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar funcionário:', error);
            });
    };

    const irParaEpi = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Cadastro Funcionário</h1>
            <div className="containerCad">
                <form onSubmit={cadastrarFuncionario}>
                    <div className="form">
                        <label htmlFor="nome">Nome do Funcionário:</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome"
                            required
                        />
                    </div>
                    <div className="form">
                        <label htmlFor="cpf">CPF do Funcionário:</label>
                        <input
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="CPF"
                            required
                        />
                    </div>
                    <div className="form">
                        <label htmlFor="cargo">Cargo do Funcionário:</label>
                        <input
                            type="text"
                            id="cargo"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            placeholder="Cargo"
                            required
                        />
                    </div>

                    <button className="botaoCadastro" type="submit">
                        Cadastrar
                    </button>
                </form>
                <div className="botoes">
                    <button className="botaoVolta" onClick={irParaEpi}>
                        Voltar
                    </button>
                    <button className="botao" id="irParaInfo" onClick={() => navigate('/info')}>
                        Informações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CadastroFun;
