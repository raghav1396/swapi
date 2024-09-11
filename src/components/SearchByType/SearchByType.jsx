import { useCallback, useEffect } from "react";
import { useSearch } from "../../contexts/SearchContext/SearchContext";
import ResultList from "../ResultList/ResultList";
import styles from "./SearchByType.module.css";

function SearchByType() {
  const { error, loading, search, searchTerm, updateTerm, type, updateType } = useSearch();

  useEffect(
    function () {
      function performSearch() {
        search(type, searchTerm);
      }
      const timerId = setTimeout(performSearch, 700);
      return function () {
        clearTimeout(timerId);
      };
    },
    [searchTerm, search, type],
  );

  const handleSubmit = useCallback(
    function (e) {
      e.preventDefault();
      search(type, searchTerm);
    },
    [searchTerm, type, search],
  );
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <select value={type} onChange={(e) => updateType(e.target.value)}>
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="vehicles">Vehicles</option>
          <option value="species">Species</option>
          <option value="films">Films</option>
        </select>

        <input
          type="text"
          onChange={(e) => updateTerm(e.target.value)}
          value={searchTerm}
          placeholder="Enter text to search..."
          maxLength={50}
        />

        <button>submit</button>
      </form>
      {error && <div>An error occured!</div>}
      {loading && <div>Loading...</div>}

      {!error && <ResultList />}
    </div>
  );
}

export default SearchByType;
