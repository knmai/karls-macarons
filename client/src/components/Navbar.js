import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../logo/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaSearch,
  FaBars
} from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

function Navbar({ scrollToSection, scrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1060);
  const [prevSection, setPrevSection] = useState('');
  const [transition, setTransition] = useState(false);
  
  // Determine if we should show the home-style navbar
  const isHome = activeSection === 'home' && !scrolled;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Track section changes to apply transitions
  useEffect(() => {
    if (prevSection !== activeSection) {
      // Apply transition effect when changing sections
      setTransition(true);
      setTimeout(() => {
        setTransition(false);
      }, 500);
      setPrevSection(activeSection);
    }
  }, [activeSection, prevSection]);

  useEffect(() => {
    const showButton = () => {
      if (window.innerWidth <= 1060) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    
    window.addEventListener("resize", showButton);
    showButton();
    
    return () => window.removeEventListener("resize", showButton);
  }, []);

  // Handle body scroll locking when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const handleLinkClick = (id) => {
    closeMenu();
    scrollToSection(id);
  };
  
  const getActiveClass = (id) => {
    return activeSection === id ? 'nav-links active' : 'nav-links';
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${isHome ? 'navbar-home' : ''} ${transition ? 'navbar-transition' : ''}`}>
      <div className="navbar-container">
        {isHome ? (
          // Special layout for home page
          <>
            <div className="home-social-container">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#shop" className="social-icon" onClick={(e) => {
                e.preventDefault();
                handleLinkClick("shop");
              }}>
                <IoBag />
              </a>
              <a href="#" className="social-icon" onClick={(e) => e.preventDefault()}>
                <FaSearch />
              </a>
            </div>
            
            <div className="home-logo-container">
              <a 
                href="#home" 
                className="navbar-logo" 
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("home");
                }}
              >
                <img className="logo" src={logo} alt="macaron_logo" />
                <span className="tagline">A celebration in every bite</span>
              </a>
            </div>
            
            <div className="menu-trigger" onClick={toggleMenu}>
              <FaBars />
            </div>
            
            <div className={`home-menu-overlay ${menuOpen ? 'open' : ''}`}>
              <div className="home-menu-close" onClick={toggleMenu}>
                <IoMdClose />
              </div>
              <ul className="home-menu-links">
                <li>
                  <a 
                    href="#home" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("home");
                    }}
                  >HOME</a>
                </li>
                <li>
                  <a 
                    href="#shop" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("shop");
                    }}
                  >THE SHOP</a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("about");
                    }}
                  >ABOUT</a>
                </li>
                <li>
                  <a 
                    href="#faq" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("faq");
                    }}
                  >F.A.Qs</a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("contact");
                    }}
                  >CONTACT US</a>
                </li>
              </ul>
            </div>
            
            {/* Adding backdrop to close menu when clicking outside */}
            {menuOpen && (
              <div 
                className="menu-backdrop" 
                onClick={closeMenu}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 998,
                  backgroundColor: 'transparent'
                }}
              />
            )}
            
            <div className="scroll-indicator" onClick={() => handleLinkClick("shop")}>
              <span>scroll to shop</span>
              <div className="scroll-arrow"></div>
            </div>
          </>
        ) : (
          // Regular navbar for other sections
          <>
            <div className="nav-icons left-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="facebook">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram">
                <FaInstagram />
              </a>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
              <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} />
            </div>
            {isMobile && (
              <a 
                href="#home" 
                className="navbar-logo" 
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("home");
                }}
              >
                <img className="logo" src={logo} alt="macaron_logo" />
              </a>
            )}
            <ul
              className={menuOpen ? "nav-menu active" : "nav-menu"}
            >
              {menuOpen && (
                <div className="popout-search">
                  <input type="text" placeholder="SEARCH" />
                  <FaSearch style={{ zIndex: 1 }} />
                </div>
              )}
              <li className="nav-item">
                <a
                  href="#home"
                  className={getActiveClass("home")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("home");
                  }}
                >
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#shop"
                  className={getActiveClass("shop")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("shop");
                  }}
                >
                  THE SHOP
                </a>
              </li>
              {!isMobile && (
                <li className="nav-item logo-item">
                  <a 
                    href="#home" 
                    className="navbar-logo" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("home");
                    }}
                  >
                    <img className="logo" src={logo} alt="macaron_logo" />
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a
                  href="#about"
                  className={getActiveClass("about")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("about");
                  }}
                >
                  ABOUT
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#faq"
                  className={getActiveClass("faq")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("faq");
                  }}
                >
                  F.A.Qs
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contact"
                  className={getActiveClass("contact")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("contact");
                  }}
                >
                  CONTACT US
                </a>
              </li>
              {isMobile && (
                <li className="nav-item">
                  <a
                    href="#shop"
                    className="nav-links"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("shop");
                    }}
                  >
                    CART <IoBag style={{ position: "absolute", right: 20 }} />
                  </a>
                </li>
              )}
              {isMobile && (
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-links"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                    }}
                  >
                    LOGIN / SIGN UP
                  </a>
                </li>
              )}
            </ul>
            <div className="nav-icons right-icons">
              <a 
                href="#shop" 
                className="cart" 
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("shop");
                }}
              >
                <IoBag />
              </a>
              <a href="#" className="search" onClick={(e) => e.preventDefault()}>
                <FaSearch />
              </a>
            </div>
            
            {/* Adding backdrop to close menu when clicking outside on mobile */}
            {menuOpen && isMobile && (
              <div 
                className="menu-backdrop" 
                onClick={closeMenu}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 998,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }}
              />
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;