import React, {useReducer} from 'react';
import MainLayout from "../../../layouts/MainLayout";
import PartyFormContainer from "./index";
import {initialInputs, inputsReducer} from "./reducer";
import {useNavigate} from "react-router-dom";
import PartyService from "../../../services/PartyService";

function mapPartytoInputs(party) {
    return {
        name: {
            label: 'Nome do Partido',
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
            value: party.logoUrl || '',
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

function mapUniPartyToInputs(uniparty) {
    return {
        name: {
            label: 'Nome do Candidato',
            type: 'text',
            name: 'name',
            value: uniparty.name || '',
            error: ''
        },
        imageURL: {
            label: 'URL da Imagem',
            type: 'text',
            name: 'imageURL',
            value: uniparty.imageURL || '',
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
                const dto = {
                    name: form.name?.value,
                    color: form.color?.value,
                    imageURL: form.imageURL?.value,
                    description: form.description?.value,
                    logoUrl: form.logoUrl?.value,
                };

               const response = await PartyService.updateOrganisation(party.id, dto);


            if (response) {
                navigate("/admin/edit/parties")
            }
        } catch (err) {
            console.error('Failed to save party.', err)
        }
    };

    return (
        <MainLayout className="dflxColumn g20" style={{minHeight: "76vh"}}>
            <h2>{party ? 'Editar' : 'Adicionar'} Partido</h2>

            <form onSubmit={handleSubmit} className="party-form" style={{width: "50vw"}}>
                <PartyFormContainer
                    form={form}
                    handleChange={handleChange}/>

                <div className={"button-wrapper"}>
                <button type="submit">{'Submeter'}</button>
                </div>
            </form>
        </MainLayout>
    );
};

export default PartyAdd;

