
import SearchBar from '../SearchBar/SearchBar';
import Filters from '../Filters/Filters';
import React from 'react';
import style from './Home.module.css'


const Home = () => {

  return (
    <div className={style.servicesContainer}> 
      <header className={style.searchContainer}>
        <SearchBar/>
      </header>
      <aside className={style.FilterContainer}>
        <Filters/>
      </aside>
    </div>
  );
};

export default Home;