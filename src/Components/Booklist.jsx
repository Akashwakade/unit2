import { useEffect, useState } from "react";
import Book from "./Book";

const BookList = () => {
  
  const[data,setData]=useState([])
  const[loading,setLoading]=useState(false)
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const[search,setSearch]=useState("")


  const getApiurl=(link)=>{
    return link
  }

  const fetchAndRenderData=async()=>{
   
    let url=getApiurl(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/books`)
    if(category!=="all"){
      url=`${url}?category=${category}`
    }
    
    if (sortBy,sortOrder) {
      url=`${url}?_sort=${sortBy}&_order=${sortOrder}`;
    }
    if(search){
      url=`${url}?q=${search}`
    }

    

    try {
      setLoading(true)
     const res=await fetch(url)
      const data=await res.json()
      setData(data)
     
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
   
    
  }

  useEffect(()=>{
     fetchAndRenderData()
  },[category,sortBy,sortOrder,search])


  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };


  return (
    <>
      <div className="filter-options">
        <label>
          Category:
          <select className="filter-by-category"
            value={category} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            <option value="Classic">Classic</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Romance">Romance</option>
            <option value="Coming of age">Coming of Age</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Political satire">Political Satire</option>
            <option value="Mystery">Mystery</option>
            <option value="Epic poem">Epic Poem</option>
          </select>
        </label>

        <label>
          Sort by:
          <select className="sort-by" 
          value={sortBy}  onChange={(e) => setSortBy(e.target.value)} >
            <option value="">Select an option</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="category">Category</option>
            <option value="publication_date">Publication Date</option>
          </select>
        </label>
        <label>
          Order:
          <select className="order" 
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Select an option</option>
            <option value="asc">Ascending Order</option>
            <option value="desc">Descending Order</option>
          </select>
        </label>
        <label>
          Search:
          <input value={search}
           onChange={(e)=>setSearch(e.target.value)} />
        </label>
      </div>
    
        <div className="book-list">
   
        {loading ? (
          <h1 className="loading-text">Loading...</h1>
        ) : (
          data.map((el) => <Book key={el.id} {...el} />)
        )}
        
       

    
     

      </div>
     
    </>
  );
};

export default BookList;
