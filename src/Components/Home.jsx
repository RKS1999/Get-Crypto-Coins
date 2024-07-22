import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { trendingProducts } from "../Utils/API";
import Footer from "../Layouts/Footer";

const Home = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: trendingProducts,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-sm-12 mb-3">
          <div id="header" className="p-3">
            <div className="d-flex flex-column align-items-center">
              <div className="profile mb-3">
                <img
                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/letter-c-logo-design-template-701037c7446ea8e41848e54bafad8cac_screen.jpg?ts=1639894400"
                  alt="Logo"
                  className="img-fluid rounded-circle mb-2"
                  style={{ width: "100px", height: "100px" }}
                />
                <h1 className="text-light">
                  <a href="index.html">Crypto Coin</a>
                </h1>
              </div>
              <nav id="navbar" className="nav-menu navbar mb-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/" className="nav-link scrollto active">
                      <i className="bx bx-home"></i> <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link scrollto">
                      <i className="bx bx-user"></i> <span>Profile</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link scrollto">
                      <i className="bx bx-category"></i> <span>Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <input
                type="text"
                value={search}
                onChange={handleChange}
                className="form-control"
                placeholder="Search..."
              />
            </div>
            <Footer />
          </div>
        </div>
        {/* Sidebar */}
        <div className="col-md-9 col-sm-12">
          <div className="container mt-3 p-1">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/letter-c-logo-design-template-701037c7446ea8e41848e54bafad8cac_screen.jpg?ts=1639894400"
              alt=""
              style={{ paddingLeft: "300px", height:"500px" }}
            />
            <h1 style={{ paddingLeft: "310px" }}>Welcome to Crypto Coin</h1>
            <Link to="/login" style={{ paddingLeft: "450px" }}>
              <button className="btn btn-primary">Log In</button>
            </Link>
            <Link to="/signup" style={{ paddingLeft: "50px" }}>
              <button className="btn btn-primary">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
