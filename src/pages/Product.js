import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addItem } from './store';
import './product.css';

const Product = ({ bests, selectedCategory, handleCategorySelect, searchKeyword }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(bests);
  const navigate = useNavigate();

  useEffect(() => {
    filterProducts();
  }, [bests, selectedCategory, searchKeyword]);

  const filterProducts = () => {
    let productsToDisplay = bests;

    if (selectedCategory !== 'All') {
      productsToDisplay = bests.filter(product => product.sort === selectedCategory);
    }
    
    setFilteredProducts(productsToDisplay);
    setCurrentPage(1);
  };

  const handleCategoryReset = () => {
    handleCategorySelect('All'); 
    setFilteredProducts(bests);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='product_page container'>
      <h5>Product</h5>
      <div className='product-sort'>
        <ul>
          <li className={selectedCategory === 'All' ? 'selected' : ''} onClick={() => handleCategorySelect('All')}>All</li>
          <li className={selectedCategory === '패션' ? 'selected' : ''} onClick={() => handleCategorySelect('패션')}>패션</li>
          <li className={selectedCategory === '리빙' ? 'selected' : ''} onClick={() => handleCategorySelect('리빙')}>리빙</li>
          <li className={selectedCategory === '산책' ? 'selected' : ''} onClick={() => handleCategorySelect('산책')}>산책</li>
          <li className={selectedCategory === '토이' ? 'selected' : ''} onClick={() => handleCategorySelect('토이')}>토이</li>
          <li className={selectedCategory === '오늘의 특가' ? 'selected' : ''} onClick={() => handleCategorySelect('오늘의 특가')}>오늘의 특가</li>
        </ul>
      </div>
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
                }))
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
        <button onClick={() => setCurrentPage(currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? currentPage : currentPage + 1)} disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}>{'>'}</button>
      </div>
    </div>
  );
};

export default Product;