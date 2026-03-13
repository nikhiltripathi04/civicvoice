import Navbar from "../components/Navbar";
import Tilt from "react-parallax-tilt";
import "./Home.css";

import adminImg from "../assets/Home/AdminLogo.png";
import authorityImg from "../assets/Home/AuthorityLogo.png";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";
import { IoCreate } from "react-icons/io5";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="cards">
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
            <div className="login-card" onClick={() => navigate("/login")}>
              <img src={authorityImg} alt="Authority" />
              <p>Login / Sign up As User</p>
            </div>
          </Tilt>

          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
            <div className="login-card" onClick={() => navigate("/login")}>
              <img src={adminImg} alt="Admin" />
              <p>Login / Sign up As Admin</p>
            </div>
          </Tilt>
        </div>
      </div>

      <div className="banner">Be the change. Report Issues now!</div>

      <div className="footer">
        <div className="footer-col">
          <h3>CivicVoice</h3>
          <p>Empowering citizens to build cleaner, safer cities.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>

          <a href="/">
            <FaHome className="footer-icon" /> Home
          </a>

          <a href="/track">
            <MdTrackChanges className="footer-icon" /> Track Complaint
          </a>

          <a href="/submit">
            <IoCreate className="footer-icon" /> Submit Complaint
          </a>
        </div>

        <div className="footer-col">
          <h4>Stay Updated</h4>
          <a href="#">Subscribe</a>
        </div>

        <div className="footer-col">
          <h4>Community & Social</h4>

          <a href="#">
            <FaFacebook className="footer-icon" /> Facebook
          </a>
          <a href="#">
            <FaTwitter className="footer-icon" /> Twitter
          </a>
          <a href="#">
            <FaLinkedin className="footer-icon" /> LinkedIn
          </a>
        </div>
      </div>
      
    </>
  );
}
