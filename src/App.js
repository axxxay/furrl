import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
        {isLargeScreen ? (
            <div className="hide-on-large">
                <h1 className='error'>
                  Sorry, this page is not available for your screen size. <br />
                  Please open this page on a mobile or tablet whose screen size is &lt;= 768px.
                </h1>
            </div>
        ) : (
            <>
                <NavBar />
                <ProductList />
            </>
        )}
    </>
  );
}

export default App;
