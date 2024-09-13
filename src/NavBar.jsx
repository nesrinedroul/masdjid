import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);

            if (offset > lastScrollTop) {
                setHidden(true);  // Hide when scrolling down
            } else {
                setHidden(false); // Show when scrolling up
            }
            setLastScrollTop(offset <= 0 ? 0 : offset);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollTop]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={`navbar-container ${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""}`}>
            <nav>
                <div className="logoo"> <img src="./logod.png" alt="logo" id="logo" />
                <h1>el Shefaa Mosque</h1>
                <h2 className="menu-icon" onClick={toggleMenu}>
                    &#9776;
                </h2></div>
               
                <ul className={`nav-items ${menuOpen ? "active" : ""}`}>
                    <li><Link to='/app' onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to='/app' onClick={() => setMenuOpen(false)}>Prayer</Link></li>
                    <li><Link to='/profile' onClick={() => setMenuOpen(false)}>Profile</Link></li>
                    <li><Link to='/register-child' onClick={() => setMenuOpen(false)}>Quran School</Link></li>
                </ul>
            </nav> 
        </div>
    );
}

export default NavBar;
