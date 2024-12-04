import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/cadastro.css';

const CadastroEpi = () => {
    const [nome, setNome] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [numeroCA, setNumeroCA] = useState('');
    const [status, setStatus] = useState('Qualificado');
    const [epis, setEpis] = useState(() => {
    });

    // Hook de navegação
    const navigate = useNavigate();

    // Função para cadastrar um novo EPI
    const cadastrarEpi = (event) => {
        event.preventDefault();

        // Cria um novo objeto EPI
        const novoEpi = { nome, validade:dataValidade, numeroCA, qualidade:status };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/cadastrarEPi',
            headers: {
                'Content-Type': 'application/json'
            },
            data: novoEpi
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        setNome('');
        setDataValidade('');
        setNumeroCA('');
        setStatus('Qualificado');
    };

    // Função para navegar para a página de cadastro de funcionário
    const irParaCadastroFuncionario = () => {
        navigate('/cadastroFun'); // Substitua pelo caminho correto
    };

    return (
        <div>
            <h1>Cadastro de EPI</h1>
            <div className="containerCad">
                <form onSubmit={cadastrarEpi}>
                    <div className="form">
                        <label htmlFor="nome">Nome do EPI:</label>
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
                        <label htmlFor="dataValidade">Data de Validade:</label>
                        <input
                            type="text"
                            id="dataValidade"
                            value={dataValidade}
                            onChange={(e) => setDataValidade(e.target.value)}
                            placeholder="Data de Validade"
                            required
                        />
                    </div>
                    <div className="form">
                        <label htmlFor="numeroCA">Número do Certificado de Aprovação:</label>
                        <input
                            type="text"
                            id="numeroCA"
                            value={numeroCA}
                            onChange={(e) => setNumeroCA(e.target.value)}
                            placeholder="Número CA"
                            required
                        />
                    </div>
                    <div className="form">
                        <label htmlFor="status">Status do Equipamento:</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="Qualificado">Qualificado</option>
                            <option value="Desgastado">Desgastado</option>
                            <option value="Manutenção">Manutenção</option>
                            <option value="Expirado">Expirado</option>
                        </select>
                    </div>

                    <button className="botaoCadastro" type="submit">
                        Cadastrar
                    </button>
                </form>

                <button className="botao" onClick={irParaCadastroFuncionario}>
                    Cadastro Funcionário
                </button>

            </div>
        </div>
    );
};

export default CadastroEpi;
