import React from "react";
import BookList from "./Components/Booklist";

const App = () => {
  return (
    <div className="App">
      <h1> React-Book-Inventory</h1>
      {<BookList /> /* Add the required components here */}
    </div>
  );
};

export default App;
