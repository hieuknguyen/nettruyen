
import './Home.css';
import Header from '../Header/Hearder.js';

import fitty from "fitty";
import React, { useEffect, useState } from "react";

import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Item from '../Item/Item.js';
const as = null

// export function Search1() {
//     as(document.getElementsByClassName("search-input")[0].value)
// }

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

function Home() {

    // navigate("/", { replace: true });



    const [loading, setLoading] = useState(true); //load
    const [featuredMangas, setFeaturedMangas] = useState([]);//state truyen
    const [newMangas, setNewMangas] = useState([]);//state newtruyen
    const [comingSoonMangas, setComingSoonMangas] = useState([]);//
    const [completedMangas, setCompletedMangas] = useState([]);//

    useEffect(() => {

        const fetchData = async () => {
            try {

                const now = new Date();
                const data = await API("https://otruyenapi.com/v1/api/home");


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
        fetchData();
    }, []);


    // truyen moi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = new Date();
                const data = await API("https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=1");
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


                setNewMangas(mangas);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    //sap ra mat
    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = new Date();
                const data = await API("https://otruyenapi.com/v1/api/danh-sach/sap-ra-mat?page=1");
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


                setComingSoonMangas(mangas);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    //hoan thanh
    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = new Date();
                const data = await API("https://otruyenapi.com/v1/api/danh-sach/hoan-thanh?page=1");
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


                setCompletedMangas(mangas);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    // useEffect(() => {
    //     const els = fitty(".fit-text", {
    //         minSize: 10,
    //         maxSize: 500,
    //     });
    //     els.forEach(el => {
    //         el.element.addEventListener("fit", e => {
    //             e.target.style.fontSize = (e.detail.newValue - 1) + "px";
    //         });
    //     });

    //     return () => {
    //         els.forEach(el => el.unsubscribe());
    //     };
    // }, []);




    const [activeTab, setActiveTab] = useState([]);

    const topRankings = [
        { rank: 1, title: 'Bách Luyện Thành Thần', chapter: 'Chapter 1295', views: '81M' },
        { rank: 2, title: 'Đại Phụng Đả Canh Nhân', chapter: 'Chapter 559', views: '173K' },
        { rank: 3, title: 'Tình Giáp Hôn Tướng', chapter: 'Chapter 303', views: '132K' },
        { rank: 4, title: 'Từ Ký Luật Ta Bắt Đầu Khổ...', chapter: 'Chapter 132', views: '6K' },
        { rank: 5, title: 'Mối Tuần Ta Có Một Nghề N...', chapter: 'Chapter 823', views: '5M' },
        { rank: 6, title: 'Chăng Rể Mạnh Nhất Lịch Sử', chapter: 'Chapter 323', views: '119K' }
    ];

    // const handleSearch = (e) => {
    //     if (e.key === 'Enter' || e.type === 'click') {
    //         console.log('Searching for:', searchTerm);
    //     }
    // };



    return (
        <>
            <Header />
            <div className="main-content">



                <div className="warning">
                    <div className="container">
                        <div className="warning-content">
                            <div className="warning-icon">!</div>
                            <span>🔴 NETTRUYEN đang nâng cấp tính năng đọc truyện hàng ngày. Cảm ơn bạn đã LUÔN ủng hộ NETTRUYEN!</span>
                        </div>
                    </div>
                </div>



                <div className="container">
                    <h2 className="section-title">Truyện đề cử <span className="arrow">›</span></h2>
                    <div className="row">
                        <div className="featured-grid">
                            {featuredMangas.map((manga, idx) => (
                                <Item key={`${manga.id || "manga"}-${idx}`} id={manga.id} image={manga.image} title={manga.title} chapter={manga.chapter} views={manga.views} chapter_api_data={manga.chapter_api_data}
                                />
                            ))}

                        </div>
                    </div>

                    <div className="asdf">
                        <div className="two-column">
                            <h2 className="section-title">
                                NetTruyen Chính Thức - Mới cập nhật<span className="arrow">›<Link to="/List/truyen-moi" className="view-all">Xem tất cả</Link></span>
                            </h2>
                            <div className="new-manga-grid">
                                {newMangas.map((manga, idx) => (
                                    <Item key={`${manga.id || "manga"}-${idx}`} id={manga.id} image={manga.image} title={manga.title} chapter={manga.chapter} views={manga.views} chapter_api_data={manga.chapter_api_data}
                                    />
                                ))}

                            </div>
                        </div>
                        <div className="two-column">
                            <h2 className="section-title">
                                NetTruyen Chính Thức - Sắp ra mắt<span className="arrow">›<Link to="/List/sap-ra-mat" className="view-all">Xem tất cả</Link></span>
                            </h2>
                            <div className="new-manga-grid">
                                {comingSoonMangas.map((manga, idx) => (
                                    <Item key={`${manga.id || "manga"}-${idx}`} id={manga.id} image={manga.image} title={manga.title} chapter={manga.chapter} views={manga.views} chapter_api_data={manga.chapter_api_data}
                                    />
                                ))}

                            </div>
                        </div>
                        <div className="two-column">
                            <h2 className="section-title">
                                NetTruyen Chính Thức - Hoàn thành<span className="arrow">›<Link to="/List/hoan-thanh" className="view-all">Xem tất cả</Link></span>
                            </h2>
                            <div className="new-manga-grid">
                                {completedMangas.map((manga, idx) => (
                                    <Item key={`${manga.id || "manga"}-${idx}`} id={manga.id} image={manga.image} title={manga.title} chapter={manga.chapter} views={manga.views} chapter_api_data={manga.chapter_api_data}/>
                                ))}

                            </div>
                        </div>
                        <div className="rankings">
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
                        </div>

                    </div>

                </div>

            </div>
        </>

    );
};

export default Home;