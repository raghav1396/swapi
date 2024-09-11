import { useSearch } from "../../contexts/SearchContext/SearchContext";
import styles from "./ResultList.module.css"

function ResultList() {
  const { results, hasNext, hasPrev, nextPage, prevPage, count } = useSearch();
  return (
    <div className={styles.container}>
      <div className={styles.count}>Total count: {count}</div>
      <ul>

      {results.map(res=><li key={res.url}>{res.name ?? res.title}</li>)}
      </ul>

      <div className={styles.btns}>

        {hasPrev && <button onClick={prevPage} disabled={!hasPrev}>
          go to Prev Page
        </button>}
        {hasNext && <button onClick={nextPage} disabled={!hasNext}>
          go to Next Page
        </button>}
      </div>
    </div>
  );
}

export default ResultList;
