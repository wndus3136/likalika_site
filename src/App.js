import './App.css';
import data from './pages/ProductData';
import About from './pages/About';
import Detail from './pages/Detail';
import InfoDetail from './pages/InfoDetail';
import Product from './pages/Product';
import Event from './pages/Event';
import Information from './pages/Information';
import infodata from './pages/Information_data';
import Cart from './pages/Cart';
import Mypage from './pages/Mypage';
import Search from './pages/Search';
import Footer from './pages/Footer';
import TopButton from './pages/TopButton';
import {addItem} from './pages/store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';



function App() {

  const navigate = useNavigate()
  const [bests] = useState(data);
  const [info] = useState(infodata);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);  /* 추가 */
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(state => state.cart.length); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchmain, setSearchMain] = useState(''); //검색
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  /* 예시 */
  const [searchTerm, setSearchTerm] = useState('');

 const handleSearch = () => {
  if (searchTerm.trim() !== '') {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  }
};

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
  
    if (keyword.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

   /* ****************************************** */

  const handleFilterChange = (keyword) => {
    console.log('Filtering with keyword:', keyword);
  };

  const handleSearchButtonClick  = () => {
    setIsSearchOpen(true);
  };

///////////////////////////////////////////////////////

  const handleMenuHover = () => {
    setIsMenuOpen(true);
    changeMenuHeight(370);
  };

  const handleMenuLeave = () => {
    setIsMenuOpen(false);
    changeMenuHeight(100);
  };

  const changeMenuHeight = (height) => {
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.style.height = height + 'px';
    }
  };

const handleHover = () => {
  const menu = document.querySelector('.menu');
  if(menu) {
    menu.style.backgroundColor = '#fff';
  }
};

const menu = document.querySelector('.menu');
if(menu) {
  menu.addEventListener('mouseenter', handleHover);
}


const handleCategorySelect = (category) => {
  setSelectedCategory(category);
};


const handleCloseButtonClick = () => {
  setIsSearchOpen(false);
};


  return (
    <div className="App">
      <Navbar className='menu'>
        <Container className='navbar-menu'>
          <Navbar.Brand className='logo' onClick={() => { navigate('/') }} ></Navbar.Brand>
          <ul className={`me-auto ${isMenuOpen ? 'open' : ''}`} onMouseEnter={handleMenuHover} onMouseLeave={handleMenuLeave}>
            <li className='menu-title' onClick={() => { navigate('/about') }}>About
              <ul className='menu-inner'>
                <li onClick={() => { navigate('/about') }}>브랜드 소개</li>
                <li onClick={() => { navigate('/about') }}>브랜드 소식</li>
                <li onClick={() => { navigate('/about') }}>입점처 안내</li>
              </ul>
            </li>
            <li className='menu-title' onClick={() => { navigate('/product') }}>Product
              <ul className='menu-inner'>
                <li className={selectedCategory === 'All' ? 'selected' : ''} onClick={() => handleCategorySelect('All')}>All</li>
                <li className={selectedCategory === '패션' ? 'selected' : ''} onClick={() => handleCategorySelect('패션')}>패션</li>
                <li className={selectedCategory === '리빙' ? 'selected' : ''} onClick={() => handleCategorySelect('리빙')}>리빙</li>
                <li className={selectedCategory === '산책' ? 'selected' : ''} onClick={() => handleCategorySelect('산책')}>산책</li>
                <li className={selectedCategory === '토이' ? 'selected' : ''} onClick={() => handleCategorySelect('토이')}>토이</li>
                <li className={selectedCategory === '오늘의 특가' ? 'selected' : ''} onClick={() => handleCategorySelect('오늘의 특가')}>오늘의 특가</li>
              </ul>
            </li>
            <li className='menu-title' onClick={() => { navigate('/Event') }}>Event
              <ul className='menu-inner'>
                <li onClick={() => { navigate('/Event') }}>이벤트</li>
                <li onClick={() => { navigate('/Event') }}>회원특가</li>
              </ul>
            </li>
            <li className='menu-title' onClick={() => { navigate('/Information') }}>Information
              <ul className='menu-inner'>
                <li onClick={() => { navigate('/Information') }}>공지사항</li>
                <li onClick={() => { navigate('/Information') }}>고객센터</li>
                <li onClick={() => { navigate('/Information') }}>자주 묻는 질문</li>
                <li onClick={() => { navigate('/Information') }}>제품 후기</li>
              </ul>
            </li>
          </ul>

          <Nav className='lnb'>
            <Nav.Link className='cart' onClick={() => { navigate('/cart') }}>
              <FontAwesomeIcon icon={faShoppingBag} />
              {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>} {/* 장바구니 갯수 표시 */}
            </Nav.Link>
            <Nav.Link className='mypage' onClick={() => { navigate('/mypage')}}>
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
            <Nav.Link className='search_btn' onClick={handleSearchButtonClick}>
              <FontAwesomeIcon icon={faSearch} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {isSearchOpen && (
        <>
          <div className='search_outbox' onClick={handleCloseButtonClick}></div>
          <div className='search_box'>
            <div className='search_close_btn' onClick={handleCloseButtonClick}>×</div>
            <h5 className='en'>Search</h5>

            <form className='filter-content' onSubmit={(e) => {e.preventDefault(); handleSearch(); }}>
              <input
                  autoFocus
                  className="search-main kr_light"
                  type="text"
                  placeholder="검색어를 입력해주세요."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  keyPress={handleKeyPress}
                />
              <button className="search-button" type="submit"  onClick={handleSearch} >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            <div className='search_keyword'>
              <h5 className='kr'>인기검색어</h5>
              <p className='en'>#&nbsp;
                <span className='kr_light' onClick={() => handleKeywordClick('이동가방')}>이동가방</span>
              </p>
              <p className='en'>#&nbsp;
                <span className='kr_light' onClick={() => handleKeywordClick('카시트')}>카시트</span>
              </p>
              <p className='en'>#&nbsp;
                <span className='kr_light' onClick={() => handleKeywordClick('산책')}>산책</span>
              </p>
              <p className='en'>#&nbsp;
                <span className='kr_light' onClick={() => handleKeywordClick('장난감')}>장난감</span>
              </p>
            </div>
          </div>
        </>
      )}
      <Routes>
        <Route path='/' element={
          <div className='main'>
            <img src={process.env.PUBLIC_URL + '/lika_img/banner_3.jpg'} alt="img" className='main_visual'/>
            
            <div className='main-container'>
              <div className='event_content'>
                <img src={process.env.PUBLIC_URL + '/lika_img/event_1.jpg'} alt='event'/>
                <img src={process.env.PUBLIC_URL + '/lika_img/event_2.jpg'} alt='event'/>
              </div>
              <strong>베스트</strong>
              <p></p>
           
              <Row>
                {bests.map((best) => (
                  <Col key={best.id}>
                    <Link to={`detail/${best.id}`}>
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
            </div>
          </div>
          
        }/> 
        

        <Route path='/' element={<div>Home Page</div>} />
        <Route path='about' element={<About />}/>
        <Route path='/information' element={<Information info={info}/>} />
        <Route path='/infodetail/:id' element={<InfoDetail info={info} />} />
        <Route path='/product' element={<Product bests={bests} selectedCategory={selectedCategory} handleCategorySelect={handleCategorySelect} searchmain={searchmain} />} />
        <Route path="/mypage" element={<Mypage/>}/>
        <Route path="/search" element={<Search bests={bests} searchTerm={searchTerm} searchmain={searchKeyword} onSearchInputChange={handleSearchInputChange} />} />
        <Route path="event" element={<Event/>}/>
        <Route path="detail/:id" element={<Detail bests={bests} component={Detail}/>}/>
        {/* detail/:id 이거는 프롭스를 디테일 페이지 수만큼 만든거 */}
        <Route path="cart" element={<Cart/>}/>
        <Route path="mypage" element={<Mypage/>}/>

      </Routes>
      <TopButton />
      <div className='kakao'/>
      <Footer/>
    </div>
  );
}
export default App;