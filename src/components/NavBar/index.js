import { useState, useEffect } from 'react';
import './style.css'

export default function NavBar() {

const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10); // Show if scrolling up or near the top
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

    return (
        <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            <span className="nav-heading">#Vibe Page</span>
            <div className="nav-list">
                <a href='https://furrl.in/wishlist' className="nav-button">
                    <img src='https://furrl.in/_next/static/media/Whislist.2ac94d87.svg' alt='wishlist icon' className='wishlist-icon' />
                </a>
                <a href='https://furrl.in/cart' className="nav-button">
                    <img src='https://furrl.in/_next/static/media/Bag.b94fa005.svg' alt='cart icon' className='wishlist-icon' />
                </a>
            </div>
        </nav>
    )
}