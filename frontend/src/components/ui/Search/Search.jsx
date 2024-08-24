import './search.css';
import { RiSearchLine } from '@remixicon/react';

const Search = () => {
  return (
    <form className='search-form'>
      <div className='form-inner'>
        <input type='text' placeholder='Search your product...' />
        <button className='search-btn'>
          <RiSearchLine size={20} color='#ffff' className='ri-search' />
        </button>
      </div>
    </form>
  );
};

export default Search;
