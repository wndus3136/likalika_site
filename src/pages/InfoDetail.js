import React from 'react';
import { useParams } from 'react-router-dom';
import infodata from './Information_data';
import './infoDetail.css';

export default function InfoDetail() {
    const { id } = useParams();
    const data = infodata.find(item => item.id === id);

    if (!data) {
        return <div>Data not found</div>;
    }

    return (
        <div className='infoDetail'>
            <img src={data.banner} alt={data.title} />
            <h1 className='kr'>{data.title}</h1>
            <p className='kr_light'>{data.text}</p>
            <img src={data.detail} />
            {/* 이하 디테일 페이지에 필요한 정보들을 표시 */}
        </div>
    );
}