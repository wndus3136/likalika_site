import './App.css';
import data from './pages/ProductData'
import About from './pages/About';
import Detail from './pages/Detail';
import Cart from './pages/Cart';


import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from './pages/store';

function App() {

  const navigate = useNavigate()
  const [bests] = useState(data)
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => {navigate('/')}} >likalika</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about/info')}}>Infomation</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <Container>
            <img src={process.env.PUBLIC_URL + '/lika_img/banner_3.jpg'} alt="img" className='main_visual'/>
            <div className='event_content'>
              <img src={process.env.PUBLIC_URL + '/lika_img/event_1.jpg'} alt='event'/>
              <img src={process.env.PUBLIC_URL + '/lika_img/event_2.jpg'} alt='event'/>
            </div>
            <h2>Best 상품</h2>
           
            <Row>
              {
                bests.map((best, index) => {
                  return (
                    <Col key={index}> 
                     <Link to={`detail/${index}`}>
                     <img src={best.image} alt="product_img"/>
                      <h4>{best.title}</h4>
                      <p className='price1'>{best.desc}</p>
                      <p className='price2'>{best.price}</p>
                      </Link>
                      <button onClick={() => {
                        dispatch(addItem({id: best.id, title: best.title, count:1}))
                      }}>장바구니</button> 
                    </Col>
                  )
                })
              }
            </Row>
            </Container>
        }/> 


<Route path='/' element={<div>Home Page</div>} />
        <Route path='about' element={<About />}>
          <Route path='info' element={<div>Infomation</div>} />
          <Route path='loca' element={<div>Location</div>} />
        </Route>
        <Route path="detail/:id" element={<Detail bests={bests}/>}/>
        {/* detail/:id 이거는 프롭스를 디테일 페이지 수만큼 만든거야. */}
        <Route path="cart" element={<Cart/>}/>

      </Routes>
    </div>
  );
}
export default App;
