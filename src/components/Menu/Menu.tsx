import React, {useContext, useState} from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import themeMap from '../../utils/ThemeMap';
import styles from './Menu.module.css';

export interface MenuInterface extends Array<MenuItem>{}

interface MenuItem{
  name: String,
  action: ()=>boolean
}

const Menu : React.FC<{menuData : MenuInterface, isMOpen : boolean}> = ({menuData, isMOpen}) => {
  
  const {theme, setTheme} = useContext(ThemeContext);

  const menuContainerStyle: React.CSSProperties = {
    display : isMOpen ? 'block' : 'none',
    backgroundColor: `${themeMap[theme].textBg}`, 
    color: `${themeMap[theme].textColor}`
  }

  return (
    <div style={menuContainerStyle} className={styles.dropDownMenuContainer}>
      {
        menuData.map((menu, index) => {
          return <div key={index} onClick={menu.action} className={styles.dropDownMenuItem}>{menu.name}</div>
        })
      }
    </div>
  );
}

export default Menu;