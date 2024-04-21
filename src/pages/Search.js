import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addItem } from './store';
import './Search.css';

const Search = ({ bests }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBests, setFilteredBests] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query !== null) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, [location.search]);

  const handleSearch = (term) => {
    const normalizedSearchTerm = term.trim().toLowerCase();
    if (normalizedSearchTerm === '') {
      setFilteredBests([]);
    } else {
      const filtered = bests.filter((product) =>
        product.title.toLowerCase().includes(normalizedSearchTerm)
      );
      setFilteredBests(filtered);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchTerm);
    }
  };

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
    handleSearch(keyword);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredBests.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBests.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className='search_page container'>
      <div className='road'>
        <span onClick={goToHome}><FontAwesomeIcon icon={faHome} />&nbsp; &gt; &nbsp;</span>
        <span>상품검색</span>
      </div>
      <h5>Search</h5>
      <div className='filter-content_box'>
        <form className='filter-content' onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }}>
          <input
            className="search-txt kr_light"
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div className='search_keyword'>
          <h5 className='kr'>인기검색어</h5>
          <p>
            <span className='kr_light' onClick={() => handleKeywordClick('이동가방')}>이동가방</span>
          </p>
          <p>
            <span className='kr_light' onClick={() => handleKeywordClick('카시트')}>카시트</span>
          </p>
          <p>
            <span className='kr_light' onClick={() => handleKeywordClick('산책')}>산책</span>
          </p>
          <p>
            <span className='kr_light' onClick={() => handleKeywordClick('장난감')}>장난감</span>
          </p>
        </div>
      </div>

      <p className='result_txt kr_light'>총 <span>{filteredBests.length}</span>개의 상품이 검색되었습니다.</p>

      {filteredBests.length > 0 ? (
        <>
          <Row>
            {currentProducts.map((best) => (
              <Col key={best.id}>
                <Link to={`/detail/${best.id}`}>
                  <img src={best.image} alt="product_img" />
                  <h4>{best.title}</h4>
                  <p className='kr_light desc'>{best.desc}</p>
                  <p className='price kr'>{best.price}</p>
                </Link>
                <button
                  onClick={() => {
                    dispatch(addItem({
                      id: best.id,
                      banner: best.banner,
                      title: best.title,
                      desc: best.desc,
                      price: best.price,
                      count: 1
                    }));
                  }}>
                  <FontAwesomeIcon icon={faShoppingBag} />
                </button>
              </Col>
            ))}
          </Row>
          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
            {pageNumbers.map(number => (
              <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>{number}</button>
            ))}
            <button onClick={() => setCurrentPage(currentPage === Math.ceil(filteredBests.length / productsPerPage) ? currentPage : currentPage + 1)} disabled={currentPage === Math.ceil(filteredBests.length / productsPerPage)}>{'>'}</button>
          </div>
        </>
      ) : (
        <p className='search_result'>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default Search;