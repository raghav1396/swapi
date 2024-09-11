import { Link, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { useCallback } from "react";

function PageNav() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = useCallback(()=>{
    logout()
    navigate("/swapi/", {
        replace: true,
      });
  },[navigate,logout])

  return (
    <nav className={styles.nav}>
      <h1>SWAPI</h1>
      <ul>
        <li>
          <Link to="/swapi/" className={styles.link}>Home</Link>
        </li>
        <li>{isAuthenticated ? <span onClick={handleLogout} className={styles.link}>Logout</span> : <Link to="/swapi/login" className={styles.link}>Login</Link>}</li>
      </ul>
    </nav>
  );
}

export default PageNav;
