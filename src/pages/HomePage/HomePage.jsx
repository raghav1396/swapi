import { Link } from "react-router-dom";
import PageNav from "../../components/PageNav/PageNav"
import SearchByType from "../../components/SearchByType/SearchByType";
import { useAuth } from "../../contexts/AuthContext/AuthContext"
import { SearchProvider } from "../../contexts/SearchContext/SearchContext";
import styles from "./HomePage.module.css"

function HomePage() {
    const {isAuthenticated} = useAuth();
    return (
        <main>
            <PageNav/>
            {
                isAuthenticated?
                <SearchProvider>
                    <SearchByType />
                </SearchProvider>
                :
                <div className={styles.text}>Please <Link to="/swapi/login">Login</Link> to continue</div>
            }
        </main>
    )
}

export default HomePage
