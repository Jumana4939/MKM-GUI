import styles from './Footer.module.css'

function Footer(){

    const currentYear = new Date().getFullYear();

    return(
        <div className={styles.container}>
            <p>All right reserved &copy; {currentYear} | AiScia</p>
        </div>
    );
}

export default Footer