import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { trendingProducts } from "../Utils/API";
import Footer from "../Layouts/Footer";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: trendingProducts,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

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
                    <Link to="/" className="nav-link scrollto">
                      <i className="bx bx-home"></i> <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link scrollto">
                      <i className="bx bx-user"></i> <span>Profile</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link scrollto active">
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
            <div
              className="table-container"
              style={{
                height: "700px",
                overflowY: "auto",
                border: "2px solid",
                position: "relative",
              }}
            >
              <table className="table table-striped">
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#0000FF",
                    color: "white",
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th
                      style={{
                        border: "2px solid",
                        width: "100px",
                      }}
                    >
                      Logo
                    </th>
                    <th
                      style={{
                        border: "2px solid",
                        width: "300px",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        border: "2px solid",
                        width: "180px",
                      }}
                    >
                      Max Exchange
                    </th>
                    <th
                      style={{
                        border: "2px solid",
                        width: "130px",
                      }}
                    >
                      $ Price
                    </th>
                    <th
                      style={{
                        border: "2px solid",
                        width: "100px",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((coin) => (
                    <tr key={coin.id}>
                      <td>
                        <Link to={`/data/${coin.id}`}>
                          <img
                            src={`https://cryptologos.cc/logos/${coin.id.toLowerCase()}-${coin.symbol.toLowerCase()}-logo.png?v=014`}
                            alt={coin.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                            }}
                            style={{
                              width: "40px",
                              height: "45px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                          {!coin.imageUrl}
                        </Link>
                      </td>
                      <td style={{ fontSize: "16px" }}>
                        <Link to={`/data/${coin.id}`}>{coin.name}</Link>
                      </td>
                      <td style={{ fontSize: "16px" }}>
                        $ {parseFloat(coin.volumeUsd24Hr).toFixed(2)}
                      </td>
                      <td style={{ fontSize: "16px" }}>
                        $ {parseFloat(coin.priceUsd).toFixed(2)}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn"
                            // onClick={() => handleUpdate(coin.id)}
                            style={{
                              fontSize: "20px",
                              backgroundColor: "Green",
                              color: "white",
                              marginRight: "5px",
                            }}
                          >
                            Buy
                          </button>
                          <button
                            className="btn me-1"
                            // onClick={() => handleDelete(coin.id)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontSize: "20px",
                              marginLeft: "5px",
                            }}
                          >
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
