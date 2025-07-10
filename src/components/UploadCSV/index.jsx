import React from 'react';

const UploadCSV = ({file, setFile, formData}) => {


    function handleFileChange(e) {
        setFile(e.target.files[0])
    }

    return (
        <div className={"dflxColumn"}>
            <h3 style={{margin: 0, padding: 0}}>
                Carregar ficheiro de {formData.electionType === "PRESIDENTIAL" ? "candidatos" : "partidos"}*:
            </h3>
            <label htmlFor="ficheiro" className={"upload-button"}>Carregar</label>
            <input
                id="ficheiro"
                type="file"
                name={"file"}
                accept=".csv"
                onChange={(e) => handleFileChange(e)}
                hidden/>
            <span>{file?.name || "Nenhum ficheiro selecionado"}</span>
        </div>
    );
};

export default UploadCSV;