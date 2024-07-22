import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Footer from "../Layouts/Footer";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
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
                    <Link to="/profile" className="nav-link scrollto active">
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
            </div>
            <Footer />
          </div>
        </div>
        <div className="col-md-9 col-sm-12">
          <div className="container mt-3 p-5">
            <h3 className="text-center">Profile Details</h3>
            <div className="row">
              <div className="col-6">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-2"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <div className="col-6">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Number:</strong> {user.number}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {user.dob}
                </p>
                <Link
                  to="/edit-profile"
                  className="btn btn-primary"
                  style={{ marginRight: "5px" }}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
