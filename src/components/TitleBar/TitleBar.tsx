import React, { useContext } from 'react';
import logoIcon from '../../images/Logo.svg'
import minIcon from '../../images/minIcon.svg'
import maxIcon from '../../images/maxIcon.svg'
import closeIcon from '../../images/closeIcon.svg'
import styles from './TitleBar.module.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import themeMap from '../../utils/ThemeMap';
const electron = window.require("electron");
const remote = electron.remote;

const TitleBar:React.FC = () => {
  const {theme, setTheme} = useContext(ThemeContext);

  const minimizeClick = () => {
    remote.getCurrentWindow().minimize();
  }

  const closeClick = () => {
    remote.getCurrentWindow().close();
  }

  return (
    <div style={{backgroundColor: `${themeMap[theme].textBg}`, color: `${themeMap[theme].textColor}`}} className={styles.titleBarContainer}>
      <img className={styles.logoIcon} src={logoIcon} alt=""/>
      <span className={styles.titleName}>Darkpad</span>
      <div className={styles.middlePad}></div>
      <div style={{backgroundColor: `${themeMap[theme].textBg}`, color: `${themeMap[theme].textColor}`}} className={styles.controlBtns}>
        <button onClick={minimizeClick} className={styles.controlbtn}>
          <img className={styles.controlSVGImg} src={minIcon} alt=""/>
        </button>

        <button onClick={() => {}} className={styles.controlbtn}>
          <img className={styles.controlSVGImg} src={maxIcon} alt=""/>
        </button>
        
        <button onClick={closeClick} className={styles.controlbtnClose}>
          <img className={styles.controlSVGImg} src={closeIcon} alt=""/>
        </button>
      </div>
    </div>
  );
}

export default TitleBar;
