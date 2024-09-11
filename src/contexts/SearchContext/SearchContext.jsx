import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { searchTypeByName } from "../../api/swapi";
import reducer, { initialState, actionTypes } from "./SearchReducer";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [{ error, count, results, hasNext, hasPrev, loading, page, searchTerm, type }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const dispatchError = useCallback((payload) => dispatch({ type: actionTypes.ERROR_API, payload }), []);
  const dispatchLoading = useCallback(() => dispatch({ type: actionTypes.LOADING }), []);
  const dispatchSearchComplete = useCallback((payload) => dispatch({ type: actionTypes.SEARCH_COMPLETE, payload }), []);
  const dispatchSetSearchData = useCallback((payload) => dispatch({ type: actionTypes.INITIATE_SEARCH, payload }), []);
  const dispatchUpdateSearchTerm = useCallback((payload) => dispatch({ type: actionTypes.UPDATE_TERM, payload }), []);
  const dispatchUpdateType = useCallback((payload) => dispatch({ type: actionTypes.UPDATE_TYPE, payload }), []);

  const dispatchFetch = useCallback(
    async function (type, searchTerm, page) {
      dispatchLoading();
      const response = await searchTypeByName(type, searchTerm, page);
      if (!response.success) return dispatchError(response.error);

      const { count, next, previous, results } = response.data;
      const hasNext = next !== null;
      const hasPrev = previous !== null;

      dispatchSearchComplete({ count, hasNext, hasPrev, results, page });
    },
    [dispatchError, dispatchLoading, dispatchSearchComplete],
  );

  const dispatchSearch = useCallback(
    async function (type, searchTerm) {
      dispatchSetSearchData({ type, searchTerm });
      if (searchTerm) {
        dispatchFetch(type, searchTerm, 1);
      }
    },
    [dispatchFetch, dispatchSetSearchData],
  );

  const dispatchNextPage = useCallback(
    async function () {
      if (hasNext) {
        await dispatchFetch(type, searchTerm, page + 1);
      }
    },
    [hasNext, dispatchFetch, type, searchTerm, page],
  );

  const dispatchPrevPage = useCallback(
    async function () {
      if (hasPrev) {
        await dispatchFetch(type, searchTerm, page - 1);
      }
    },
    [hasPrev, dispatchFetch, type, searchTerm, page],
  );

  const value = useMemo(
    () => ({
      error,
      count,
      results,
      hasNext,
      hasPrev,
      loading,
      search: dispatchSearch,
      nextPage: dispatchNextPage,
      prevPage: dispatchPrevPage,
      searchTerm,
      type,
      updateTerm: dispatchUpdateSearchTerm,
      updateType: dispatchUpdateType,
    }),
    [
      error,
      count,
      results,
      hasNext,
      hasPrev,
      loading,
      dispatchSearch,
      dispatchNextPage,
      dispatchPrevPage,
      searchTerm,
      type,
      dispatchUpdateSearchTerm,
      dispatchUpdateType,
    ],
  );
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

function useSearch() {
  const searchContext = useContext(SearchContext);
  if (!searchContext) throw new Error("auth context was accesed outside the scope of SearchContext.Provider");
  return searchContext;
}

export { SearchProvider, useSearch };
