import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./ProfileEditor.css";


const imageOptions = [
    "https://play-lh.googleusercontent.com/JZYM9BfoFZxY-NYrjmQr6BPpireEvDvcVliADoG-XpESbjQC3tu170Qjb-wgdWGwfUC3=s188-rw",
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Logo_impresa.gif",
    "https://eco.imgix.net/uploads/2017/06/cropped-mediacapital.png?w=372&q=60&auto=compress,format",
    "https://apradiodifusao.pt/wp-content/uploads/2025/04/imagem-2.jpg",
    "https://cdn-icons-png.flaticon.com/512/10109/10109817.png"
];

const ProfileEditor = ({ currentImage, onSave }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(currentImage);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const handleSave = () => {
        onSave(selectedImage);
        setShowPopup(false);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setUploadError("");
        const formData = new FormData();
        formData.append("file", file);
        try {
            await axios.post("http://localhost:3306/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchProfileImage();
            setShowPopup(false);
        } catch (err) {
            setUploadError("Erro ao fazer upload da imagem.");
        } finally {
            setUploading(false);
        }
    };

    const fetchProfileImage = async () => {
        try {
            const res = await axios.get("http://localhost:3306/profile-image", { responseType: "arraybuffer" });
            const base64 = btoa(
                new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
            );
            const imageUrl = `data:image/jpeg;base64,${base64}`;
            setSelectedImage(imageUrl);
            onSave(imageUrl);
        } catch (err) {
            setUploadError("Erro ao carregar imagem de perfil.");
        }
    };

    return (
        <div className="profile-picture-editor">
            <img src={currentImage} alt="Profile" className="rounded-profile-image" />
            <button className="edit-pic" onClick={() => setShowPopup(true)}>
                <FontAwesomeIcon icon={faImages}/>
            </button>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={() => setShowPopup(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h3>Escolher nova imagem</h3>
                        <div className="image-gallery">
                            {imageOptions.map((img, value ) => (
                                <img
                                    key={value}
                                    src={img}
                                    className={`gallery-image ${selectedImage === img ? "selected" : ""}`}
                                    onClick={() => setSelectedImage(img)}
                                    alt={`Option ${value}`}
                                />
                            ))}
                        </div>
                        <h4>Ou faça upload da sua imagem:</h4>
                        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                        {uploadError && <div className="error-message">{uploadError}</div>}
                        {uploading && <div>Enviando imagem...</div>}
                        <button className="save-button" onClick={handleSave}>Guardar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileEditor;