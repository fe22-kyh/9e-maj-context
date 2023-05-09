import { useEffect, useState, useContext } from "react";
import CharacterComponent from "./CharacterComponent";
import { LanguageContext, ThemeContext } from "./AccessibilityContext";
import { languages } from "./data/translation";
import { SearchCheckComponent } from "./SearchCheckComponent";

function useQuerySwapi(path, filters) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined); //samma som null

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      let data;
      if(filters.length === 0) {
        data = await fetch(`https://swapi.dev/api/people/?search=${path}`).then(resp => resp.json());
      } else {
        const promises = filters.map(filter => 
          fetch(`https://swapi.dev/api/${filter}/?search=${path}`).then(resp => resp.json())
        );
        const result = await Promise.all(promises);

        data = {count: 0, results: []};

        result.forEach((item, index) => {
          console.log(filters[index]);
          data.count = item.count;

          let items = item.results.map(entry => ({...entry, category: filters[index]}))
          data.results.push(...items);
        });

        console.log(data);
      }

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

  }, [path, filters]);

  return {isLoading, error, data};
}

function SearchPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState([]);
  const {isLoading, error, data} = useQuerySwapi(query, filters);
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  const randomPrefix = Math.floor(Math.random() * 900) + 100;

  let characterComponents = data?.map(character => 
    <CharacterComponent data={character} key={crypto.randomUUID()} />
  );

  let resultComponents = data?.map(result => {
    if(result.category === "people") {
      return <CharacterComponent data={result} key={crypto.randomUUID()} />
    } else {
      return <p>Not defined yet"</p>
    }
    // Här behövs det fler komponenter
  });

  const handleFilterChange = (filterName) => {
    if(filters.includes(filterName)) {
      setFilters(filters.filter(filter => filter !== filterName));
    } else {
      setFilters([...filters, filterName]);
    }
  };

  return (
    <section className={theme.value}>
      <button onClick={() => theme.toggle()}>Change theme</button>
      <select onChange={e => language.update(e.target.value)} >
        { languages.map(lang => (<option value={lang}>{lang}</option>)) }
      </select>
      <h2>Amazing website</h2>
      <p>Query: #{randomPrefix}-{query}</p>

      <SearchCheckComponent label="Character" value="people" onChange={() => handleFilterChange("people")}/>
      <SearchCheckComponent label="Film" value="films" onChange={() => handleFilterChange("films")} />
      <SearchCheckComponent label="Planet" value="planets" onChange={() => handleFilterChange("planets")} />
      <SearchCheckComponent label="Specie" value="species" onChange={() => handleFilterChange("species")} />
      <SearchCheckComponent label="Starship" value="starships" onChange={() => handleFilterChange("starships")} />
      <SearchCheckComponent label="Vehicle" value="vehicles" onChange={() => handleFilterChange("vehicles")} />

      <input type="text" value={query} onChange={event => setQuery(event.target.value)} />

      { 
        (isLoading && <p>Loading...</p>) || characterComponents
      }
    </section>
  );
}

export default SearchPage;
