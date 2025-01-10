import React, { useState, useEffect } from "react";
import PostForm from "../../Components/MiniBlog/PostForm";
import PostList from "../../Components/MiniBlog/PostList";
import "./BlogPage.css";

const BlogPage = () => {
  // Déclaration des hooks de manière stable, en dehors de toute condition.
  const [posts, setPosts] = useState(
    () => JSON.parse(localStorage.getItem("blogPosts")) || []
  );
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [showForms, setShowForms] = useState(false); // Définir l'état pour masquer/afficher les formulaires

  // Tri des posts en fonction de la valeur de `sortBy`
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === "likes") {
      return (b.likes || 0) - (a.likes || 0);
    }
    return 0;
  });

  // Utilisation de useEffect pour simuler un délai de chargement
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Cleanup
  }, []); // Ce useEffect est exécuté une seule fois au montage

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts)); // Sauvegarde les posts dans le localStorage
  }, [posts]);

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleEditPost = (id, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? updatedPost : post))
    );
  };

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleLikePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
  };

  const toggleFormsVisibility = () => {
    setShowForms((prev) => !prev); // Alterne la visibilité des formulaires
  };

  if (loading) {
    return <div className="loading">Chargement des posts...</div>;
  }

  return (
    <>
    <div>
      <h1>Mini-Blog</h1>
      <div className="select-container">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="likes">Pertinence</option>
        </select>

        {/* Bouton pour afficher/masquer les formulaires */}
        <button className="toggle-button" onClick={toggleFormsVisibility}>
          {showForms ? "Masquer les formulaires" : "Ajouter un commentaire"}
        </button>
      </div>
      {/* Affichage conditionnel des formulaires */}
      {showForms && (
        <div className="post-form-container">
          <PostForm onAddPost={handleAddPost} />
        </div>
      )}

      <PostList
        posts={sortedPosts}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
        onLikePost={handleLikePost}
      />
    </div>
    </>
  );
};

export default BlogPage;
