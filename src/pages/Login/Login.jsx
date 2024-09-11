import {
  useCallback,
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
// import PageNav from "../../components/PageNav/PageNav";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import PageNav from "../../components/PageNav/PageNav";
// import Button from "../../components/Button/Button";

export default function Login() {
  const {
    login,
    isAuthenticated,
    error: loginError
  } = useAuth();
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("qwerty");

  useEffect(
    function () {
      if (isAuthenticated)
        navigate("/swapi/", {
          replace: true,
        });
    },
    [isAuthenticated, navigate],
  );

  const handleLogin = useCallback(
    function (e) {
      e.preventDefault();
      if (email && password) login(email, password);
    },
    [email, password, login],
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form onSubmit={handleLogin}>

      <div className={styles.row}>
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>

      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>

      <div className={styles.loginError}>{loginError}</div>
      <button>Login</button>
      </form>
    </main>
  );
}
