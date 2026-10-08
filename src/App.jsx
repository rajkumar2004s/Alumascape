import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import ScrollToTop from "./components/ScrollToTop";
import PatioCovers from "./pages/PatioCovers";
import Portfolio from "./pages/Portfolio";
import ProjectDetails from "./pages/ProjectDetails";
import HowItWorks from "./pages/HowItWorks";
import Blog from "./pages/Blog";
import ArticleDetails from "./pages/ArticleDetails";
import Contact from "./pages/Contact";
import AreasWeServed from "./components/Areasweserved";
import AreaDetails from "./pages/AreaDetails";
import AIConsultant from "./components/AIConsultant";
function App() {
  return ( 
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/patio-covers" element={<PatioCovers />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<ProjectDetails />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<ArticleDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/areas" element={<AreasWeServed />} />
        <Route path="/areas/:slug" element={<AreaDetails />} />
      </Routes>
      <Footer />
      <AIConsultant />
    </BrowserRouter>
  );
}

export default App;
