import {useState, useEffect, useContext} from 'react';

import styles from './TypeArea.module.css';
import openIcon from '../../images/openIcon.svg';
import saveIcon from '../../images/saveIcon.svg';
import themeIcon from '../../images/themeIcon.svg';
import Menu from '../Menu/Menu';
import { ThemeContext } from '../../contexts/ThemeContext';
import themeMap from '../../utils/ThemeMap';
const electron = window.require("electron");
const remote = electron.remote;
const Store = remote.require('electron-store');
const {dialog} = remote
const electronLocalshortcut = remote.require('electron-localshortcut');
const fs = remote.require('fs');

const store = new Store();

const TypeArea = () => {

  const {theme, setTheme} = useContext(ThemeContext);
  const [textVal, setTextVal] = useState<string>("");
  const [pathLoc, setPathLoc] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState<boolean>(false);

  const bottomBarStyle: React.CSSProperties = {
    backgroundColor: `${themeMap[theme].menuBg}`
  }
  const textAreaStyle: React.CSSProperties = {
    backgroundColor: `${themeMap[theme].textBg}`, 
    color: `${themeMap[theme].textColor}`
  }
  const optionBtnsStyles: React.CSSProperties = {
    backgroundColor : `${themeMap[theme].textBg}`,
    color: `${themeMap[theme].textColor}`
  }


  useEffect(() => {
    if(remote.process.argv.length > 1){
      fs.readFile(remote.process.argv[1], "utf-8", (err:any, data:any) => {
        setTextVal(data);
        setPathLoc(remote.process.argv[1].toString())
        setIsSaved(true);
      })
    }
    if(store.get("theme") !== null && store.get("theme") && setTheme ){
      setTheme(store.get("theme"));
    }
  },[])

  useEffect(() => {
    setIsSaved(false);
    electronLocalshortcut.unregister(remote.getCurrentWindow(), 'Ctrl+S');
    electronLocalshortcut.register(remote.getCurrentWindow(), 'Ctrl+S', () => {
      saveFile();
    });
  }, [textVal])


  const openFile = () => {
    dialog.showOpenDialog({properties: ['openFile'] }).then((res) => {
      if(!res.canceled){
        fs.readFile(res.filePaths[0], "utf-8", (err:any, data:any) => {
          setTextVal(data);
          setPathLoc(res.filePaths[0].toString())
          setIsSaved(true);
        })
      }
    });
  }

  const saveFile = () => {
    console.log(textVal);
    if(pathLoc !== ""){
      fs.writeFileSync(pathLoc, textVal, "utf-8");
      setIsSaved(true);
    }else{
      dialog.showSaveDialog({filters : [
        {name: 'txt', extensions: ['txt',]}
      ]}).then((res) => {
        if(res && !res.canceled && res.filePath){
          console.log(res.filePath.toString());
          fs.writeFileSync(res.filePath.toString(), textVal, "utf-8");
          setIsSaved(true);
          setPathLoc(res.filePath.toString());
        }
      });
    }
  }

  const toggleThemeMenu = () => {
    (isThemeMenuOpen) ? setIsThemeMenuOpen(false) : setIsThemeMenuOpen(true);
  }

  return (
    <div className={styles.typeAreaContainer}>
      <textarea style={textAreaStyle} spellCheck="false" className={styles.textAreaBox} name={"main_textarea"} value={textVal} onChange={(e) => {setTextVal(e.target.value);}}></textarea>
      
      <div style={bottomBarStyle} className={styles.bottomStatusBar}>
        <div>
          <Menu menuData={[
              {name: "Dark", action: () => {
                if(setTheme){
                  setTheme("Dark")
                  store.set("theme", "Dark");
                }
                toggleThemeMenu();
                return true;
              }},
              {name: "Monokai", action: () => {
                if(setTheme){
                  setTheme("Monokai")
                  store.set("theme", "Monokai");
                }
                toggleThemeMenu();
                return true;
              }},
              {name: "Nightblue", action: () => {
                if(setTheme){
                  setTheme("Nightblue")
                  store.set("theme", "Nightblue");
                }
                toggleThemeMenu();
                return true;
              }}
            ]} isMOpen={isThemeMenuOpen}/>
          <button style={optionBtnsStyles} onClick={toggleThemeMenu} className={styles.optionBtn}>
            <img className={styles.themeIcon} src={themeIcon} alt=""/>
            Themes
          </button>
        </div>
        
        <button style={optionBtnsStyles} onClick={openFile} className={styles.optionBtn}>
          <img className={styles.openIcon} src={openIcon} alt=""/>
          Open
        </button>
        <button style={optionBtnsStyles} disabled={isSaved} onClick={saveFile} className={styles.optionBtn}>
          <img className={styles.saveIcon} src={saveIcon} alt=""/>
          Save
        </button>
      </div>
    </div>
  );
}

export default TypeArea;