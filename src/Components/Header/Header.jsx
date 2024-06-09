import styles from './Header.module.css'
import logo from "../../assets/AiScia Logo.webp"

function Header(){
    return(
        <>
            <div className={styles.container}>
                <img src={logo} alt="AiScia Logo" />
                <h1 className={styles.title}>MicroKinetics Modelling</h1>
            </div>
        </>
    );
}

export default Header