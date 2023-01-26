import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeTitle, getData } from "./redux/action";

import { Button, Spinner } from "react-bootstrap";

function App() {
  const [Sort, setSort] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.coins);
  const search = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Spinner animation="grow" variant="danger" />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          <input
            type="text"
            onChange={(e) =>
              dispatch({ type: "search", payload: e.target.value })
            }
          />
          <select onChange={(e) => setSort(e.target.value)}>
            <option>market Cap</option>
            <option>highest</option>
            <option>lowest</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
          <div>
            <div
              style={{
                color: "lightblue",
                width: "80%",
                display: "grid",
                gridTemplateColumns: "repeat(5,18%)",
                justifyContent: "space-evenly",
                alignItems: "center",
                justifyItems: "center",
                textAlign: "center",
                borderBottom: "2px solid black",
                paddingBottom: "20px",
                margin: "20px auto",

                fontSize: "1.7rem",
              }}
            >
              <p>image</p>
              <p>symbol</p>
              <p>name</p>
              <p>price</p>
              <p>market cap</p>
            </div>
            {data
              .sort((x, y) => {
                switch (Sort) {
                  case "market Cap":
                    return y.market_cap - x.market_cap;
                  case "highest":
                    return y.current_price - x.current_price;
                  case "lowest":
                    return x.current_price - y.current_price;
                  case "A-Z":
                    return x.name.localeCompare(y.name);
                  case "Z-A":
                    return y.name.localeCompare(x.name);

                  default:
                    return y.market_cap - x.market_cap;
                }
              })
              .filter(
                (item) =>
                  item.name
                    .toLowerCase()
                    .includes(search.trim().toLowerCase()) ||
                  item.symbol
                    .toLowerCase()
                    .includes(search.trim().toLowerCase())
                //{
                // if (!search) {
                //   return true;
                // } else if (
                //   item.name.toLowerCase().includes(search.toLowerCase()) ||
                //   item.symbol.toLowerCase().includes(search.toLowerCase())
                // ) {
                //   return true;
                // }
                //}
              )
              .map((item) => (
                <div
                  style={{
                    width: "80%",
                    display: "grid",
                    gridTemplateColumns: "repeat(5,18%)",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    justifyItems: "center",
                    textAlign: "center",
                    borderBottom: "2px solid black",
                    paddingBottom: "20px",
                    margin: "0 auto",
                    marginBottom: "20px",
                    fontSize: "1.4rem",
                  }}
                  key={item.id}
                >
                  <img
                    src={item.image}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <p>{item.symbol}</p>
                  <p>{item.name}</p>
                  <p>{item.current_price}</p>
                  <p>{item.market_cap}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
