import React,{useState} from 'react';
import { useSearch } from "../../context/search.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [isFocused,setIsFocused]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-3">
      <form className="d-flex align-items-center" role="search" onSubmit={handleSubmit} style={{ width: 'auto' }}>
        <input
          className="form-control me-2 rounded-pill shadow-sm"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            border: isFocused ? '3px solid rgb(97, 186, 245)' : '1px solid #ccc',
            padding: '5px 10px',
            borderRadius: '10px', // Rounded corners
            fontSize: '16px',
            width: '350px', // Consistent width
            height: '30px', // Matching height with the button
          }}
        />
        <button
          className="btn btn-primary ms-2 rounded-pill px-4"
          type="submit"
          style={{
            backgroundColor: '#3498db', // Attractive blue color
            border: 'none',
            height: '30px', // Match button height with input field
            padding: '0 20px', // Adjust padding
            borderRadius: '30px',
            transition: 'background-color 0.3s ease',
          }}
        > Search
          <i className="bi bi-search"></i> {/* Bootstrap icon for search */}
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
