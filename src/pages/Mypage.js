import './Mypage.css'
import React from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeRating,changeYear } from './store';

export const Mypage = () => {

  const state = useSelector((state) => state)
  const dispatch = useDispatch()




  return (
    <div className='mypage_page'>
      <Container>
        <h5>마이페이지</h5>
        <div className='rating'>
          <div className='rating_customer'>
             <div className='rating_img'>
               <img src='/lika_img/likalika.png'/>
             </div>
            <div className='rating_text'>
              <p className='kr'>반가워요, <span className='user_name'>{state.user.name}</span>님</p>
              <p className='user_rating kr' onClick={() => dispatch(changeRating())}><span >{state.user.button}</span></p>
            </div>
          </div>
          <div className='rating_right'>
              <div className='coupon'>
                <p>쿠폰</p>
                <p><span>0</span>장</p>
              </div>
              <div className='accumulated'>
                <p>적립금</p>
                <p><span>0</span>원</p>
              </div>
          </div>
        </div>
        <div className='mypage_order'>
          <h5>Order</h5>
          <ul className='order_summ'>
            <li>
               <h5>1</h5>
               <p>입금전</p>
            </li>
            <li>
               <h5>0</h5>
               <p>배송준비중</p>
            </li>
            <li>
               <h5>0</h5>
               <p>배송중</p>
            </li>
            <li>
               <h5>0</h5>
               <p>배송완료</p>
            </li>
            <li>
              <p>취소 <span>0</span></p>
              <p>교환 <span>0</span></p>
              <p>반품 <span>0</span></p>
            </li>
          </ul>
        </div>
       
      </Container>
    </div>
    
  )
}
export default Mypage;
