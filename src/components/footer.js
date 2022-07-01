import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <footer className="footer">
        <div className="content has-text-centered">
          <button
            className="button is-large is-half m-5"
            onClick={() => {
              navigate("/");
            }}
          >
            Search
          </button>
          <button
            className="button is-large is-half m-5"
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            Wishlist
          </button>
        </div>
      </footer>
    </>
  );
}
