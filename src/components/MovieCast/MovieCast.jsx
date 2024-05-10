import { useEffect, useState } from "react";
import { getMovieCredits } from "../../movies-api";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function getCreditsById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCreditsById();
  }, [movieId]);

  const defaultImg =
    "https://unsplash.com/photos/selective-focus-photography-of-orange-and-white-cat-on-brown-table-75715CVEJhI";

  return (
    <div className={css.wrap}>
      {cast.length > 0 ? (
        <ul>
          {cast.map((item) => {
            return (
              <li key={item.id}>
                <img
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                      : defaultImg
                  }
                  alt={item.original_name}
                  width={200}
                />

                <p>{item.original_name}</p>
                {item.character && <p>Character: {item.character}</p>}
                <hr />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don`t have cast for this movie.</p>
      )}
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};
export default MovieCast;