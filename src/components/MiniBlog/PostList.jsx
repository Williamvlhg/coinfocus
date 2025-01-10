import React, { useState } from 'react'; // Importation de useState

const PostList = ({ posts, onEditPost, onDeletePost, onLikePost }) => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      onDeletePost(id);
    }
  };

  return (
    <div>
      {posts.map((post) => {
        const isExpanded = expandedPostId === post.id;

        return (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{isExpanded ? post.content : post.content.slice(0, 100) + "..."}</p>
            <p>
              <strong>{post.crypto}</strong> - {post.date}
            </p>
            <p>Likes : {post.likes}</p>
            <button onClick={() => onLikePost(post.id)} className="like-button">Like</button>
            <button onClick={() => handleDelete(post.id)}>Supprimer</button>
            <button onClick={() => setExpandedPostId(isExpanded ? null : post.id)}>
              {isExpanded ? "Réduire" : "Voir plus"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
