import { Routes, Route } from "react-router-dom";
import SearchBooks from "./views/searchBooks";
import Wishlist from "./views/wishlist";
import "bulma/css/bulma.min.css";
import Footer from "./components/footer";
import "./App.css";
function App() {
  return (
    <div className="container content is-fluid is-mobile ">
      <Routes>
        <Route path="/" element={<SearchBooks />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
