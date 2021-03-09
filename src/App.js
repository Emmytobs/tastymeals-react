import Header from './Utilities/Header';
import Sidebar from './Utilities/Sidebar';
import MainApp from './components/MainApp'

import styles from './App.module.css'

function App() {
  return (
    <>    
      <Header />
      <div className={styles.appWrapper}>
        <div className={styles.appContainer}>
          <MainApp />
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
