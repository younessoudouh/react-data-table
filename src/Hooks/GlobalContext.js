import { createContext, useState } from "react";

export const globalContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    name: "sort-default",
    status: "sort-default",
  });

  return (
    <globalContext.Provider
      value={{
        searchValue,
        setSearchValue,
        currentPage,
        setCurrentPage,
        sort,
        setSort,
      }}
    >
      {children}{" "}
    </globalContext.Provider>
  );
};

export default ContextProvider;
