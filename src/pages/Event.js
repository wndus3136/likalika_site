import './Event.css'
import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Event() {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/');
  };
  
  return (
    <div>
      <Container className='event-page'>
        <div className='road'>
          <span onClick={goToHome}><FontAwesomeIcon  icon={faHome} />&nbsp; &gt; &nbsp;</span> <span> Event &nbsp; &gt;  </span><span className='kr'>&nbsp;회원특가</span>
        </div>
        <h4 className='kr'>회원특가</h4>
        <div className='event-img'>
         <img></img>
        </div>
      </Container>
    </div>
  );
}