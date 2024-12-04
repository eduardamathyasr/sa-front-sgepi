import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../pages/editar.css';

const EditarEpi = () => {
    const { epiId } = useParams(); // Pegando o ID da URL
    const navigate = useNavigate();

    const [epi, setEpi] = useState({
        nome: '',
        numeroCA: '',
        qualidade: '',
        validade: ""
    });

    useEffect(() => {
        const carregarEpi = async () => {
            const resposta = await axios.get(`http://localhost:3000/listarEPI/${epiId}`);
            setEpi(resposta.data.mensagem)
            console.log(resposta)

            try {
            } catch (error) {
                console.error('Erro ao carregar dados do EPI:', error);
                alert('Erro ao carregar os dados do EPI.');
            }
        };

        carregarEpi()
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEpi((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const resposta = await axios.put(`http://localhost:3000/editarEPI/${epiId}`, epi);
            if (resposta.status === 200) {
                alert('EPI atualizado com sucesso!');
                navigate('/info'); // Redireciona para a lista de EPIs
            } else {
                alert('Erro ao atualizar o EPI.');
            }
        } catch (error) {
            console.error('Erro ao atualizar o EPI:', error);
            alert('Erro ao salvar as alterações, tente novamente.');
        }
    };

    return (
        <div>
            <h1>Atualizar EPI</h1>
            <div className="container">
                <form id="form-editar-epi">
                    <div className="form-group">
                        <label htmlFor="nome">Nome do EPI:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={epi.nome}
                            onChange={handleChange}
                            placeholder="Nome do EPI"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataValidade">Data de Validade:</label>
                        <input
                            type="text"
                            id="dataValidade"
                            name="validade"
                            value={epi.validade}
                            onChange={handleChange}
                            placeholder="Data Validade"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numeroCA">Número do CA:</label>
                        <input
                            type="text"
                            id="numeroCA"
                            name="numeroCA"
                            value={epi.numeroCA}
                            onChange={handleChange}
                            placeholder="Número do CA"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="qualidade"
                            value={epi.qualidade}
                            onChange={handleChange}
                            required
                        >
                            <option value="Qualificado">Qualificado</option>
                            <option value="Desgastado">Desgastado</option>
                            <option value="Manutenção">Manutenção</option>
                            <option value="Expirado">Expirado</option>
                        </select>
                    </div>
                    <button type="button" onClick={handleSave}>
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditarEpi;
