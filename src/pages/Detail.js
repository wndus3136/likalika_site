import './Detail.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from './store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

export default function Detail(props) {
    const { bests } = props;
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    const [product, setProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState({
        size: null,
        color: null
    });

    useEffect(() => {
        // id에 해당하는 상품 정보를 가져와서 product state에 저장
        const product = bests.find(item => item.id === id);
        setProduct(product);
    }, [bests, id]);

    const handleOptionSelect = (type, value) => {
        setSelectedOption(prevState => ({
            ...prevState,
            [type]: value
        }));
    };

    const addToCart = () => {
        if (product) {
            dispatch(addItem({ 
                id: product.id, 
                banner: product.banner,
                title: product.title, 
                desc: product.desc, 
                price: product.price, 
                count: 1 
            }));
        }
    };

    if (!product) {
        return <div>상품 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className='detail_page'>
            <div className='tag'>
                <span onClick={goToHome}>
                    <FontAwesomeIcon icon={faHome} />
                    &nbsp; &gt; &nbsp;
                </span>
                <Link className='rute' to="/product">제품</Link>
            </div>

            <div className='detail_container'>
                <div className='detail_container_box'>
                    <div className='detail_left'>
                        <div className='banner_img'>
                            <img src={product.banner} alt=''/>
                        </div>
                        <div className='detail_img'>
                            {product.detail.map((imageUrl, imgId) => (
                                <img key={imgId} src={imageUrl} alt={`상세 이미지 ${imgId + 1}`} />
                            ))}
                        </div>
                    </div>

                    <div className='detail_right'>
                        <div className='detail_sticky'>
                            <div className='detail_sticky_top'>
                                <h4 className='kr'>{product.title}</h4>
                                <p className='kr_light'>{product.text}</p>
                                <p className='kr_light desc'>{product.desc}</p>
                                <p className='kr price'>{product.price}</p>
                            </div>
                            <div className='option option_size'>
                                <h5>사이즈</h5>
                                {product.option.size.map((size, sizeId) => (
                                    <span
                                        key={sizeId}
                                        className={selectedOption.size === size ? 'selected' : ''}
                                        onClick={() => handleOptionSelect('size', size)}
                                    >
                                        {size}
                                    </span>
                                ))}
                            </div>
                            <div className='option option_color'>
                                <h5>컬러</h5>
                                {product.option.color.map((color, colorId) => (
                                    <span
                                        key={colorId}
                                        className={`kr ${selectedOption.color === color ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect('color', color)}
                                    >
                                        {color}
                                    </span>
                                ))}
                            </div>

                            <div className='detail-button'>
                                <div className='kr'>찜하기</div> 
                                <div className='cart-button kr' onClick={addToCart}>장바구니</div>
                                <div className='kr'>구매하기</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}