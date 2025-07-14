import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages, faTimes} from "@fortawesome/free-solid-svg-icons";
import "./ProfileEditor.css";

const imageOptions = [
    "https://play-lh.googleusercontent.com/JZYM9BfoFZxY-NYrjmQr6BPpireEvDvcVliADoG-XpESbjQC3tu170Qjb-wgdWGwfUC3=s188-rw",
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Logo_impresa.gif",
    "https://eco.imgix.net/uploads/2017/06/cropped-mediacapital.png?w=372&q=60&auto=compress,format",
    "https://apradiodifusao.pt/wp-content/uploads/2025/04/imagem-2.jpg",
    "https://cdn-icons-png.flaticon.com/512/10109/10109817.png"
];

const ProfileEditor = ({currentImage, onSave}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(currentImage);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState(currentImage);

    useEffect(() => {
        loadProfileImage();
    }, []);

    const loadProfileImage = async () => {
        try {
            console.log("Tentando carregar imagem de perfil...");
            const response = await api.get('/profile-image', {
                responseType: 'blob',
                timeout: 10000
            });

            if (response.data && response.data.size > 0) {
                const imageBlob = response.data;
                const imageUrl = URL.createObjectURL(imageBlob);
                setProfileImageUrl(imageUrl);
                setSelectedImage(imageUrl);
                onSave(imageUrl);
            }
        } catch (error) {

            if (error.response?.status === 404) {

                setProfileImageUrl('/images/avatar.png');
                setSelectedImage('/images/avatar.png');
                onSave('/images/avatar.png');

            } else if (error.response?.status === 401) {
                setUploadError('Não autenticado. Faça login novamente.');
            } else if (error.response?.status === 403) {
                setUploadError('Apenas viewers podem ter imagens de perfil.');
            } else {
                console.error("Erro inesperado:", error);
                setUploadError('Erro ao carregar imagem de perfil.');
            }
        }
    }

    const handleSave = () => {
        onSave(selectedImage);
        setShowPopup(false);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setUploadError("Por favor selecione apenas ficheiros de imagem.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setUploadError("A imagem deve ter menos de 5MB.");
            return;
        }

        setUploading(true);
        setUploadError("");

        try {
            const formData = new FormData();
            formData.append('file', file);


            const response = await api.post('/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 30000
            });

            setTimeout(async () => {
                await loadProfileImage();
                setShowPopup(false);
            }, 1000);

        } catch (error) {
            console.error("Erro no upload:", error);

            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                switch (status) {
                    case 400:
                        setUploadError(`Erro: ${data || "Dados inválidos"}`);
                        break;
                    case 401:
                        setUploadError("Não autenticado. Faça login novamente.");
                        break;
                    case 403:
                        setUploadError("Não tem permissão para fazer upload de imagens.");
                        break;
                    case 413:
                        setUploadError("Ficheiro demasiado grande.");
                        break;
                    case 500:
                        setUploadError("Erro interno do servidor.");
                        break;
                    default:
                        setUploadError(`Erro do servidor: ${data || status}`);
                }
            } else if (error.request) {
                setUploadError("Erro de conexão. Verifique se o servidor está a correr.");
            } else {
                setUploadError("Erro inesperado ao fazer upload da imagem.");
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="profile-picture-editor">
            <div className="profile-image-container">
                <img src={currentImage} alt="Profile" className="rounded-profile-image"/>
            </div>
            <button className="edit-pic" onClick={() => setShowPopup(true)}>
                <FontAwesomeIcon icon={faImages}/>
            </button>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={() => setShowPopup(false)}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                        <h3>Escolher nova imagem</h3>
                        <div className="image-gallery">
                            {imageOptions.map((img, value) => (
                                <img
                                    key={index}
                                    src={img}
                                    className={`gallery-image ${selectedImage === img ? "selected" : ""}`}
                                    onClick={() => setSelectedImage(img)}
                                    alt={`Option ${index}`}
                                />
                            ))}
                        </div>
                        <h4>Ou faça upload da sua imagem:</h4>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                        {uploadError && <div className="error-message"
                                             style={{color: 'red', marginTop: '10px'}}>{uploadError}</div>}
                        {uploading && <div style={{color: 'blue', marginTop: '10px'}}>Enviando imagem...</div>}
                        <button className="save-button" onClick={handleSave} disabled={uploading}>
                            {uploading ? 'A enviar...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileEditor;