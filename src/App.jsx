import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates =
    selectedCategory === "all"
      ? cssTemplates
      : cssTemplates.filter(
          (template) => template.category === selectedCategory
        );

  return (
    <div className="app-container">
      <a
        href="https://github.com/JosinBahaswan"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        <span>GitHub</span>
      </a>

      <header>
        <h1>CSS Library</h1>
        <p>Koleksi template CSS profesional siap pakai</p>

        <div className="category-filter">
          <button
            className={selectedCategory === "all" ? "active" : ""}
            onClick={() => setSelectedCategory("all")}
          >
            Semua
          </button>
          <button
            className={selectedCategory === "navbar" ? "active" : ""}
            onClick={() => setSelectedCategory("navbar")}
          >
            Navbar
          </button>
          <button
            className={selectedCategory === "card" ? "active" : ""}
            onClick={() => setSelectedCategory("card")}
          >
            Card
          </button>
          <button
            className={selectedCategory === "hero" ? "active" : ""}
            onClick={() => setSelectedCategory("hero")}
          >
            Hero
          </button>
          <button
            className={selectedCategory === "button" ? "active" : ""}
            onClick={() => setSelectedCategory("button")}
          >
            Button
          </button>
          <button
            className={selectedCategory === "form" ? "active" : ""}
            onClick={() => setSelectedCategory("form")}
          >
            Form
          </button>
        </div>
      </header>

      <main>
        <div className="template-grid">
          {filteredTemplates.map((template, index) => (
            <TemplateCard key={index} template={template} index={index} />
          ))}
        </div>
      </main>

      <footer>
        <p>© 2025 CSS Template Library - Dibuat oleh Josin Bahaswan</p>
      </footer>
    </div>
  );
}

function TemplateCard({ template, index }) {
  const [copied, setCopied] = useState(false);
  const [showHtmlClasses, setShowHtmlClasses] = useState(false);
  const htmlRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    // Highlight code when component mounts or template changes
    if (htmlRef.current && window.Prism) {
      window.Prism.highlightElement(htmlRef.current);
    }

    // Apply CSS to the preview
    if (previewRef.current) {
      const styleElement = document.createElement("style");
      styleElement.textContent = template.code;
      previewRef.current.appendChild(styleElement);

      // Add scale adjustment for different component types
      const previewContent = previewRef.current;
      if (template.category === "navbar") {
        previewContent.style.width = "100%";
        previewContent.style.transform = "scale(1)";
      } else if (template.category === "hero") {
        previewContent.style.width = "100%";
        previewContent.style.transform = "scale(0.9)";
      } else if (template.category === "card") {
        previewContent.style.transform = "scale(1.1)";
      } else if (template.category === "form") {
        previewContent.style.transform = "scale(1.05)";
      } else if (template.category === "button") {
        previewContent.style.transform = "scale(1.2)";
      }
    }

    return () => {
      if (previewRef.current) {
        const styleElements = previewRef.current.querySelectorAll("style");
        styleElements.forEach((element) => element.remove());
      }
    };
  }, [template, showHtmlClasses]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(template.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleHtmlClasses = () => {
    setShowHtmlClasses(!showHtmlClasses);
  };

  return (
    <div className="template-card" data-category={template.category}>
      <div className="card-header" data-number={index + 1}>
        <h3>{template.title}</h3>
        <div className="category-tag">{template.category}</div>
      </div>

      <div className="preview-container">
        <div
          className="preview-content"
          ref={previewRef}
          dangerouslySetInnerHTML={{ __html: template.htmlStructure }}
        ></div>
      </div>

      <div className="template-details">
        <p className="description">{template.description}</p>

        <div className="button-group">
          <button className="view-html-button" onClick={toggleHtmlClasses}>
            {showHtmlClasses ? "Sembunyikan HTML" : "Lihat Struktur HTML"}
          </button>
          <button
            className={`copy-button ${copied ? "copied" : ""}`}
            onClick={copyToClipboard}
          >
            {copied ? "CSS Disalin!" : "Salin CSS"}
          </button>
        </div>
      </div>

      {showHtmlClasses && (
        <div className="html-container">
          <h4>Struktur HTML</h4>
          <pre className="language-html">
            <code ref={htmlRef} className="language-html">
              {template.htmlStructure}
            </code>
          </pre>
        </div>
      )}

      {/* CSS code container is hidden via CSS */}
      <div className="code-container">
        <h4>Kode CSS</h4>
        <pre className="language-css">
          <code className="language-css">{template.code}</code>
        </pre>
      </div>
    </div>
  );
}

// Data Template CSS
const cssTemplates = [
  {
    title: "Modern Card Design",
    category: "card",
    description: "Card design elegan dengan efek hover dan bayangan yang halus",
    htmlStructure: `<div class="modern-card">
  <div class="card-image">
    <img src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200&q=80" alt="Card Image">
  </div>
  <div class="card-content">
    <h3 class="card-title">Card Title</h3>
    <p class="card-text">Description goes here...</p>
    <a href="#" class="card-button">Read More</a>
  </div>
</div>`,
    code: `.modern-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  max-width: 350px;
}

.modern-card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.card-image {
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.modern-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 20px;
}

.card-title {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.4rem;
}

.card-text {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.card-button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.card-button:hover {
  background-color: #2980b9;
}`,
  },
  {
    title: "Glassmorphism UI",
    category: "card",
    description: "UI dengan efek glassmorphism modern yang populer saat ini",
    htmlStructure: `<div class="gradient-bg">
  <div class="glass-card">
    <h3 class="glass-title">Glass Card</h3>
    <p class="glass-content">This is a glassmorphism style card with a beautiful backdrop filter effect.</p>
    <button class="glass-button">Learn More</button>
  </div>
</div>`,
    code: `/* Background untuk parent element */
.gradient-bg {
  background: linear-gradient(135deg, #4158D0, #C850C0, #FFCC70);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 350px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.glass-title {
  color: white;
  margin-bottom: 15px;
  font-size: 1.8rem;
  font-weight: 600;
}

.glass-content {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 25px;
  line-height: 1.6;
}

.glass-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 30px;
  backdrop-filter: blur(5px);
  cursor: pointer;
  transition: background 0.3s ease;
  font-weight: 500;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.3);
}`,
  },
  {
    title: "Modern Navbar",
    category: "navbar",
    description: "Navbar responsif dengan efek hover dan desain modern",
    htmlStructure: `<nav class="modern-navbar">
  <div class="navbar-logo">
    <a href="#">Brand</a>
  </div>
  <ul class="navbar-links">
    <li><a href="#" class="active">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Portfolio</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <div class="navbar-cta">
    <button class="navbar-button">Sign Up</button>
  </div>
</nav>`,
    code: `.modern-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 5%;
  position: relative;
}

.navbar-logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 30px;
}

.navbar-links li a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
}

.navbar-links li a:hover,
.navbar-links li a.active {
  color: #3498db;
}

.navbar-links li a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #3498db;
  left: 0;
  bottom: -5px;
  transition: width 0.3s ease;
}

.navbar-links li a:hover::after,
.navbar-links li a.active::after {
  width: 100%;
}

.navbar-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navbar-button:hover {
  background-color: #2980b9;
}

/* Responsive styles */
@media (max-width: 768px) {
  .modern-navbar {
    flex-direction: column;
    padding: 15px;
  }
  
  .navbar-links {
    margin: 20px 0;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    text-align: center;
  }
  
  .navbar-cta {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}`,
  },
  {
    title: "Hero Section",
    category: "hero",
    description:
      "Hero section modern dengan background gradient dan tombol CTA",
    htmlStructure: `<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">Welcome to Our Platform</h1>
    <p class="hero-text">Discover amazing features and services that will transform your experience.</p>
    <div class="hero-buttons">
      <button class="primary-button">Get Started</button>
      <button class="secondary-button">Learn More</button>
    </div>
  </div>
  <div class="hero-image">
    <div class="image-placeholder"></div>
  </div>
</section>`,
    code: `.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 10%;
  min-height: 500px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 2.8rem;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-text {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

.primary-button {
  padding: 12px 25px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.3);
}

.secondary-button {
  padding: 12px 25px;
  background-color: transparent;
  color: #3498db;
  border: 2px solid #3498db;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background-color: rgba(52, 152, 219, 0.1);
  transform: translateY(-3px);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.image-placeholder {
  width: 400px;
  height: 300px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.image-placeholder::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
}

@media (max-width: 992px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  
  .hero-content {
    max-width: 100%;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-image {
    justify-content: center;
  }
  
  .image-placeholder {
    width: 90%;
    max-width: 400px;
  }
}`,
  },
  {
    title: "Modern Button Collection",
    category: "button",
    description: "Koleksi button modern dengan berbagai efek interaktif",
    htmlStructure: `<div class="button-collection">
  <button class="gradient-button">Gradient Button</button>
  <button class="outline-button">Outline Button</button>
  <button class="icon-button">
    <span class="button-icon">→</span>
    <span>Icon Button</span>
  </button>
  <button class="pulse-button">Pulse Effect</button>
  <button class="slide-button">Slide Effect</button>
</div>`,
    code: `.button-collection {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

/* Base button styles */
.button-collection button {
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

/* Gradient Button */
.gradient-button {
  background: linear-gradient(45deg, #3498db, #8e44ad);
  color: white;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}

.gradient-button:hover {
  background: linear-gradient(45deg, #8e44ad, #3498db);
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(52, 152, 219, 0.6);
}

/* Outline Button */
.outline-button {
  background-color: transparent;
  color: #3498db;
  border: 2px solid #3498db;
  box-shadow: 0 2px 10px rgba(52, 152, 219, 0.1);
}

.outline-button:hover {
  background-color: #3498db;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(52, 152, 219, 0.3);
}

/* Icon Button */
.icon-button {
  background-color: #27ae60;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
}

.button-icon {
  transition: transform 0.3s ease;
}

.icon-button:hover {
  background-color: #219653;
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(39, 174, 96, 0.6);
}

.icon-button:hover .button-icon {
  transform: translateX(5px);
}

/* Pulse Button */
.pulse-button {
  background-color: #e74c3c;
  color: white;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
  position: relative;
}

.pulse-button:hover {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(231, 76, 60, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);
  }
}

/* Slide Button */
.slide-button {
  background-color: #f39c12;
  color: white;
  position: relative;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
}

.slide-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #d35400;
  transition: width 0.3s ease;
  z-index: -1;
}

.slide-button:hover {
  box-shadow: 0 7px 20px rgba(243, 156, 18, 0.6);
}

.slide-button:hover::before {
  width: 100%;
}`,
  },
  {
    title: "Modern Form Design",
    category: "form",
    description: "Form design modern dengan animasi input dan validasi visual",
    htmlStructure: `<div class="form-container">
  <form class="modern-form">
    <h2 class="form-title">Contact Us</h2>
    
    <div class="form-group">
      <input type="text" id="name" class="form-input" placeholder=" " required>
      <label for="name" class="form-label">Full Name</label>
    </div>
    
    <div class="form-group">
      <input type="email" id="email" class="form-input" placeholder=" " required>
      <label for="email" class="form-label">Email Address</label>
    </div>
    
    <div class="form-group">
      <textarea id="message" class="form-input form-textarea" placeholder=" " required></textarea>
      <label for="message" class="form-label">Your Message</label>
    </div>
    
    <button type="submit" class="form-button">Send Message</button>
  </form>
</div>`,
    code: `.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 400px;
}

.modern-form {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.form-title {
  margin-bottom: 30px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
}

.form-group {
  position: relative;
  margin-bottom: 25px;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-label {
  position: absolute;
  top: 12px;
  left: 15px;
  color: #888;
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
  background-color: transparent;
}

.form-input:focus,
.form-input:not(:placeholder-shown) {
  border-color: #3498db;
  outline: none;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: -10px;
  left: 10px;
  font-size: 0.8rem;
  padding: 0 5px;
  color: #3498db;
  background-color: white;
}

.form-button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.form-button:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.3);
}

.form-button:active {
  transform: translateY(-1px);
}

/* Validation Styles */
.form-input:valid {
  border-color: #27ae60;
}

.form-input:valid + .form-label {
  color: #27ae60;
}

.form-input:invalid:not(:placeholder-shown) {
  border-color: #e74c3c;
}

.form-input:invalid:not(:placeholder-shown) + .form-label {
  color: #e74c3c;
}`,
  },
  {
    title: "Neumorphic Dashboard Card",
    category: "card",
    description:
      "UI card dengan efek neumorphism modern dengan detail bayangan yang halus dan realistis",
    htmlStructure: `<div class="neumorph-container">
  <div class="neumorph-card">
    <div class="card-icon">
      <div class="icon-circle">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
      </div>
    </div>
    <div class="card-info">
      <h3 class="neumorph-title">Project Analytics</h3>
      <p class="neumorph-value">87.4%</p>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <p class="neumorph-caption">Monthly Growth</p>
    </div>
    <div class="card-actions">
      <button class="neumorph-button">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
      </button>
      <button class="neumorph-button">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
      </button>
    </div>
  </div>
</div>`,
    code: `.neumorph-container {
  background-color: #e0e5ec;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  font-family: 'Inter', sans-serif;
  border-radius: 15px;
}

.neumorph-card {
  background-color: #e0e5ec;
  width: 330px;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 8px 8px 15px rgba(174, 174, 192, 0.4),
              -8px -8px 15px rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.neumorph-card:hover {
  transform: translateY(-5px);
  box-shadow: 10px 10px 20px rgba(174, 174, 192, 0.5),
              -10px -10px 20px rgba(255, 255, 255, 0.9);
}

.neumorph-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  transform: rotate(30deg);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.neumorph-card:hover::after {
  opacity: 1;
  animation: shine 1.5s ease-out;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(30deg);
  }
  100% {
    transform: translateX(100%) rotate(30deg);
  }
}

.card-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e0e5ec;
  box-shadow: inset 4px 4px 8px rgba(174, 174, 192, 0.4),
              inset -4px -4px 8px rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5b87e4;
  transition: all 0.3s ease;
}

.neumorph-card:hover .icon-circle {
  color: #4361ee;
  box-shadow: inset 6px 6px 10px rgba(174, 174, 192, 0.5),
              inset -6px -6px 10px rgba(255, 255, 255, 0.9);
}

.card-info {
  text-align: center;
  margin-bottom: 20px;
}

.neumorph-title {
  color: #555;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.neumorph-value {
  color: #4361ee;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.neumorph-card:hover .neumorph-value {
  transform: scale(1.05);
  color: #3a56e4;
}

.progress-bar {
  height: 8px;
  width: 100%;
  background: #e0e5ec;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: inset 3px 3px 6px rgba(174, 174, 192, 0.4),
              inset -3px -3px 6px rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 87%;
  background: linear-gradient(to right, #4361ee, #6f9fff);
  border-radius: 10px;
  position: relative;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.neumorph-caption {
  color: #888;
  font-size: 0.9rem;
  font-weight: 500;
}

.card-actions {
  display: flex;
  justify-content: space-around;
}

.neumorph-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #e0e5ec;
  border: none;
  box-shadow: 5px 5px 10px rgba(174, 174, 192, 0.4),
              -5px -5px 10px rgba(255, 255, 255, 0.8);
  color: #5b87e4;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.neumorph-button:hover {
  box-shadow: 6px 6px 12px rgba(174, 174, 192, 0.5),
              -6px -6px 12px rgba(255, 255, 255, 0.9);
  color: #4361ee;
  transform: translateY(-2px);
}

.neumorph-button:active {
  box-shadow: inset 4px 4px 8px rgba(174, 174, 192, 0.4),
              inset -4px -4px 8px rgba(255, 255, 255, 0.8);
  color: #4361ee;
  transform: translateY(0);
}`,
  },
  {
    title: "Animated Pricing Table",
    category: "card",
    description:
      "Tabel harga dengan animasi dan efek hover yang interaktif serta desain modern",
    htmlStructure: `<div class="pricing-container">
  <div class="pricing-card">
    <div class="pricing-header">
      <div class="pricing-badge">POPULAR</div>
      <h3 class="pricing-title">Premium</h3>
      <div class="pricing-price">
        <span class="currency">$</span>
        <span class="amount">49</span>
        <span class="period">/month</span>
      </div>
    </div>
    <div class="pricing-features">
      <div class="feature">
        <div class="feature-icon check">✓</div>
        <span>Unlimited Projects</span>
      </div>
      <div class="feature">
        <div class="feature-icon check">✓</div>
        <span>24/7 Support</span>
      </div>
      <div class="feature">
        <div class="feature-icon check">✓</div>
        <span>Premium Templates</span>
      </div>
      <div class="feature">
        <div class="feature-icon check">✓</div>
        <span>Customer Management</span>
      </div>
      <div class="feature disabled">
        <div class="feature-icon cross">✕</div>
        <span>Advanced Analytics</span>
      </div>
    </div>
    <button class="pricing-button">Get Started</button>
  </div>
</div>`,
    code: `.pricing-container {
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-family: 'Inter', sans-serif;
  border-radius: 15px;
}

.pricing-card {
  width: 350px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  z-index: 1;
}

.pricing-card::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.pricing-card:hover {
  transform: translateY(-15px) scale(1.03);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.pricing-card:hover::before {
  opacity: 0.05;
}

.pricing-header {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  padding: 30px;
  text-align: center;
  position: relative;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.pricing-card:hover .pricing-header {
  background: linear-gradient(135deg, #4338ca 0%, #7c3aed 100%);
  padding-top: 40px;
  padding-bottom: 40px;
}

.pricing-badge {
  position: absolute;
  top: -10px;
  right: 30px;
  background: #f472b6;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 20px;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(244, 114, 182, 0.3);
  transform: translateY(0);
  opacity: 1;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pricing-card:hover .pricing-badge {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(244, 114, 182, 0.4);
}

.pricing-title {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

.pricing-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.pricing-card:hover .pricing-title::after {
  width: 40px;
}

.pricing-price {
  color: white;
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 20px;
}

.currency {
  font-size: 1.5rem;
  font-weight: 400;
  margin-right: 5px;
  opacity: 0.8;
}

.amount {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -1px;
  transition: all 0.3s ease;
}

.pricing-card:hover .amount {
  transform: scale(1.1);
}

.period {
  font-size: 1rem;
  margin-left: 5px;
  opacity: 0.7;
}

.pricing-features {
  padding: 30px;
}

.feature {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.pricing-card:hover .feature {
  transform: translateX(5px);
}

.feature-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.check {
  background-color: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.cross {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.feature span {
  color: #4b5563;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.disabled span {
  color: #9ca3af;
  text-decoration: line-through;
  text-decoration-color: rgba(156, 163, 175, 0.5);
  text-decoration-thickness: 2px;
}

.pricing-button {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  width: calc(100% - 60px);
  margin: 0 30px 30px;
  padding: 15px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
}

.pricing-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4338ca, #6d28d9);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.pricing-button span {
  position: relative;
  z-index: 1;
}

.pricing-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
}

.pricing-button:hover::before {
  opacity: 1;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.pricing-card:hover .check {
  animation: spin 0.6s ease-in-out;
}`,
  },
  {
    title: "Sticky Transparent Navbar",
    category: "navbar",
    description:
      "Navbar transparan dengan efek scroll yang elegan, berubah warna saat di-scroll",
    htmlStructure: `<div class="nav-demo-container">
  <nav class="transparent-navbar">
    <div class="navbar-brand">
      <a href="#" class="brand-logo">HORIZON</a>
    </div>
    <div class="navbar-menu">
      <ul class="navbar-nav">
        <li class="nav-item"><a href="#" class="nav-link active">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link">About</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Services</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Portfolio</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
      </ul>
    </div>
    <div class="navbar-toggle">
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
    </div>
  </nav>
  <div class="nav-demo-content">
    <h2>Scroll Changes Navbar Style</h2>
    <p>This navbar changes appearance on scroll</p>
  </div>
</div>`,
    code: `.nav-demo-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), 
              url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
}

.transparent-navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
  z-index: 1000;
}

/* JavaScript would add this class on scroll */
.transparent-navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 15px 40px;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-logo {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.transparent-navbar.scrolled .brand-logo {
  color: #333;
  text-shadow: none;
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;
}

.transparent-navbar.scrolled .nav-link {
  color: #555;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: width 0.3s ease;
}

.transparent-navbar.scrolled .nav-link::after {
  background-color: #4361ee;
}

.nav-link:hover, .nav-link.active {
  color: white;
}

.transparent-navbar.scrolled .nav-link:hover,
.transparent-navbar.scrolled .nav-link.active {
  color: #4361ee;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.toggle-line {
  width: 30px;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

.transparent-navbar.scrolled .toggle-line {
  background-color: #333;
}

.nav-demo-content {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
}

.nav-demo-content h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.nav-demo-content p {
  font-size: 1.1rem;
  max-width: 600px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .navbar-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .transparent-navbar.scrolled .navbar-menu {
    background-color: rgba(255, 255, 255, 0.98);
  }
  
  .navbar-menu.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .navbar-nav {
    flex-direction: column;
    gap: 0;
    padding: 20px 0;
  }
  
  .nav-item {
    width: 100%;
    text-align: center;
  }
  
  .nav-link {
    display: block;
    padding: 15px 0;
  }
  
  .navbar-toggle {
    display: flex;
  }
}`,
  },
  {
    title: "Mega Dropdown Navbar",
    category: "navbar",
    description:
      "Navbar dengan mega dropdown menu untuk navigasi kompleks yang terorganisir dengan baik",
    htmlStructure: `<nav class="mega-navbar">
  <div class="navbar-container">
    <div class="brand">
      <a href="#" class="logo">MegaNav</a>
    </div>
    
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="#" class="nav-link">Home</a>
      </li>
      <li class="nav-item has-dropdown">
        <a href="#" class="nav-link">Products <i class="dropdown-icon">▼</i></a>
        <div class="mega-dropdown">
          <div class="dropdown-grid">
            <div class="dropdown-column">
              <h4 class="dropdown-heading">Categories</h4>
              <ul class="dropdown-list">
                <li><a href="#">Web Templates</a></li>
                <li><a href="#">UI Components</a></li>
                <li><a href="#">WordPress Themes</a></li>
                <li><a href="#">Mobile Apps</a></li>
                <li><a href="#">Browser Extensions</a></li>
              </ul>
            </div>
            <div class="dropdown-column">
              <h4 class="dropdown-heading">Services</h4>
              <ul class="dropdown-list">
                <li><a href="#">Customization</a></li>
                <li><a href="#">Integration</a></li>
                <li><a href="#">API Access</a></li>
                <li><a href="#">Consultancy</a></li>
                <li><a href="#">Maintenance</a></li>
              </ul>
            </div>
            <div class="dropdown-column featured">
              <h4 class="dropdown-heading">Featured</h4>
              <div class="featured-card">
                <div class="card-image"></div>
                <h5>New Admin Dashboard</h5>
                <p>Our latest product with modern UI</p>
                <a href="#" class="featured-link">Learn more →</a>
              </div>

            </div>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">Pricing</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">Support</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>
    
    <div class="nav-buttons">
      <a href="#" class="sign-in">Sign In</a>
      <a href="#" class="sign-up">Sign Up</a>
    </div>
    
    <div class="hamburger">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </div>
</nav>`,
    code: `.mega-navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
  font-family: 'Inter', sans-serif;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
}

.logo {
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  color: #4361ee;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.nav-item {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-link {
  color: #555;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #4361ee;
}

.has-dropdown .nav-link {
  gap: 5px;
}

.dropdown-icon {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.has-dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

.mega-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  min-width: 800px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  padding: 30px;
  z-index: 101;
}

.has-dropdown:hover .mega-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.dropdown-heading {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 10px;
}

.dropdown-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 3px;
  background-color: #4361ee;
  border-radius: 10px;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-list li {
  margin-bottom: 10px;
}

.dropdown-list a {
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: block;
  padding: 5px 0;
}

.dropdown-list a:hover {
  color: #4361ee;
  transform: translateX(5px);
}

.featured-card {
  background-color: #f8fafc;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.featured-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.card-image {
  height: 120px;
  background: linear-gradient(135deg, #4361ee, #7209b7);
  border-radius: 8px;
  margin-bottom: 15px;
}

.featured-card h5 {
  font-size: 1rem;
  color: #333;
  margin: 0 0 5px 0;
}

.featured-card p {
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.featured-link {
  color: #4361ee;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.featured-link:hover {
  color: #3a56e4;
  text-decoration: underline;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sign-in, .sign-up {
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.sign-in {
  color: #4361ee;
}

.sign-in:hover {
  background-color: rgba(67, 97, 238, 0.1);
}

.sign-up {
  background-color: #4361ee;
  color: white;
}

.sign-up:hover {
  background-color: #3a56e4;
  box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
}

.hamburger {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: #333;
  transition: all 0.3s ease;
}

@media (max-width: 992px) {
  .hamburger {
    display: block;
  }
  
  .nav-menu {
    position: fixed;
    top: 80px;
    left: -100%;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: white;
    text-align: center;
    transition: all 0.3s ease;
    overflow-y: auto;
    z-index: 102;
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .nav-item {
    margin: 20px 0;
    height: auto;
  }
  
  .has-dropdown {
    display: block;
  }
  
  .nav-link {
    display: inline-block;
    height: auto;
  }
  
  .mega-dropdown {
    position: static;
    max-height: 0;
    min-width: 100%;
    overflow: hidden;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    padding: 0;
    transition: max-height 0.5s ease;
  }
  
  .has-dropdown.active .mega-dropdown {
    max-height: 1000px;
    padding: 20px;
  }
  
  .dropdown-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .nav-buttons {
    display: none;
  }
}`,
  },
  {
    title: "Parallax Hero Section",
    category: "hero",
    description:
      "Hero section dengan efek parallax scrolling yang elegan dan latar belakang dinamis",
    htmlStructure: `<section class="parallax-hero">
  <div class="parallax-bg"></div>
  <div class="hero-overlay"></div>
  <div class="parallax-content">
    <h1 class="parallax-title">Explore The World</h1>
    <p class="parallax-subtitle">Discover amazing places and create unforgettable memories with us</p>
    <div class="parallax-cta">
      <button class="cta-button primary">Start Journey</button>
      <button class="cta-button secondary">Learn More</button>
    </div>
    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</section>`,
    code: `.parallax-hero {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  perspective: 10px;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
  background-size: cover;
  background-position: center;
  transform-style: preserve-3d;
  transform: translateZ(-10px) scale(2);
  z-index: -1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 0;
}

.parallax-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.parallax-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeUp 1s ease forwards 0.3s;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.parallax-subtitle {
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s ease forwards 0.5s;
}

.parallax-cta {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 80px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s ease forwards 0.7s;
}

.cta-button {
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.cta-button.primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(79, 70, 229, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  opacity: 0;
  animation: fadeIn 1s ease forwards 1.2s;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.wheel {
  width: 4px;
  height: 8px;
  background-color: white;
  border-radius: 2px;
  animation: scroll 1.5s infinite;
}

.arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.arrow span {
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
  animation: arrowDown 1.5s infinite;
  opacity: 0;
}

.arrow span:nth-child(1) {
  animation-delay: 0s;
}

.arrow span:nth-child(2) {
  animation-delay: 0.2s;
}

.arrow span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(15px);
  }
}

@keyframes arrowDown {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(5px, 5px);
  }
}

@media (max-width: 768px) {
  .parallax-title {
    font-size: 2.8rem;
  }
  
  .parallax-subtitle {
    font-size: 1.1rem;
  }
  
  .parallax-cta {
    flex-direction: column;
    gap: 15px;
  }
  
  .cta-button {
    width: 100%;
  }
}`,
  },
  {
    title: "Split Screen Hero",
    category: "hero",
    description:
      "Hero section dengan layout split screen modern dan animasi teks yang menarik",
    htmlStructure: `<section class="split-hero">
  <div class="split-left">
    <div class="split-content">
      <div class="split-text-wrapper">
        <h1 class="split-heading">
          <span class="heading-line">Creative</span>
          <span class="heading-line">Design</span>
          <span class="heading-line highlight">Solutions</span>
        </h1>
        <p class="split-description">We blend innovation and design to create meaningful digital experiences that connect with your audience.</p>
      </div>
      <div class="split-cta">
        <a href="#" class="split-button">Our Work</a>
        <div class="play-button">
          <div class="play-icon"></div>
          <span>Watch Reel</span>
        </div>
      </div>
      <div class="split-stats">
        <div class="stat-item">
          <span class="stat-number">250+</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">120+</span>
          <span class="stat-label">Clients</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">15+</span>
          <span class="stat-label">Awards</span>
        </div>
      </div>
    </div>
  </div>
  <div class="split-right">
    <div class="image-grid">
      <div class="grid-item item1"></div>
      <div class="grid-item item2"></div>
      <div class="grid-item item3"></div>
      <div class="grid-item item4"></div>
    </div>
  </div>
</section>`,
    code: `.split-hero {
  display: flex;
  min-height: 650px;
  width: 100%;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.split-left {
  flex: 1;
  background-color: #0f172a;
  padding: 60px;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.split-left::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%);
  top: -150px;
  left: -150px;
  filter: blur(60px);
  z-index: 1;
}

.split-left::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.15) 0%, rgba(251, 113, 133, 0.05) 100%);
  bottom: -100px;
  right: -100px;
  filter: blur(40px);
  z-index: 1;
}

.split-content {
  position: relative;
  z-index: 2;
  max-width: 500px;
}

.split-text-wrapper {
  margin-bottom: 40px;
}

.split-heading {
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 25px;
  overflow: hidden;
}

.heading-line {
  display: block;
  transform: translateY(100%);
  opacity: 0;
  animation: slideUp 0.8s forwards cubic-bezier(0.5, 0, 0.1, 1);
}

.heading-line:nth-child(1) {
  animation-delay: 0.2s;
}

.heading-line:nth-child(2) {
  animation-delay: 0.4s;
}

.heading-line:nth-child(3) {
  animation-delay: 0.6s;
}

.highlight {
  position: relative;
  display: inline-block;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(135deg, #4f46e5, #ec4899);
}

.highlight::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 5px;
  width: 100%;
  height: 8px;
  background-image: linear-gradient(135deg, #4f46e5, #ec4899);
  opacity: 0.3;
  z-index: -1;
}

.split-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  max-width: 450px;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeUp 0.8s forwards cubic-bezier(0.5, 0, 0.1, 1) 0.8s;
}

.split-cta {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 50px;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeUp 0.8s forwards cubic-bezier(0.5, 0, 0.1, 1) 1s;
}

.split-button {
  display: inline-block;
  padding: 15px 30px;
  background-image: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
  position: relative;
  overflow: hidden;
}

.split-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(135deg, #4338ca, #6d28d9);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.split-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(79, 70, 229, 0.4);
}

.split-button:hover::before {
  opacity: 1;
}

.play-button {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.play-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 0 8px 12px;
  border-color: transparent transparent transparent white;
}

.play-button:hover .play-icon {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.split-stats {
  display: flex;
  align-items: center;
  gap: 30px;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeUp 0.8s forwards cubic-bezier(0.5, 0, 0.1, 1) 1.2s;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #4f46e5, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
}

.split-right {
  flex: 1;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  overflow: hidden;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1/1;
}

.grid-item {
  border-radius: 15px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: scale(0.8);
  opacity: 0;
  animation: scaleIn 0.8s forwards cubic-bezier(0.5, 0, 0.1, 1);
}

.item1 {
  background-image: url('https://images.unsplash.com/photo-1549921296-bc643ead1e65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80');
  animation-delay: 0.3s;
}

.item2 {
  background-image: url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80');
  animation-delay: 0.5s;
}

.item3 {
  background-image: url('https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80');
  animation-delay: 0.7s;
}

.item4 {
  background-image: url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80');
  animation-delay: 0.9s;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 992px) {
  .split-hero {
    flex-direction: column;
  }
  
  .split-left, .split-right {
    padding: 40px 20px;
  }
  
  .split-heading {
    font-size: 3rem;
  }
  
  .split-stats {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .split-left::before, .split-left::after {
    display: none;
  }
}`,
  },
  {
    title: "3D Button Collection",
    category: "button",
    description:
      "Kumpulan button dengan efek 3D yang realistis dan interaksi yang menarik",
    htmlStructure: `<div class="button-container">
  <button class="btn-3d primary">3D Button</button>
  <button class="btn-3d success">Success</button>
  <button class="btn-3d danger">Danger</button>
  <button class="btn-3d warning">Warning</button>
  <button class="btn-3d info">Info</button>
</div>`,
    code: `.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
  justify-content: center;
  background-color: #f0f4f8;
  border-radius: 10px;
}

.btn-3d {
  position: relative;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 6px 0 0 rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
}

.btn-3d::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transform: translateZ(-1px);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.btn-3d:hover {
  transform: translateY(-3px);
}

.btn-3d:hover::before {
  opacity: 1;
}

.btn-3d:active {
  transform: translateY(3px);
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
}

.btn-3d.primary {
  background-color: #4361ee;
  box-shadow: 0 6px 0 0 #2c49d8;
}

.btn-3d.primary:active {
  box-shadow: 0 2px 0 0 #2c49d8;
}

.btn-3d.success {
  background-color: #2ecc71;
  box-shadow: 0 6px 0 0 #25a25a;
}

.btn-3d.success:active {
  box-shadow: 0 2px 0 0 #25a25a;
}

.btn-3d.danger {
  background-color: #e74c3c;
  box-shadow: 0 6px 0 0 #c0392b;
}

.btn-3d.danger:active {
  box-shadow: 0 2px 0 0 #c0392b;
}

.btn-3d.warning {
  background-color: #f39c12;
  box-shadow: 0 6px 0 0 #d35400;
}

.btn-3d.warning:active {
  box-shadow: 0 2px 0 0 #d35400;
}

.btn-3d.info {
  background-color: #3498db;
  box-shadow: 0 6px 0 0 #2980b9;
}

.btn-3d.info:active {
  box-shadow: 0 2px 0 0 #2980b9;
}`,
  },
  {
    title: "Glow Effect Buttons",
    category: "button",
    description:
      "Button dengan efek neon glow yang dramatis saat hover dan interactive states",
    htmlStructure: `<div class="glow-container">
  <button class="glow-button purple">Glow Button</button>
  <button class="glow-button cyan">Hover Me</button>
  <button class="glow-button green">Click Me</button>
  <button class="glow-button red">Glowing</button>
  <button class="glow-button yellow">Effect</button>
</div>`,
    code: `.glow-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 40px;
  justify-content: center;
  align-items: center;
  background-color: #0f172a;
  border-radius: 10px;
}

.glow-button {
  position: relative;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  color: white;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  overflow: hidden;
}

.glow-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.glow-button::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 10px;
  z-index: -2;
  transition: all 0.3s ease;
  filter: blur(15px);
  opacity: 0;
}

.glow-button:hover::after, 
.glow-button:focus::after {
  opacity: 0.7;
  filter: blur(20px);
}

.glow-button:active {
  transform: scale(0.95);
}

/* Purple variant */
.glow-button.purple::before {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
}

.glow-button.purple::after {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
}

/* Cyan variant */
.glow-button.cyan::before {
  background: linear-gradient(135deg, #22d3ee, #06b6d4);
}

.glow-button.cyan::after {
  background: linear-gradient(135deg, #22d3ee, #06b6d4);
}

/* Green variant */
.glow-button.green::before {
  background: linear-gradient(135deg, #4ade80, #22c55e);
}

.glow-button.green::after {
  background: linear-gradient(135deg, #4ade80, #22c55e);
}

/* Red variant */
.glow-button.red::before {
  background: linear-gradient(135deg, #f87171, #ef4444);
}

.glow-button.red::after {
  background: linear-gradient(135deg, #f87171, #ef4444);
}

/* Yellow variant */
.glow-button.yellow::before {
  background: linear-gradient(135deg, #facc15, #eab308);
}

.glow-button.yellow::after {
  background: linear-gradient(135deg, #facc15, #eab308);
}

.glow-button:hover {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  letter-spacing: 2px;
}`,
  },
  {
    title: "Animated Icon Buttons",
    category: "button",
    description:
      "Button dengan animasi ikon yang halus untuk meningkatkan interaksi pengguna",
    htmlStructure: `<div class="icon-button-container">
  <button class="icon-btn download">
    <span class="btn-text">Download</span>
    <span class="btn-icon">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
    </span>
  </button>
  
  <button class="icon-btn send">
    <span class="btn-text">Send</span>
    <span class="btn-icon">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    </span>
  </button>
  
  <button class="icon-btn check">
    <span class="btn-text">Submit</span>
    <span class="btn-icon">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </span>
  </button>
  
  <button class="icon-btn search">
    <span class="btn-text">Search</span>
    <span class="btn-icon">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </span>
  </button>
  
  <button class="icon-btn star">
    <span class="btn-text">Favorite</span>
    <span class="btn-icon">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    </span>
  </button>
</div>`,
    code: `.icon-button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  background-color: #f9fafb;
  border-radius: 10px;
}

.icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.btn-text {
  transition: transform 0.3s ease;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* Download button */
.icon-btn.download {
  background-color: #4f46e5;
  overflow: hidden;
}

.icon-btn.download:hover {
  background-color: #4338ca;
}

.icon-btn.download .btn-text {
  display: inline-block;
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.icon-btn.download .btn-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.icon-btn.download:hover .btn-text {
  transform: translateY(-100%);
  opacity: 0;
}

.icon-btn.download:hover .btn-icon {
  transform: translate(-50%, -50%);
  opacity: 1;
}

/* Send button */
.icon-btn.send {
  background-color: #06b6d4;
  overflow: hidden;
}

.icon-btn.send:hover {
  background-color: #0891b2;
}

.icon-btn.send .btn-text {
  display: inline-block;
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.icon-btn.send .btn-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(100%, -50%);
  opacity: 0;
  transition: all 0.3s ease;
}

.icon-btn.send:hover .btn-text {
  transform: translateX(-100%);
  opacity: 0;
}

.icon-btn.send:hover .btn-icon {
  transform: translate(-50%, -50%);
  opacity: 1;
}

/* Check button */
.icon-btn.check {
  background-color: #22c55e;
}

.icon-btn.check:hover {
  background-color: #16a34a;
}

.icon-btn.check:hover .btn-icon {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

/* Search button */
.icon-btn.search {
  background-color: #64748b;
  padding-right: 16px;
}

.icon-btn.search:hover {
  background-color: #475569;
  padding-right: 24px;
}

.icon-btn.search .btn-icon {
  margin-right: -8px;
  transform: scale(0.8);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.icon-btn.search:hover .btn-icon {
  transform: scale(1);
  opacity: 1;
  margin-right: 0;
}

/* Star button */
.icon-btn.star {
  background-color: #eab308;
}

.icon-btn.star:hover {
  background-color: #ca8a04;
}

.icon-btn.star .btn-icon {
  transition: all 0.5s ease;
}

.icon-btn.star:hover .btn-icon {
  transform: rotate(360deg);
}`,
  },
  {
    title: "Morphing Buttons",
    category: "button",
    description:
      "Button yang berubah bentuk dengan animasi morphing dan efek interaktif lainnya",
    htmlStructure: `<div class="morphing-container">
  <button class="morph-button expand">
    <span>Expand</span>
  </button>
  
  <button class="morph-button collapse">
    <span>Collapse</span>
  </button>
  
  <button class="morph-button circle">
    <span>Circle</span>
  </button>
  
  <button class="morph-button liquid">
    <span>Liquid</span>
  </button>
  
  <button class="morph-button jelly">
    <span>Jelly</span>
  </button>
</div>`,
    code: `.morphing-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 40px;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  border-radius: 10px;
}

.morph-button {
  position: relative;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
  z-index: 1;
}

.morph-button span {
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;
}

/* Expand button */
.morph-button.expand {
  background-color: #8b5cf6;
}

.morph-button.expand::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #7c3aed;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 0;
}

.morph-button.expand:hover {
  border-radius: 30px;
}

.morph-button.expand:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

/* Collapse button */
.morph-button.collapse {
  background-color: #ec4899;
  overflow: visible;
}

.morph-button.collapse::before,
.morph-button.collapse::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #db2777;
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  opacity: 0;
  z-index: 0;
}

.morph-button.collapse::before {
  top: -10px;
  left: -10px;
}

.morph-button.collapse::after {
  bottom: -10px;
  right: -10px;
}

.morph-button.collapse:hover {
  background-color: #db2777;
  transform: scale(0.95);
}

.morph-button.collapse:hover::before,
.morph-button.collapse:hover::after {
  opacity: 1;
  transform: scale(1.5);
}

/* Circle button */
.morph-button.circle {
  background-color: #06b6d4;
  border-radius: 8px;
  width: 120px;
}

.morph-button.circle:hover {
  border-radius: 50%;
  width: 56px;
  height: 56px;
  padding: 0;
}

.morph-button.circle span {
  display: inline-block;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.morph-button.circle:hover span {
  font-size: 0;
  width: 24px;
  height: 24px;
}

.morph-button.circle:hover span::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

/* Liquid button */
.morph-button.liquid {
  background-color: #f59e0b;
  border-radius: 8px;
}

.morph-button.liquid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d97706;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 0;
  transform: scaleY(0);
  transform-origin: bottom;
}

.morph-button.liquid:hover {
  border-radius: 12px 12px 24px 24px;
}

.morph-button.liquid:hover::before {
  transform: scaleY(1);
  border-radius: 12px 12px 24px 24px;
}

/* Jelly button */
.morph-button.jelly {
  background-color: #ef4444;
}

.morph-button.jelly:hover {
  animation: jelly 0.8s ease;
}

@keyframes jelly {
  0%, 100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}`,
  },
  {
    title: "Border Animation Buttons",
    category: "button",
    description:
      "Koleksi button dengan animasi border yang menarik dan efek visual modern",
    htmlStructure: `<div class="border-button-container">
  <button class="border-btn draw">Draw Border</button>
  <button class="border-btn spin">Spin Border</button>
  <button class="border-btn fill">Fill Border</button>
  <button class="border-btn pulse">Pulse Border</button>
  <button class="border-btn glow">Glow Border</button>
</div>`,
    code: `.border-button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 40px;
  justify-content: center;
  align-items: center;
  background-color: #f0f9ff;
  border-radius: 10px;
}

.border-btn {
  position: relative;
  padding: 15px 30px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #3b82f6;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;
}

/* Draw Border */
.border-btn.draw {
  background-color: white;
  border: 2px solid #dbeafe;
}

.border-btn.draw::before,
.border-btn.draw::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  transition: all 0.3s ease;
}

.border-btn.draw::before {
  top: 0;
  left: 0;
  border-top: 2px solid #3b82f6;
  border-left: 2px solid #3b82f6;
}

.border-btn.draw::after {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid #3b82f6;
  border-right: 2px solid #3b82f6;
}

.border-btn.draw:hover {
  color: #1d4ed8;
  border-color: transparent;
}

.border-btn.draw:hover::before,
.border-btn.draw:hover::after {
  width: 100%;
  height: 100%;
  opacity: 1;
}

/* Spin Border */
.border-btn.spin {
  background-color: white;
  box-shadow: inset 0 0 0 2px #d8b4fe;
}

.border-btn.spin::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #8b5cf6;
  border-radius: inherit;
  transition: all 0.6s ease;
  z-index: -1;
  box-sizing: border-box;
  transform: rotate(0deg);
  opacity: 0;
}

.border-btn.spin:hover {
  color: #7c3aed;
  box-shadow: none;
}

.border-btn.spin:hover::before {
  transform: rotate(360deg);
  opacity: 1;
}

/* Fill Border */
.border-btn.fill {
  background-color: white;
  border: 2px solid #bae6fd;
  z-index: 1;
}

.border-btn.fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0ea5e9;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
  z-index: -1;
}

.border-btn.fill:hover {
  color: white;
  border-color: #0ea5e9;
}

.border-btn.fill:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

/* Pulse Border */
.border-btn.pulse {
  background-color: white;
  border: 2px solid #3b82f6;
}

.border-btn.pulse::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #3b82f6;
  border-radius: inherit;
  transition: all 0.3s ease;
  z-index: -1;
  box-sizing: border-box;
  opacity: 0;
}

.border-btn.pulse:hover {
  color: #1d4ed8;
}

.border-btn.pulse:hover::before {
  opacity: 1;
  animation: pulse-border 1.5s infinite;
}

@keyframes pulse-border {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/* Glow Border */
.border-btn.glow {
  background-color: white;
  border: 2px solid #a5b4fc;
  overflow: visible;
}

.border-btn.glow::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid #4f46e5;
  border-radius: 3px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: -1;
}

.border-btn.glow:hover {
  color: #4f46e5;
  border-color: #4f46e5;
}

.border-btn.glow:hover::before {
  opacity: 0.5;
  filter: blur(6px);
}`,
  },
  {
    title: "Minimalist Login Form",
    category: "form",
    description:
      "Form login minimalis dengan animasi label dan validasi visual yang elegan",
    htmlStructure: `<div class="minimal-form-container">
  <form class="minimal-form">
    <h2 class="minimal-title">Login</h2>
    
    <div class="minimal-input-group">
      <input type="email" id="email" class="minimal-input" required>
      <label for="email" class="minimal-label">Email</label>
      <div class="minimal-line"></div>
    </div>
    
    <div class="minimal-input-group">
      <input type="password" id="password" class="minimal-input" required>
      <label for="password" class="minimal-label">Password</label>
      <div class="minimal-line"></div>
      <button type="button" class="toggle-password">
        <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>
    </div>
    
    <div class="minimal-options">
      <div class="remember-group">
        <input type="checkbox" id="remember" class="minimal-checkbox">
        <label for="remember">Remember me</label>
      </div>
      <a href="#" class="forgot-link">Forgot password?</a>
    </div>
    
    <button type="submit" class="minimal-button">Sign In</button>
    
    <div class="minimal-footer">
      <p>Don't have an account? <a href="#">Sign up</a></p>
    </div>
  </form>
</div>`,
    code: `.minimal-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 450px;
  background-color: #f9fafb;
  font-family: 'Inter', sans-serif;
}

.minimal-form {
  width: 100%;
  max-width: 350px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.minimal-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 25px;
  text-align: center;
}

.minimal-input-group {
  position: relative;
  margin-bottom: 25px;
}

.minimal-input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #374151;
  border: none;
  background-color: transparent;
  outline: none;
}

.minimal-label {
  position: absolute;
  left: 0;
  top: 10px;
  font-size: 16px;
  color: #9ca3af;
  pointer-events: none;
  transition: all 0.3s ease;
}

.minimal-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  transition: all 0.3s ease;
}

.minimal-input:focus ~ .minimal-line,
.minimal-input:valid ~ .minimal-line {
  height: 2px;
  background-color: #4f46e5;
}

.minimal-input:focus ~ .minimal-label,
.minimal-input:valid ~ .minimal-label {
  top: -15px;
  font-size: 14px;
  color: #4f46e5;
}

.toggle-password {
  position: absolute;
  right: 0;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #4f46e5;
}

.eye-icon {
  transition: all 0.3s ease;
}

.minimal-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.remember-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.minimal-checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #d1d5db;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.minimal-checkbox:checked {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

.minimal-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-link {
  color: #4f46e5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #4338ca;
  text-decoration: underline;
}

.minimal-button {
  width: 100%;
  padding: 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.minimal-button:hover {
  background-color: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
}

.minimal-button:active {
  transform: translateY(0);
}

.minimal-footer {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.minimal-footer a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.minimal-footer a:hover {
  text-decoration: underline;
}`,
  },
  {
    title: "Compact Subscription Form",
    category: "form",
    description:
      "Form langganan kompak dengan desain clean dan animasi hover yang halus",
    htmlStructure: `<div class="subscription-container">
  <div class="subscription-card">
    <div class="subscription-header">
      <div class="subscription-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      </div>
      <h3 class="subscription-title">Subscribe to Newsletter</h3>
      <p class="subscription-subtitle">Get weekly updates and offers right to your inbox.</p>
    </div>
    
    <form class="subscription-form">
      <div class="input-row">
        <div class="compact-input-group">
          <input type="text" id="first-name" class="compact-input" placeholder="First Name" required>
        </div>
        <div class="compact-input-group">
          <input type="text" id="last-name" class="compact-input" placeholder="Last Name" required>
        </div>
      </div>
      
      <div class="compact-input-group">
        <input type="email" id="email-address" class="compact-input" placeholder="Email Address" required>
      </div>
      
      <div class="subscription-options">
        <div class="option-group">
          <input type="checkbox" id="weekly" class="custom-checkbox" checked>
          <label for="weekly">Weekly Newsletter</label>
        </div>
        <div class="option-group">
          <input type="checkbox" id="product-updates" class="custom-checkbox">
          <label for="product-updates">Product Updates</label>
        </div>
      </div>
      
      <button type="submit" class="subscription-button">
        <span>Subscribe</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </form>
    
    <p class="privacy-text">We respect your privacy. Unsubscribe at any time.</p>
  </div>
</div>`,
    code: `.subscription-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

.subscription-card {
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: all 0.3s ease;
}

.subscription-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.subscription-header {
  text-align: center;
  margin-bottom: 25px;
}

.subscription-icon {
  width: 50px;
  height: 50px;
  background-color: #dbeafe;
  color: #3b82f6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px;
  transition: all 0.3s ease;
}

.subscription-card:hover .subscription-icon {
  background-color: #bfdbfe;
  transform: scale(1.1);
}

.subscription-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 10px;
}

.subscription-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 10px;
}

.subscription-form {
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
}

.compact-input-group {
  flex: 1;
  margin-bottom: 15px;
}

.compact-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #334155;
  transition: all 0.3s ease;
}

.compact-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.compact-input::placeholder {
  color: #94a3b8;
}

.subscription-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-checkbox:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 3px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.option-group label {
  font-size: 0.95rem;
  color: #475569;
  cursor: pointer;
}

.subscription-button {
  width: 100%;
  padding: 12px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.subscription-button svg {
  transition: transform 0.3s ease;
}

.subscription-button:hover {
  background-color: #2563eb;
}

.subscription-button:hover svg {
  transform: translateX(5px);
}

.privacy-text {
  text-align: center;
  font-size: 0.85rem;
  color: #94a3b8;
  margin-top: 20px;
}`,
  },
  {
    title: "Feedback Form Card",
    category: "form",
    description:
      "Form feedback compact dengan rating bintang dan desain card modern",
    htmlStructure: `<div class="feedback-container">
  <div class="feedback-card">
    <div class="feedback-header">
      <h3 class="feedback-title">How was your experience?</h3>
      <p class="feedback-subtitle">Please let us know what you think of our service</p>
    </div>
    
    <form class="feedback-form">
      <div class="star-rating-container">
        <div class="star-rating">
          <input type="radio" id="star5" name="rating" value="5">
          <label for="star5"></label>
          <input type="radio" id="star4" name="rating" value="4">
          <label for="star4"></label>
          <input type="radio" id="star3" name="rating" value="3">
          <label for="star3"></label>
          <input type="radio" id="star2" name="rating" value="2">
          <label for="star2"></label>
          <input type="radio" id="star1" name="rating" value="1">
          <label for="star1"></label>
        </div>
        <div class="rating-text">Select your rating</div>
      </div>
      
      <div class="feedback-input-group">
        <textarea class="feedback-textarea" placeholder="Share your experience with us..." rows="3"></textarea>
      </div>
      
      <div class="feedback-input-row">
        <div class="feedback-input-group">
          <input type="text" class="feedback-input" placeholder="Your Name">
        </div>
        <div class="feedback-input-group">
          <input type="email" class="feedback-input" placeholder="Email Address">
        </div>
      </div>
      
      <div class="feedback-actions">
        <button type="button" class="cancel-button">Cancel</button>
        <button type="submit" class="submit-button">Submit Feedback</button>
      </div>
    </form>
  </div>
</div>`,
    code: `.feedback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  background-color: #f1f5f9;
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

.feedback-card {
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.feedback-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.feedback-header {
  padding: 25px 30px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  position: relative;
  overflow: hidden;
}

.feedback-header::before {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 0;
}

.feedback-header::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: -30px;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  z-index: 0;
}

.feedback-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 5px;
  position: relative;
  z-index: 1;
}

.feedback-subtitle {
  font-size: 0.9rem;
  opacity: 0.85;
  position: relative;
  z-index: 1;
}

.feedback-form {
  padding: 25px 30px 30px;
}

.star-rating-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}

.star-rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin-bottom: 8px;
}

.star-rating input {
  display: none;
}

.star-rating label {
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 0 3px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'%3E%3C/polygon%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.2s ease;
  position: relative;
}

.star-rating input:checked ~ label,
.star-rating label:hover,
.star-rating label:hover ~ label {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23fbbf24' stroke='%23fbbf24' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'%3E%3C/polygon%3E%3C/svg%3E");
  transform: scale(1.2);
}

.rating-text {
  font-size: 0.9rem;
  color: #64748b;
  margin-top: 5px;
}

.feedback-input-group {
  margin-bottom: 15px;
  width: 100%;
}

.feedback-input-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.feedback-input,
.feedback-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #334155;
  transition: all 0.3s ease;
  font-family: inherit;
}

.feedback-input:focus,
.feedback-textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.feedback-input::placeholder,
.feedback-textarea::placeholder {
  color: #94a3b8;
}

.feedback-textarea {
  resize: none;
  min-height: 80px;
}

.feedback-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-button,
.submit-button {
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button {
  background-color: transparent;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.cancel-button:hover {
  background-color: #f8fafc;
  color: #475569;
}

.submit-button {
  background-color: #667eea;
  color: white;
  border: none;
}

.submit-button:hover {
  background-color: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}`,
  },
];

export default App;
