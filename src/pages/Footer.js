import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons'; // 일반 아이콘 패키지


function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-content" style={{ marginTop: '50px', marginBottom: '50px' }}>
        <nav>
          <ul className='footer-link'>
            <li><a href='#/'>HOME</a></li>
            <li><a href='#/'>COMPANY</a></li>
            <li><a href='#/'>AGREEMENT</a></li>
            <li><a href='#/'>PRIVACY POLICY</a></li>
            <li><a href='#/'>GUIDE</a></li>
          </ul>
          <ul className='company-info'>
            <li>주식회사 오브젝티보 &emsp; 대표자 황희연 &emsp; 663-81-01473 </li>
            <li>통신판매업신고 2020-서울성동-00182[사업자정보확인] &emsp; 주소 04790 서울시 성동구 성숭리로 77 서울숲IT밸리 1702호 </li>
            <li>개인정보보호책임자 황희연(hello@objectivo.kr) &emsp; 고객센터 02-2281-0831 / 카카오톡 @리카리카</li>
            <li>운영시간 월-금 10 - 17 / 점심시간 12 - 13 &emsp; 입금계좌 우리은행 1005-604-256660</li>
          </ul>
        </nav>
        <ul className='social-icons'>
          <li>
          <a href="https://www.instagram.com/likalika.life/" target="_blank">
             <FontAwesomeIcon icon={faInstagramSquare} size='lg' />
          </a>
          </li>
          <li>
            <a>
              <FontAwesomeIcon icon={faComment} />
            </a>
          </li>
        </ul>
        <p>&copy; <strong>Likalika</strong>. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;