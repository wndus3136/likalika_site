import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import './Information.css';
/* import InfoDetail from './InfoDetail'; */ // InfoDetail import 추가
import infodata from './Information_data'; // infodata import 추가

export default function Information() {
    const [info] = useState(infodata);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <Container className='information-page'>
                <div className='road'>
                    <span onClick={goToHome}><FontAwesomeIcon icon={faHome} />&nbsp; &gt; &nbsp;</span> <span> Information &nbsp; &gt;  </span><span className='kr'>&nbsp;공지사항</span>
                </div>
                <h4 className='kr'>공지사항</h4>
                <Row>
                    {info.map((item, index) => (
                        <Col key={index}>
                            <Link to={`/infodetail/${item.id}`}>
                                <img src={item.banner} alt="info_img" />
                                <h4 className='kr'>{item.title}</h4>
                                {/* <p className='kr_light desc'>{item.text}</p> */}
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Outlet /> {/* 하위 라우트를 여기에 표시 */}
        </div>
    );
}