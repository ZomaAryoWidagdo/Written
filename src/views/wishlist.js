import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [doDelete, setDoDelete] = useState(false);

  // eslint-disable-next-line
  const fetch = async () => {
    const res = await axios.get("https://test-trevelio.herokuapp.com/");
    setWishlist(res.data);
  };

  useEffect(() => {
    fetch();
    setDoDelete(false);
    // eslint-disable-next-line
  }, [doDelete]);

  const del = async (id) => {
    await axios.delete(`https://test-trevelio.herokuapp.com/${id}`);
    setDoDelete(true);
  };

  return (
    <>
      <div className="columns mt-1">
        <div className="column is-half is-offset-one-quarter mt-1">
          <h1 className="has-text-centered">Your Wishlist</h1>
        </div>
      </div>
      <div className="columns m-5 is-multiline is-centered ">
        {wishlist?.length
          ? wishlist?.map((e, i) => {
              return (
                <>
                  <div className="card column is-5 m-1" key={e.id}>
                    <div className="card-content ">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image">
                            <img src={e?.preview} alt="" />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">{e?.title}</p>
                          <p className="subtitle is-6">By : {e?.author}</p>
                          <Rating initialValue={e.rating} readonly />
                          <button className="button" onClick={() => del(e._id)}>
                            Remove from Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          : null}
      </div>
    </>
  );
}
