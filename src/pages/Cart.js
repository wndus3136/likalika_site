import './Cart.css';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { changeName, changeYear, addCount, subCount, deleteItem } from './store';
import { Container } from 'react-bootstrap';

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState('무료');
  const navigate = useNavigate();
  const [orderPopVisible, setOrderPopVisible] = useState(false);

  const goToHome = () => {
    navigate('/');
  };

  const openOrderPop = () => {
    setOrderPopVisible(true);
  }

  const closeOrderPop = () => {
    setOrderPopVisible(false);
  };

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      state.cart.forEach((item) => {
        const count = parseInt(item.count);
        const price = parseFloat(item.price.replace(',', ''));
        total += count * price;
      });
      setTotalPrice(total);

      if (total < 50000) {
        setShippingCost('3,000원');
      } else {
        setShippingCost('무료');
      }
    };

    calculateTotalPrice();
  }, [state.cart]);

  return (
    <div className='cart_page'>
      <Container>
        <h5>장바구니</h5>
        {state.cart.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>이미지</th>
                <th>상품정보</th>
                <th>수량</th>
                <th>판매가</th>
                <th>할인가</th>
                <th>배송구분</th>
                <th>배송비</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {state.cart.map((item, i) => {
                const count = parseInt(item.count);
                const price = parseFloat(item.price.replace(',', ''));
                const price1 = parseFloat(item.desc.replace(',', ''));

                const total = (count * price).toLocaleString() + '원';
                const total1 = (count * price1).toLocaleString() + '원';

                return (
                  <tr key={i}>
                    <td>
                      <img src={state.cart[i].banner} alt="Product" style={{ width: '80px' }} />
                    </td>
                    <td className='bold'>{state.cart[i].title}</td>
                    <td className='count_button'>
                      <p>{state.cart[i].count}</p>
                      <div>
                        <div onClick={() => dispatch(addCount(state.cart[i].id))}>
                          <FontAwesomeIcon icon={faCaretUp} />
                        </div>
                        <div onClick={() => dispatch(subCount(state.cart[i].id))}>
                          <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                      </div>
                    </td>
                    <td className='desc'>{total1}</td>
                    <td className='total' style={{ color: '#E05615', fontWeight: 'bold' }}>{total}</td>
                    <td>기본배송</td>
                    <td className='bold'>{shippingCost}</td>
                    <td>
                      <button onClick={() => dispatch(deleteItem(state.cart[i].id))}>삭제</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        ) : (
          <p className='kr'>장바구니가 비어 있습니다.</p>
        )}
        {state.cart.length > 0 && (
          <div className='total_box'>
            <h5>Total</h5>
            <p>50,000원 이상 구매 시 배송비 무료</p>
            <div>
              <p className='bold' style={{ fontSize: '15px', color: '#000' }}>결제예정금액</p>
              <p className='total_p'>총 금액 : </p> <span>{totalPrice.toLocaleString()}원</span>
              <p className='shipping-cost'>배송비 : </p><span>{shippingCost}</span>
              <p className='total_price' style={{ color: '#E05615', fontWeight: 'bold', fontSize: '15px' }}>
                = {(totalPrice + (shippingCost === '무료' ? 0 : 3000)).toLocaleString()}원
              </p>
            </div>
            <button className='order kr' onClick={openOrderPop}>주문하기</button>
          </div>
        )}
      </Container>
      {orderPopVisible && (
        <div className='order_pop' onClick={closeOrderPop}>
          <div className='order_pop_top'>
            <p className='kr'>주문완료</p>
            <div className='order_pop_close kr'>×</div>
          </div>
          <div className='order_pop_middle'>
            <p>구매해주셔서 감사합니다.</p>
            <p className='kr'>주문이 정상적으로 완료되었습니다.</p>
          </div>
          <div className='order_pop_bottom'>
            <button className='home_bt order_bt kr' onClick={goToHome}>홈으로 이동</button>
            <button className='mypage_bt order_bt kr' onClick={() => navigate('/mypage')}>마이페이지</button>
          </div>
        </div>
      )}
    </div>
  );
}