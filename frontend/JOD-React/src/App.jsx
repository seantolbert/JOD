import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      const response = await fetch(
        "http://localhost:8000/api/v2/blog/?type=blog.BlogPage&fields=title,date,description,body,main_image"
      );
      const data = await response.json();
      setBlogPosts(data.items);
    }

    fetchBlogPosts();
  }, []);

  return (
    <div className="App">
      {blogPosts.length > 0 &&
        blogPosts.map((post, key) => {
          const postImageURL = `http://localhost:8000/api/v2${post.main_image.meta.download_url}`;
          // console.log(postImageURL);

          return (
            <div key={key}>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
              <p>{post.description}</p>
              <div>
                <img src={postImageURL} alt="" />
              </div>
              {post.body.length > 0 &&
                post.body
                  .filter((item) => item.type === "paragraph")
                  .map((item, key) => {
                    if (item.type === "paragraph") {
                      return (
                        <div
                          key={key}
                          style={{ border: "1px solid white" }}
                          dangerouslySetInnerHTML={{ __html: item.value }}
                        />
                      );
                    }
                    if (item.type === "image_block") {
                      return <div>
                        <img src={item.value.image} alt="" />
                      </div>
                    }
                  })}
            </div>
          );
        })}
    </div>
  );
}

export default App;
