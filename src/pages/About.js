import './About.css'
import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/');
  };
  
  return (
    <div>
      <Container className='about-page'>
        <div className='road'>
          <span onClick={goToHome}><FontAwesomeIcon  icon={faHome} />&nbsp; &gt; &nbsp;</span> <span> About &nbsp; &gt;  </span><span className='kr'>&nbsp;브랜드 소개</span>
        </div>
        <h4 className='kr'>브랜드 소개</h4>
        <div className='about-img'>
         <img></img>
        </div>
      </Container>
    </div>
  );
}