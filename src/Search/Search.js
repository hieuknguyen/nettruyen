



import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Header from "../Header/Hearder";
import Item from '../Item/Item.js';

async function API(url) {
    console.log("Fetching from URL:", url); // Debug log
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

function Search() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const search = params.get("q") || "";
    const [data, setData] = useState("")
    const [featuredMangas, setFeaturedMangas] = useState([]);//state truyen
    
    useEffect(() => {
            const fetchData = async () => {
                try {
                    const now = new Date();
                    const data = await API(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(search)}`);
                    const items = data.data.items || data.data;
                    const mangas = items.map((item) => {
                        const date = new Date(item.updatedAt);
                        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                        let Days = "";
                        if (diffDays === 0) {
                            Days = "Hôm nay";
                        } else if (diffDays === 1) {
                            Days = "Hôm qua";
                        } else {
                            Days = `${diffDays} ngày trước`;
                        }
                        return {
                            id: item._id,
                            title: item.name,
                            chapter: `Chương ${item.chaptersLatest?.[0]?.chapter_name || 0}`,
                            views: `Cập nhập: ${Days}`,
                            image: `https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`,
                            chapter_api_data: `https://otruyenapi.com/v1/api/truyen-tranh/${item.slug}`,
                        };
                    });
                    setFeaturedMangas(mangas);
                    
                } catch (error) {
                    console.error(error);
                }
            };
            if(search !== ""){
                fetchData();
            }else{
                navigate("/")
            }
            
        }, [search]);
    console.log(featuredMangas)
    return (<div className="main-content">
            <Header />


            <div className="warning">
                <div className="container">
                    <div className="warning-content">
                        <div className="warning-icon">!</div>
                        <span>🔴 NETTRUYEN đang nâng cấp tính năng đọc truyện hàng ngày. Cảm ơn bạn đã LUÔN ủng hộ NETTRUYEN!</span>
                    </div>
                </div>
            </div>



            <div className="container">
                <h2 className="section-title">Kết quả tìm kiếm "{search}"</h2>
                <div className="row">
                    <div className="featured-grid">
                        {featuredMangas.map((manga, idx) => (
                            <Item key={`${manga.id || "manga"}-${idx}`} id={manga.id} image={manga.image} title={manga.title} chapter={manga.chapter} views={manga.views} chapter_api_data={manga.chapter_api_data}
                            />
                        ))}

                    </div>
                </div>

                {/* <div className="asdf">
                    <div className="two-column">
                        <h2 className="section-title fit-text">
                            NetTruyen Chính Thức - Mới cập nhật<span className="arrow">›<Link to="/truyen-moi" className="view-all">Xem tất cả</Link></span>
                        </h2>


                        <div className="new-manga-grid">
                            {newMangas.map((manga) => (
                                <Item key={manga.id} id={manga.id} image={manga.image} title={manga.title} chapter={manga.chapter} views={manga.views}
                                />
                            ))}

                        </div>

                    </div> */}
                    {/* <div className="rankings">
                        <div className="ranking-tabs">
                            <div className={`tab ${activeTab === 'month' ? 'active' : ''}`} onClick={() => setActiveTab('month')}> Top Tháng </div>
                            <div className={`tab ${activeTab === 'week' ? 'active' : ''}`} onClick={() => setActiveTab('week')}> Top Tuần </div>
                            <div className={`tab ${activeTab === 'day' ? 'active' : ''}`} onClick={() => setActiveTab('day')}> Top Ngày </div>
                        </div>
                        <div className="ranking-list">
                            {topRankings.map(item => (
                                <div key={item.rank} className="ranking-item">
                                    <div className={`rank-number ${item.rank < 3 ? 'top3' : 'other'}`}>
                                        {String(item.rank).padStart(2, '0')}
                                    </div>
                                    <div className="rank-image">
                                        <img src="/api/placeholder/48/64" alt={item.title} />
                                    </div>
                                    <div className="rank-info">
                                        <div className="rank-title">{item.title}</div>
                                        <div className="rank-chapter">{item.chapter}</div>
                                        <div className="rank-views">{item.views}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}

                {/* </div> */}

            </div>

        </div>)
}
export default Search;

// console.log("Search keyword:", search);

//                 let url;
//                 if (!search || search.trim() === "") {
//                     url = ;
//                 } else {
//                     url = `https://otruyenapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(search)}`;
//                 }
