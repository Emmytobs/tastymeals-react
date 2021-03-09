import Header from './Utilities/Header';
import Sidebar from './Utilities/Sidebar';

function App() {
  return (
    <>    
      <Header />
      <div style={{ position: 'relative', height: 'auto'}}>
        <div style={{ width: '85%', marginLeft: "auto" }}>
          <h1>Tasty Meals</h1>

        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
