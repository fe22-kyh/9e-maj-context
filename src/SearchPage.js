import { useEffect, useState, useContext } from "react";
import CharacterComponent from "./CharacterComponent";
import { ThemeContext } from "./ThemeContext";

function useQuerySwapi(path) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined); //samma som null

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await fetch(`https://swapi.dev/api/people/?search=${path}`).then(resp => resp.json());

      if(data.count > 0) {
        setData(data.results);
      }

      setIsLoading(false);
      setError(false);
    }

    const resultTimeoutId = setTimeout(fetchData, 2000);

    return () => { 
      clearTimeout(resultTimeoutId);
    }

  }, [path]);

  return {isLoading, error, data};
}

function SearchPage() {
  const [query, setQuery] = useState('');
  const {isLoading, error, data} = useQuerySwapi(query);
  const theme = useContext(ThemeContext);

  const randomPrefix = Math.floor(Math.random() * 900) + 100;

  let characterComponents = data?.map(character => 
    <CharacterComponent data={character} key={crypto.randomUUID()} />
  );

  return (
    <section className={theme.value}>
      <button onClick={() => theme.toggle()}>Change theme</button>
      <h2>Amazing website</h2>
      <p>Query: #{randomPrefix}-{query}</p>
      <input type="text" value={query} onChange={event => setQuery(event.target.value)} />

      { 
        (isLoading && <p>Loading...</p>) || characterComponents
      }
    </section>
  );
}

export default SearchPage;
