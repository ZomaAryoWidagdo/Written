import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";

export default function SearchBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const fetch = async () => {
    if (!search) return setBooks("");
    setBooks([]);

    let res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${search}`
    );
    let uniqueBooks = [];

    // eslint-disable-next-line
    res?.data?.items?.map((e) => {
      if (!uniqueBooks.length) return uniqueBooks.push(e);

      for (let i = 0; i < uniqueBooks.length; i++) {
        if (uniqueBooks[i].id === e.id) {
          // eslint-disable-next-line
          return;
        }
      }
      return uniqueBooks.push(e);
    });
    setBooks(uniqueBooks);
    setSearch("");
    console.log(uniqueBooks);
  };
  useEffect(() => {
    // eslint-disable-next-line
  }, [books]);
  // eslint-disable-next-line

  const add = (e) => {
    axios.post("http://localhost:4002/add", {
      data: {
        title: e?.title,
        author: e?.authors[0],
        preview: e?.imageLinks?.thumbnail,
        rating: e?.averageRating,
      },
    });
  };
  return (
    <>
      <div className="columns mt-1">
        <div className="column is-half is-offset-one-quarter mt-1">
          <h1 className="has-text-centered">Book Finder Application</h1>
          <div>
            <div>
              <input
                className="input is-medium is-half"
                type="text"
                placeholder="Search Title here"
                value={search}
                onChange={(e) => {
                  setSearch(e?.target?.value);
                }}
              />
            </div>
            <button className="button is-medium mt-1" onClick={() => fetch()}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="columns m-5 is-multiline is-centered ">
        {books.length ? (
          books?.map((e) => {
            return (
              <>
                <div className="card column is-5 m-1 " key={e?.volumeInfo}>
                  <div className="card-content ">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image">
                          {e?.volumeInfo?.imageLinks?.thumbnail ? (
                            <img
                              src={e?.volumeInfo?.imageLinks?.thumbnail}
                              alt=""
                            />
                          ) : (
                            <h5 className="has-text-centered mt-6">No Image</h5>
                          )}
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">{e?.volumeInfo?.title}</p>
                        <p className="subtitle is-6">
                          By :{" "}
                          {e?.volumeInfo?.authors
                            ? e?.volumeInfo?.authors[0]
                            : "Nama Penulis Tidak Ditemukan"}
                        </p>
                        <p className="content">
                          {e?.volumeInfo?.averageRating ? (
                            <Rating
                              initialValue={e?.volumeInfo?.averageRating}
                              readonly
                            />
                          ) : (
                            <Rating initialValue={0} readonly />
                          )}
                        </p>
                        <button
                          className="button"
                          onClick={() => add(e?.volumeInfo)}
                        >
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <h1 className="has-text-centered">
            Silahkan Cari Buku Yang Tersedia
          </h1>
        )}
      </div>
    </>
  );
}
