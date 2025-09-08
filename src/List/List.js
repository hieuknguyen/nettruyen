



import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Hearder";
import Item from '../Item/Item.js';
import './List.css';




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

function List() {
    let { id, subId } = useParams();


    subId = subId ?? 1;

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [subId]);
    useEffect(() => {
        const validIds = ["hoan-thanh", "sap-ra-mat", "truyen-moi", "dang-phat-hanh"];
        if (!validIds.includes(id)) {
            navigate("/");
        }
    })

    const [featuredMangas, setFeaturedMangas] = useState([]);//state truyen
  
    const [totalItems, setTotalItems] = useState([]);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const pages = [];
        const totalPages = Math.ceil(totalItems / 24);
        const currentPageNum = parseInt(subId ?? "1");

        for (let i = 1; i <= totalPages; i++) {
            if (
            
                (i >= currentPageNum - 3 && i <= currentPageNum + 3)
                
            ) {
                if (!pages.includes(i)) { // <-- tránh trùng lặp
                    pages.push(i);
                }
            } else {
                if (pages[pages.length - 1] !== "...") {
                    pages.push("...");
                }
            }
        }

        setPages(pages);
    }, [totalItems, subId]);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = new Date();
                const data = await API(`https://otruyenapi.com/v1/api/danh-sach/${id}?page=${subId}`);
                const items = data.data.items || data.data;
                setTotalItems(data.data.params.pagination.totalItems)
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


    }, [id, subId]);

    console.log(pages)
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
            {/* <h2 className="section-title">Kết quả tìm kiếm ""</h2> */}
            <div className="row">
                <div className="featured-grid">
                    {featuredMangas.map((manga, idx) => (
                        <Item key={`${manga.id || "manga"}-${idx}`} id={manga.id} image={manga.image} title={manga.title} chapter={manga.chapter} views={manga.views} chapter_api_data={manga.chapter_api_data}
                        />
                    ))}

                </div>
            </div>

            <div className="pagination-container">
                <div className="pagination-info">
                    <div className="current-info">Trang {subId} / {Math.ceil(totalItems / 24)}</div>
                    <div>Tổng {totalItems} kết quả</div>
                </div>

                <div className="pagination">
                    <Link to={`/List/${id}/1`} className="pagination-btn pagination-nav">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="m18.41 16.59-4.59-4.59 4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z" />
                        </svg>
                    </Link>

                    <Link to={`/List/${id}/${parseInt(subId) > 1 ? (parseInt(subId) - 1).toString() : subId}`} className="pagination-btn pagination-nav">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </Link>
                    {pages.map((page, idx) =>
                        page === "..." ? (
                            <div key={idx} className="pagination-btn pagination-dots">{page}</div>
                        ) : (
                            <Link
                                key={page}
                                to={`/List/${id}/${page}`}
                                className={`pagination-btn ${page.toString() === subId ? "active" : ""}`}
                            >
                                {page}
                            </Link>
                        )
                    )}
                    <Link to={`/List/${id}/${parseInt(subId) < Math.ceil(totalItems / 24) ? (parseInt(subId) + 1).toString() : subId}`} className="pagination-btn pagination-nav">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </Link>

                    <Link to={`/List/${id}/${parseInt(subId) === Math.ceil(totalItems / 24) ? parseInt(subId) : Math.ceil(totalItems / 24)}`} className="pagination-btn pagination-nav">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM16 6h2v12h-2V6z" />
                        </svg>
                    </Link>
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

            </div> */}

        </div>

    </div>)
}
export default List;
