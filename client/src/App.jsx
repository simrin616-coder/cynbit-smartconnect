import React from 'react';
import { useState } from "react";
import axios from "axios";
import { ArrowRight, Bot, Cloud, Code2, Layers3, Menu, X, CheckCircle2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const services = [
  { icon: Code2, title: "Web Development", text: "Responsive websites and scalable web applications built around your goals." },
  { icon: Bot, title: "AI & Automation", text: "Practical AI-powered workflows that reduce repetitive work." },
  { icon: Cloud, title: "Cloud Solutions", text: "Reliable cloud-ready applications and deployment support." },
  { icon: Layers3, title: "Custom Software", text: "Purpose-built digital products for your business requirements." }
];

const featureOptions = [
  "User authentication", "Admin dashboard", "Payment integration",
  "AI integration", "Mobile responsive design", "Reports and analytics"
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState("Web Development");
  const [features, setFeatures] = useState([]);
  const [timeline, setTimeline] = useState("1–3 months");
  const [budget, setBudget] = useState("₹25,000 – ₹50,000");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState(false);

  const toggleFeature = (feature) => {
    setFeatures(current => current.includes(feature)
      ? current.filter(item => item !== feature)
      : [...current, feature]);
  };

  async function submitInquiry(event) {
    event.preventDefault();
    setStatus("Sending your inquiry...");
    try {
      await axios.post(`${API}/api/inquiries`, {
        name, email, service, features, timeline, budget, message
      });
      setStatus("Thank you! Your project inquiry has been submitted.");
      setName(""); setEmail(""); setMessage("");
    } catch (error) {
      setStatus(error.response?.data?.message || "Could not submit. Check that the backend is running and try again.");
    }
  }

  return (
    <>
      <header className="navbar">
        <a className="brand" href="#home"><span className="brand-mark">C</span> cynbit<span className="brand-dot">.</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#planner" onClick={() => setMenuOpen(false)}>Project planner</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="nav-cta" href="#planner">Start a project <ArrowRight size={16}/></a>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse"></span> DIGITAL PRODUCTS · AI · ENGINEERING</div>
            <h1>Build something<br/><span>smarter.</span></h1>
            <p className="hero-text">We turn ambitious ideas into useful digital experiences through software engineering, cloud solutions and intelligent automation.</p>
            <div className="hero-actions">
              <a className="button primary" href="#planner">Plan your project <ArrowRight size={17}/></a>
              <a className="button secondary" href="#services">Explore services</a>
            </div>
            <div className="hero-note"><CheckCircle2 size={17}/> A clearer way to start your next digital project.</div>
          </div>
          <div className="hero-visual">
            <div className="visual-glow"></div>
            <div className="visual-card card-top"><span className="mini-icon"><Bot size={18}/></span><div><b>Intelligent systems</b><small>Ideas → automation</small></div><span className="status-dot"></span></div>
            <div className="visual-center"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="center-logo">C<span>.</span></div></div>
            <div className="visual-card card-bottom"><span className="mini-icon"><Code2 size={18}/></span><div><b>Built to scale</b><small>Engineering that grows</small></div><ArrowRight size={18}/></div>
            <div className="floating-tag">Ideas into impact <span>↗</span></div>
          </div>
        </section>

        <section className="trust-strip"><span>THOUGHTFUL DESIGN</span><i></i><span>MODERN ENGINEERING</span><i></i><span>USEFUL INNOVATION</span></section>

        <section className="section services-section" id="services">
          <div className="section-heading"><div><div className="eyebrow">WHAT WE CAN BUILD</div><h2>Technology with<br/><span>purpose.</span></h2></div><p>Choose a starting point. We can shape the right solution around your project requirements.</p></div>
          <div className="service-grid">
            {services.map(({icon: Icon, title, text}, index) => (
              <article className="service-card" key={title}><div className="service-icon"><Icon size={23}/></div><span className="service-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href="#planner" onClick={() => setService(title)}>Discuss this service <ArrowRight size={15}/></a></article>
            ))}
          </div>
        </section>

        <section className="planner-section" id="planner">
          <div className="section planner-layout">
            <div className="planner-intro"><div className="eyebrow">YOUR IDEA, MADE CLEAR</div><h2>Start with a<br/><span>smart plan.</span></h2><p>Tell us what you want to build. Select your requirements and create a project brief you can share with the team.</p><div className="planner-benefit"><CheckCircle2/> Organise your requirements</div><div className="planner-benefit"><CheckCircle2/> Set a timeline and budget range</div><div className="planner-benefit"><CheckCircle2/> Send a project inquiry</div></div>
            <div className="planner-card">
              <div className="planner-card-head"><div><span className="step-label">PROJECT PLANNER</span><h3>Tell us about your idea</h3></div><span className="step-count">01 / 04</span></div>
              <label>What do you want to build?</label>
              <select value={service} onChange={e => setService(e.target.value)}>
                {["Web Development", "AI & Automation", "Cloud Solutions", "Custom Software"].map(item => <option key={item}>{item}</option>)}
              </select>
              <label>Which features do you need?</label>
              <div className="feature-grid">{featureOptions.map(feature => <button type="button" key={feature} className={features.includes(feature) ? "feature selected" : "feature"} onClick={() => toggleFeature(feature)}>{features.includes(feature) ? "✓" : "+"} {feature}</button>)}</div>
              <div className="two-fields"><div><label>Expected timeline</label><select value={timeline} onChange={e => setTimeline(e.target.value)}><option>Less than 1 month</option><option>1–3 months</option><option>3–6 months</option><option>More than 6 months</option></select></div><div><label>Budget range</label><select value={budget} onChange={e => setBudget(e.target.value)}><option>Below ₹25,000</option><option>₹25,000 – ₹50,000</option><option>₹50,000 – ₹1,00,000</option><option>Above ₹1,00,000</option><option>Not decided</option></select></div></div>
              <button className="button primary full" type="button" onClick={() => setSummary(!summary)}>{summary ? "Hide project summary" : "Generate project summary"} <ArrowRight size={17}/></button>
              {summary && <div className="summary-box"><b>Your project brief</b><p><strong>Service:</strong> {service}</p><p><strong>Features:</strong> {features.length ? features.join(", ") : "To be discussed"}</p><p><strong>Timeline:</strong> {timeline}</p><p><strong>Budget:</strong> {budget}</p><button className="text-button" onClick={() => document.getElementById("contact").scrollIntoView({behavior:"smooth"})}>Continue to inquiry ↓</button></div>}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-copy"><div className="eyebrow">LET'S TALK</div><h2>Have a project<br/><span>in mind?</span></h2><p>Share a few details. Your project requirements will be sent as an inquiry.</p><div className="contact-decoration">C<span>.</span></div></div>
          <form className="contact-form" onSubmit={submitInquiry}>
            <h3>Send a project inquiry</h3>
            <div className="two-fields"><div><label htmlFor="name">Your name</label><input id="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"/></div><div><label htmlFor="email">Email address</label><input id="email" required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"/></div></div>
            <label htmlFor="message">Tell us about your project</label><textarea id="message" required rows="4" value={message} onChange={e => setMessage(e.target.value)} placeholder="What would you like to build?"></textarea>
            <button className="button primary full" type="submit">Submit inquiry <ArrowRight size={17}/></button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </section>
      </main>

      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">C</span> cynbit<span className="brand-dot">.</span></a><p>Thoughtful technology. Meaningful progress.</p><span>© {new Date().getFullYear()} Cynbit SmartConnect — independent assessment prototype.</span></footer>
    </>
  );
}

export default App;
