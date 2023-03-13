import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      const response = await fetch("http://localhost:8000/api/v2/blog");
      const data = await response.json();
      setBlogPosts(data.items);
    }

    fetchBlogPosts();
  }, []);

  return (
    <div className="App">
      {blogPosts.length > 0 &&
        blogPosts.map((post, key) => (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
