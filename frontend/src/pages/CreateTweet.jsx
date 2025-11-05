import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/CreateTweet.css";

const CreateTweet = () => {
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Tweet cannot be empty!");

    try {
      await api.post("/tweets", { userId: user._id, content });
      setContent("");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create tweet.");
    }
  };

  return (
    <div className="create-tweet-container">
      <h2>Create a Tweet</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          rows="4"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreateTweet;