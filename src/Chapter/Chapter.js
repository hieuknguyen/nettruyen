// src/components/Header.js
// // navigate("/ReadComic", { state: { chapter_api_data } })
import React, { useEffect, useState, useNavigate, useMemo } from "react";
import './chapter.css';
import { Link, useLocation } from "react-router-dom";
import Header from '../Header/Hearder';



function handleClick(link, e) {
    if (link === null) {
        e.preventDefault();
        alert('Xin vui lòng thử lại sau.')
        return
    }
    localStorage.setItem("chapter_api_data", link);
}

function toggleViewMode(type) {
    console.log(type);
    if (type === "grid") {
        document.getElementsByClassName("list-outline")[0].style.display = "none";
        document.getElementsByClassName("grid-outline")[0].style.display = "flex";
        document.getElementsByClassName("chapters-grid")[0].style.display = "none";
        document.getElementsByClassName("chapters-list")[0].style.display = "flex";
    }
    if (type === "list") {
        document.getElementsByClassName("list-outline")[0].style.display = "flex";
        document.getElementsByClassName("grid-outline")[0].style.display = "none";
        document.getElementsByClassName("chapters-grid")[0].style.display = "grid";
        document.getElementsByClassName("chapters-list")[0].style.display = "none";
    }

}
async function API(url) {
    console.log("Fetching from URL:", url);
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

function Chapter() {
    function swap() {
        setChapterData(prev => {
            const newMap = new Map(prev);
            const chapters = [...(newMap.get("chapter") || [])];
            // Đảo ngược thứ tự mảng
            chapters.reverse();
            newMap.set("chapter", chapters);
            return newMap;
        });
    }


    const location = useLocation();
    const { chapter_api_data } = location.state || {};
    const [chapterData, setChapterData] = useState(new Map(
        [
            ["img", null],
            ["name", ""],
            ["content", ""],
            ["categories", []],
            ["status", ""],
            ["author", []],
            ["lastUpdate",""],
            ["chapter", []],
            ["firstChapter", null],
            ["lastChapter", null]

        ]
    ));



    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await API(chapter_api_data);

                let listCategory = data.data.item.category.map(cat => cat.name);
                let chapter = data.data.item.chapters[0]?.server_data.map(srv => ({ chapter_name: srv.chapter_name, chapter_api_data: srv.chapter_api_data })) || [];
                let listAuthor = data.data.item.author.map(au => au).filter(au => au !== '');
                
                const now = new Date();
                const date = new Date(data.data.item.updatedAt);
                const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                let Days = "";
                if (diffDays === 0) {
                    Days = "Hôm nay";
                } else if (diffDays === 1) {
                    Days = "Hôm qua";
                } else {
                    Days = `${diffDays} ngày trước`;
                }
                setChapterData(
                    prev => {
                        const newMap = new Map(prev);
                        newMap.set("img", `https://img.otruyenapi.com/uploads/comics/${data.data.item.thumb_url}`);
                        newMap.set("name", `${data.data.item.name}`);
                        newMap.set("content", data.data.item.content.replace(/<\/?p>/g, ''));
                        newMap.set("status", data.data.item.status);
                        newMap.set("categories", listCategory);
                        newMap.set("author", listAuthor);
                        newMap.set("lastUpdate",Days);
                        newMap.set("chapter", chapter);
                        newMap.set("firstChapter", chapter[0]?.chapter_api_data ?? null);
                        newMap.set("lastChapter", chapter.at(-1)?.chapter_api_data ?? null);
                        return newMap;
                    }
                );
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const [search, setSearch] = useState("");
    const chaptersAll = chapterData.get("chapter") || [];
    const chaptersView = useMemo(() => {
        if (!search.trim()) return chaptersAll;
        return chaptersAll.filter(ch => {
            const nums = String(ch.chapter_name ?? "").match(/\d+/g) || [];
            return nums.some(n => n.includes(search.trim()));
        });
    }, [search, chaptersAll]);
    return (
        <div className="main-content">
            <Header />
            <div className="manga-info">
                <img src={chapterData.get("img")} alt="King Game" className="cover-image" id="coverImage" />
                <div className="manga-info-content">
                    <h1 className="manga-title">{chapterData.get("name")}</h1>


                    <div className="info-item">
                        Thể loại:
                        {chapterData.get("categories").length === 0 ? (
                            <span className="info-tag" >Không rõ</span>
                        ) : (
                            chapterData.get("categories").map(cat => (
                                <span key={cat} className="info-tag" >{cat}</span>
                            ))
                        )}
                    </div>
                    <div className="info-item" >
                        Trạng thái:
                        <span className="info-tag">
                            {chapterData.get("status") === "ongoing" ? (
                                <>
                                    <ion-icon name="time-outline"></ion-icon> Đang cập nhật
                                </>
                            ) : chapterData.get("status") === "completed" ? (
                                <>
                                    <ion-icon name="checkmark-outline"></ion-icon> Hoàn thành
                                </>
                            ): chapterData.get("status") === "coming_soon" ? (
                                <>
                                    <ion-icon name="timer-outline"></ion-icon> Sắp ra mắt
                                </>
                            ) : (
                                <>
                                    <ion-icon name="alert-outline"></ion-icon> Không xác định
                                </>
                            )
                            }
                        </span>
                    </div>
                    <div className="info-item" >
                        Tác giả:
                        {chapterData.get("author").length === 0 ? (
                            <span className="info-tag" >Không rõ</span>
                        ) : (
                            chapterData.get("author").map(au => (
                                <span key={au} className="info-tag" >{au}</span>
                            ))
                        )}

                    </div>

                    <div className="info-item" >
                        Cập nhật lần cuối:
                        
                        <span className="info-tag" >{chapterData.get("lastUpdate")}</span>
                        

                    </div>

                    <div className="info-chapters">
                        <div className="info-chapters-card">
                            <div className="info-chapters-number" id="chapterCount">{chapterData.get("chapter")?.length}</div>
                            <div className="info-chapters-label">Chapters</div>
                        </div>
                    </div>

                    <p className="manga-description">{chapterData.get("content")}</p>

                    <div className="action-buttons">

                        <Link to="/ReadComic" onClick={(e) => handleClick(chapterData.get("firstChapter"), e)} className="btn-primary" >
                            <ion-icon name="play-outline"></ion-icon>
                            Đọc từ đầu
                          
                        </Link>

                        <Link to="/ReadComic" onClick={(e) => handleClick(chapterData.get("lastChapter"), e)} className="btn-secondary" >

                            Đọc chapter mới nhất
                        </Link>

                    </div>
                </div>
            </div>

            <div className="chapters-section">
                <div className="chapters-header">
                    <h2 className="chapters-title">Danh sách truyện</h2>
                    <div className="chapters-controls">
                        <div className="search-container">
                            <ion-icon name="search-outline" className="search-icon"></ion-icon>
                            <input type="number" className="search-chapter" placeholder="Tìm kiếm chapter..." id="searchChapter" onChange={e => setSearch(e.target.value)} />
                        </div>
                        <span className="chapter-count" id="chapterCountText">{chapterData.get("chapter")?.length} chapters</span>
                        <ion-icon name="swap-vertical-outline" className="swap-outline" onClick={() => swap()}></ion-icon>
                        <ion-icon name="list-outline" className="list-outline" onClick={() => toggleViewMode("grid")}></ion-icon>
                        <ion-icon name="grid-outline" className="grid-outline" onClick={() => toggleViewMode("list")}></ion-icon>


                    </div>
                </div>

                <div className="chapters-grid" id="chaptersGrid">
                    {chaptersView.map((ch, idx) => (
                        <Link key={idx} to="/ReadComic" onClick={(e) => handleClick(ch.chapter_api_data, e)} className="chapter-item-card" >
                            {`Chapter ${ch.chapter_name}`}
                        </Link>
                    ))}
                </div>

                <div className="chapters-list" id="chaptersList">

                    {chaptersView.map((ch, idx) => (
                        <Link key={idx} to="/ReadComic" onClick={(e) => handleClick(ch.chapter_api_data, e)} className="chapter-item-list" >
                            {`Chapter ${ch.chapter_name}`}
                        </Link>
                    ))}

                </div>

                <div className="empty-state" id="emptyState" >
                    <p>Không tìm thấy chapter nào</p>
                    <small>Thử thay đổi từ khóa tìm kiếm</small>
                </div>
            </div>
        </div>
    );
}

export default Chapter;
