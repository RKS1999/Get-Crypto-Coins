import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import { showSingleProduct } from "../Utils/API";
import Footer from "../Layouts/Footer";

const DataChart = () => {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [editableData, setEditableData] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["charts", id],
    queryFn: () => showSingleProduct(id),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error("Error fetching data:", isError);
    return <p>Error fetching data...</p>;
  }

  if (!data || !data.history || !data.details) {
    console.warn("No data available for the given ID:", id);
    return <p>No data available.</p>;
  }

  const formattedData = data.history.map((entry) => ({
    x: new Date(entry.time),
    y: parseFloat(entry.priceUsd),
  }));

  const options = {
    chart: {
      type: "line",
      height: 550,
    },
    xaxis: {
      type: "datetime",
    },
  };

  // const handleEditClick = () => {
  //   setEditableData(data.details);
  // };

  // const handleInputChange = (e) => {
  //   setEditableData({
  //     ...editableData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSaveClick = () => {
  //   console.log("Edited Data:", editableData);
  //   setEditableData(null);
  // };

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
                    <Link to="/dashboard" className="nav-link scrollto  active">
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
          <div className="container-fluid">
            <Link
              to="/dashboard"
              style={{
                color: "red",
                textDecoration: "none",
                paddingLeft: "1000px",
              }}
            >
              Close X
            </Link>
            <Chart
              options={options}
              series={[{ data: formattedData }]}
              type="line"
              height={350}
            />
            <div className="flex items-center">
              <div className="row">
                <div className="col-1">
                  <img
                    src={`https://cryptologos.cc/logos/${data.details.id.toLowerCase()}-${data.details.symbol.toLowerCase()}-logo.png?v=014`}
                    alt={data.details.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "path/to/fallback-image.png";
                    }}
                    style={{
                      width: "45px",
                      height: "45px",
                      marginRight: "10px",
                    }}
                    className="rounded-full"
                  />
                </div>
                <div className="col-8">
                  <h1>{data.details.name}</h1>
                </div>

                <div className="col-3">
                  <button
                    className="btn btn-success"
                    style={{ marginRight: "5px" }}
                  >
                    Buy
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "5px" }}
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Supply:</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.supply).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Max Supply:</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.maxSupply).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Market Cap (USD):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.marketCapUsd).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Volume (USD 24Hr.):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.volumeUsd24Hr).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Price (USD):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.priceUsd).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Exchange Change % (USD 24Hr.):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.changePercent24Hr).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>V Wap (24Hr.):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.vwap24Hr).toFixed(2)}
              </div>
            </div>
          </div>
          {/* <button onClick={handleEditClick}>Edit</button>
            {editableData && (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editableData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="symbol"
                  value={editableData.symbol}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="priceUsd"
                  value={editableData.priceUsd}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="marketCapUsd"
                  value={editableData.marketCapUsd}
                  onChange={handleInputChange}
                />
                <button onClick={handleSaveClick}>Save</button> 
                </div
            )} */}
        </div>
      </div>
    </div>
  );
};

export default DataChart;
