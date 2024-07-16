// import React from "react";

// function Home() {
//   return (
//     <div>
//       <h1>Welcome to Home Page</h1>
//     </div>
//   );
// }

// export default Home;

// Home.js
import React, { useEffect, useState } from "react";
import { getAllProducts } from "./Api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.Stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
