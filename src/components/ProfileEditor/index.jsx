import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faTimes } from "@fortawesome/free-solid-svg-icons";


const imageOptions = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Medialivre.png/1024px-Medialivre.png",
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Logo_impresa.gif",
    "https://upload.wikimedia.org/wikipedia/pt/e/e1/Media-capital-logo-certo-300x224.png",
    "https://apradiodifusao.pt/wp-content/uploads/2025/04/imagem-2.jpg"
];

const ProfileEditor = ({ currentImage, onSave }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(currentImage);

    const handleSave = () => {
        onSave(selectedImage);
        setShowPopup(false);
    };

    return (
        <div className="profile-picture-editor">
            <img src={currentImage} alt="Profile" className="rounded-profile-image" />
            <button className="edit-pic" onClick={() => setShowPopup(true)}>
                <FontAwesomeIcon icon={faImages} style={{ marginRight: "8px" }} />
                Editar
            </button>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={() => setShowPopup(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h3>Escolher nova imagem</h3>
                        <div className="image-gallery">
                            {imageOptions.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    className={`gallery-image ${selectedImage === img ? "selected" : ""}`}
                                    onClick={() => setSelectedImage(img)}
                                    alt={`Option ${idx}`}
                                />
                            ))}
                        </div>
                        <button className="save-button" onClick={handleSave}>Guardar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileEditor;