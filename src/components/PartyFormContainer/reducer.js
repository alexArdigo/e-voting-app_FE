export const inputsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: {
                    ...state.name,
                    value: action.payload.value,
                    error: action.payload.error
                }
            };
        case 'SET_COLOR':
            return {
                ...state,
                color: {
                    ...state.color,
                    value: action.payload.value,
                    error: action.payload.error
                }
            };
        case 'SET_IMAGEURL':
            return {
                ...state,
                imageURL: {
                    ...state.imageURL,
                    value: action.payload.value,
                    error: action.payload.error
                }
            };
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: {
                    ...state.description,
                    value: action.payload.value,
                    error: action.payload.error
                }
            };

        default:
            return state;
    }
};

export const initialInputs = {
    name: {
        label: "Nome do Partido",
        type: "text",
        name: "name",
        value: "",
        error: ""
    },
    color: {
        label: "Cor Oficial",
        type: "color",
        name: "color",
        value: "#000000",
        error: ""
    },
    imageURL: {
        label: "Imagem URL",
        type: "text",
        name: "imageURL",
        value: "",
        error: ""
    },
    description: {
        label: "Descrição",
        type: "text",
        name: "description",
        value: "",
        error: ""
    },

}