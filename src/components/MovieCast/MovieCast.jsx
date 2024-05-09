import { useEffect, useState } from "react";
import { getMovieCredits } from "../../movies-api";
import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

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
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.britannica.com%2Fanimal%2Fcat&psig=AOvVaw267Nu1BO5beclweAMrulGs&ust=1715342885410000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjwmK3EgIYDFQAAAAAdAAAAABAE";

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