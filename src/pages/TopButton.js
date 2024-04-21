import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './TopButton.css'; // TopButton 스타일 파일

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 페이지 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.pageYOffset > 300) { 
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거 (정리(clean-up))
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 빈 배열을 전달하여 마운트 및 언마운트 시에만 실행되도록 설정

  // Top 버튼을 클릭할 때 페이지 상단으로 스크롤하는 이벤트 핸들러
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 적용
    });
  };

  return (
    <div className={`top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <FontAwesomeIcon className='top' icon={faArrowUp} /> {/* 프리픽스를 'far'로 설정 */}
    </div>
  );
};

export default TopButton;