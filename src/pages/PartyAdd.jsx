import React, {useReducer, useState} from 'react';
import MainLayout from "../layouts/MainLayout";
import PartyFormContainer from "../components/PartyFormContainer";
import {initialInputs, inputsReducer} from "../components/PartyFormContainer/reducer";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import AdminDashboard from "../components/specific/Admin/AdminDashboard";

function mapPartytoInputs(party) {
    return {
        name: {
            label: 'Nome do Partido ou Candidato',
            type: 'text',
            name: 'name',
            value: party.name || '',
            error: ''
        },
        color: {
            label: 'Cor Oficial',
            type: 'color',
            name: 'color',
            value: party.color || '#000000',
            error: ''
        },
        imageURL: {
            label: 'URL da Imagem',
            type: 'text',
            name: 'imageURL',
            value: party.logoUrl || party.imageUrl || '',
            error: ''
        },
        description: {
            label: 'Descrição',
            type: 'textarea',
            name: 'description',
            value: party.description || '',
            error: ''
        }
    }
}



const PartyAdd = ({party}) => {
    const navigate = useNavigate();
    const [form, dispatchInputs] = useReducer(inputsReducer, party ? mapPartytoInputs(party) : initialInputs);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatchInputs({type: `SET_${name.toUpperCase()}`, payload: {value, error: ''}});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isEditing = !!party;
            let response;

            if (isEditing) {
                response = await api.put(`/organisations/${party.id}`, {
                    name: form.name.value,
                    color: form.color.value,
                    imageURL: form.imageURL.value,
                    description: form.description.value,
                    electionId: party.electionId || null,
                });
                } else {


            const body = new FormData();
            body.set("name", form.name.value);
            body.set("color", form.color.value);
            body.set("imageURL", form.imageURL.value);
            body.set("description", form.description.value);

             response = await api.post('/parties', body);
            }
            console.log("response: ", response);
            if (response.status === 200) {
                //navigate(`/parties/${response.data?.id}`);
                navigate("/admin/edit/parties")
            }
        } catch (err) {
            console.error('Failed to save party.', err)
        }
    };

    return (
        <AdminDashboard>
        <MainLayout className="dflxColumn g20" style={{minHeight: "76vh"}}>
            <h2>{party ? 'Editar' : 'Adicionar'} Partido</h2>

            <form onSubmit={handleSubmit} className="party-form" style={{width: "50vw"}}>
                <PartyFormContainer
                    form={form}
                    handleChange={handleChange}/>

                <button type="submit">{'Submeter'}</button>
            </form>
        </MainLayout>
        </AdminDashboard>
    );
};

export default PartyAdd;

