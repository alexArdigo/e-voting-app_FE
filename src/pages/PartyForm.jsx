import React, {useReducer, useState} from 'react';
import MainLayout from "../layouts/MainLayout";
import PartyFormContainer from "../components/PartyFormContainer";
import {initialInputs, inputsReducer} from "../components/PartyFormContainer/reducer";
import {useNavigate} from "react-router-dom";
import api from "../services/api";

const PartyForm = ({party}) => {
    const navigate = useNavigate();
    const [form, dispatchInputs] = useReducer(inputsReducer, party || initialInputs);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatchInputs({type: `SET_${name.toUpperCase()}`, payload: {value, error: ''}});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = new FormData();
            body.set("name", form.name.value);
            body.set("color", form.color.value);
            body.set("imageURL", form.imageURL.value);
            body.set("description", form.description.value);

            const response = await api.post('/parties', body);
            console.log("response: ", response);
            if (response.status === 200) {
                navigate(`/parties/${response.data?.id}`);
            }
        } catch (err) {
            console.error('Failed to save party.', err)
            setError('Failed to save party.');
        }
    };

    return (
        <MainLayout className="dflxColumn g20" style={{minHeight: "76vh"}}>
            <h2>{party ? 'Editar' : 'Adicionar'} Partido</h2>

            <form onSubmit={handleSubmit} className="party-form" style={{width: "50vw"}}>
                <PartyFormContainer
                    form={form}
                    handleChange={handleChange}/>

                <button type="submit">{'Submeter'}</button>
            </form>
        </MainLayout>
    );
};

export default PartyForm;

