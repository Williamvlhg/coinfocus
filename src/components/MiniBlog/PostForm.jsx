import { useState } from "react";

const PostForm = ({ onAddPost }) => {
  // Crée un état pour chaque crypto, contenant title, content et likes
  const [formData, setFormData] = useState({
    Bitcoin: { title: "", content: "" },
    Ethereum: { title: "", content: "" },
    Cardano: { title: "", content: ""},
  });

  // Mise à jour de l'état spécifique à une crypto
  const handleChange = (crypto, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [crypto]: { ...prevData[crypto], [field]: value },
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (crypto) => {
    const { title, content, likes } = formData[crypto];
    const newPost = {
      id: Date.now(),
      title,
      content,
      crypto,
      date: new Date().toLocaleString(),
      likes,
    };
    onAddPost(newPost);
    setFormData((prevData) => ({
      ...prevData,
      [crypto]: { title: "", content: "", likes: 0 },
    })); // Réinitialiser l'état après soumission
  };

  return (
    <div className="post-form-container">
      {/* Card pour Bitcoin */}
      <div className="post-card">
        <h3>Bitcoin</h3>
        <input
          type="text"
          value={formData.Bitcoin.title}
          onChange={(e) => handleChange("Bitcoin", "title", e.target.value)}
          placeholder="Titre"
          required
        />
        <textarea
          value={formData.Bitcoin.content}
          onChange={(e) => handleChange("Bitcoin", "content", e.target.value)}
          placeholder="Contenu"
          required
        />
        
        <button onClick={() => handleSubmit("Bitcoin")}>Publier</button>
      </div>

      {/* Card pour Ethereum */}
      <div className="post-card">
        <h3>Ethereum</h3>
        <input
          type="text"
          value={formData.Ethereum.title}
          onChange={(e) => handleChange("Ethereum", "title", e.target.value)}
          placeholder="Titre"
          required
        />
        <textarea
          value={formData.Ethereum.content}
          onChange={(e) => handleChange("Ethereum", "content", e.target.value)}
          placeholder="Contenu"
          required
        />
        
        <button onClick={() => handleSubmit("Ethereum")}>Publier</button>
      </div>

      {/* Card pour Cardano */}
      <div className="post-card">
        <h3>Cardano</h3>
        <input
          type="text"
          value={formData.Cardano.title}
          onChange={(e) => handleChange("Cardano", "title", e.target.value)}
          placeholder="Titre"
          required
        />
        <textarea
          value={formData.Cardano.content}
          onChange={(e) => handleChange("Cardano", "content", e.target.value)}
          placeholder="Contenu"
          required
        />
        
        <button onClick={() => handleSubmit("Cardano")}>Publier</button>
      </div>
    </div>
  );
};

export default PostForm;
