import React, { useState } from 'react';
import styles from './App.module.css';
import TypeArea from './components/TypeArea/TypeArea';
import TitleBar from './components/TitleBar/TitleBar';
import { ThemeContext } from './contexts/ThemeContext';


const App:React.FC = ()  => {

  const [theme, setTheme] = useState<string>("Dark");

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={styles.App}>
        <TitleBar />
        <TypeArea />
      </div>
    </ThemeContext.Provider>
    
  );
}

export default App;
