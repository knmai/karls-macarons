import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/pages/Home';
import Shop from './components/sections/Shop';
import About from './components/sections/About';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';
import SplashScreen from './components/SplashScreen';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const wheelTimeout = useRef(null);
  const sections = ['home', 'shop', 'about', 'faq', 'contact'];
  const homeRef = useRef(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    // Initial section detection based on URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.includes(hash)) {
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }, 100);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Handle scroll detection and navbar state
  useEffect(() => {
    // Function to handle scroll and set active section
    const handleScroll = () => {
      // Update scrolled state for navbar styling
      const position = window.scrollY;
      if (position > 50) { // Reduced from 100 to make transition happen sooner
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Only detect active section if not in the middle of a programmatic scroll
      if (!isScrolling) {
        const sectionsElements = document.querySelectorAll('section');
        if (sectionsElements.length === 0) return;
        
        // Use 1/3 of viewport height as detection point
        const scrollPosition = window.scrollY + (window.innerHeight / 3);
        
        // Find the section that takes up most of the viewport
        let maxVisibleSection = null;
        let maxVisibleAmount = 0;
        
        sectionsElements.forEach(section => {
          if (!section) return;
          
          const rect = section.getBoundingClientRect();
          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleAmount = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleAmount > maxVisibleAmount) {
            maxVisibleAmount = visibleAmount;
            maxVisibleSection = section;
          }
        });
        
        // Update active section based on most visible section
        if (maxVisibleSection && maxVisibleSection.id !== activeSection) {
          setActiveSection(maxVisibleSection.id);
        }
      }
    };
    
    // Add scroll event listener with throttling for performance
    let scrollTimer;
    const throttledScrollHandler = () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          handleScroll();
          scrollTimer = null;
        }, 50); // Throttle to 50ms
      }
    };
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Initial call to set correct state on mount
    // Delay this to ensure DOM elements are loaded
    const initialCheckTimer = setTimeout(handleScroll, 200);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (scrollTimer) clearTimeout(scrollTimer);
      clearTimeout(initialCheckTimer);
    };
  }, [isScrolling, activeSection]);

  // Add effect to ensure navbar updates correctly for home section
  useEffect(() => {
    // Function to ensure navbar style updates correctly when on home section
    const updateNavbarForHome = () => {
      if (activeSection === 'home') {
        const homeSection = document.getElementById('home');
        // Add null check
        if (homeSection) {
          const homeSectionTop = homeSection.getBoundingClientRect().top;
          
          // If we're at the top of the home section (with a small tolerance)
          if (Math.abs(homeSectionTop) < 5) {
            setScrolled(false);
          } else {
            setScrolled(true);
          }
        }
      }
    };
    
    // Delay the initial call to ensure DOM is ready
    const initialTimer = setTimeout(() => {
      updateNavbarForHome();
    }, 100);
    
    // Also set up an interval to continuously check when we're on home section
    // This handles edge cases where scroll events might not fire precisely
    let intervalId;
    if (activeSection === 'home') {
      intervalId = setInterval(updateNavbarForHome, 100);
    }
    
    return () => {
      clearTimeout(initialTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeSection]);

  // Handle browser history
  useEffect(() => {
    // Update URL when section changes
    if (activeSection) {
      window.history.replaceState(null, '', `#${activeSection}`);
    }
    
    // Handle back/forward button
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sections.includes(hash)) {
        scrollToSection(hash);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activeSection]);

  // Improved wheel event handler
  const handleWheelEvent = (e) => {
    // Prevent default to take control of the scrolling
    e.preventDefault();
    
    // Clear any existing timeout for debouncing
    if (wheelTimeout.current) {
      clearTimeout(wheelTimeout.current);
    }
    
    // Debounce wheel events
    wheelTimeout.current = setTimeout(() => {
      // If already scrolling, ignore additional wheel events
      if (isScrolling) {
        return;
      }
      
      // Determine scroll direction and use a threshold to prevent accidental scrolls
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Only trigger if the scroll is significant
      if (Math.abs(e.deltaY) < 30) {
        return;
      }
      
      // Set scrolling state to prevent multiple scrolls
      setIsScrolling(true);
      
      // Get current section index
      const currentIndex = sections.indexOf(activeSection);
      
      // Calculate next section index
      let nextIndex = currentIndex + direction;
      
      // Ensure index is within bounds
      if (nextIndex >= 0 && nextIndex < sections.length) {
        const nextSection = sections[nextIndex];
        
        // Update active section immediately for UI responsiveness
        setActiveSection(nextSection);
        
        // Scroll to next section with smooth behavior
        const targetElement = document.getElementById(nextSection);
        
        if (targetElement) {
          // Use scrollIntoView with a callback via setTimeout
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Reset scrolling state after animation completes with a generous timeout
          setTimeout(() => {
            setIsScrolling(false);
          }, 1200); // Increased from 1000ms to ensure animation completes
        } else {
          setIsScrolling(false);
        }
      } else {
        // If at the edges, reset scrolling state after a short delay
        setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      }
    }, 50); // 50ms debounce
  };

  // Add touch support for mobile devices
  useEffect(() => {
    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      if (isScrolling) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      // Only trigger if the swipe is significant (more than 50px)
      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1; // 1 for down, -1 for up
        
        const currentIndex = sections.indexOf(activeSection);
        let nextIndex = currentIndex + direction;
        
        if (nextIndex >= 0 && nextIndex < sections.length) {
          scrollToSection(sections[nextIndex]);
        }
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isScrolling]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isScrolling) return;
      
      const currentIndex = sections.indexOf(activeSection);
      let nextIndex = currentIndex;
      
      // Handle arrow keys
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        nextIndex++;
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        nextIndex--;
        e.preventDefault();
      } else {
        return; // Not an arrow key we care about
      }
      
      // Check if index is valid
      if (nextIndex >= 0 && nextIndex < sections.length) {
        const nextSection = sections[nextIndex];
        scrollToSection(nextSection);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isScrolling]);

  // Improved scrollToSection function
  const scrollToSection = (id) => {
    setIsScrolling(true);
    
    // Update active section immediately for UI responsiveness
    setActiveSection(id);
    
    // Add timeout to ensure element exists
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Reset isScrolling after animation completes with a longer timeout
        setTimeout(() => {
          setIsScrolling(false);
        }, 1200); // Increased to ensure animation completes
      } else {
        setIsScrolling(false);
      }
    }, 50);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <NavBar 
        scrollToSection={scrollToSection} 
        scrolled={scrolled}
        activeSection={activeSection}
      />
      <div 
        className="section-container" 
        onWheel={handleWheelEvent}
      >
        <section id="home" ref={homeRef}>
          <Home />
        </section>
        <section id="shop">
          <Shop />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </Router>
  );
}

export default App;