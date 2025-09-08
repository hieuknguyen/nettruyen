// src/components/Header.js
import React, { useEffect } from "react";
import './hearder.css';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function toggleMobileMenu() {
    if (document.getElementById("mobileMenu").style.display === "flex") {
        document.getElementById("mobileMenu").style.display = "none";
    } else {
        document.getElementById("mobileMenu").style.display = "flex";
    }
}

function Header() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleKeyDown = (e) => {
        // Chỉ chạy khi nhấn Enter và input đang focus
        if (e.key === "Enter") {
            if (search.trim() !== "") {
                navigate(`/Search?q=${search}`);
            } else {
                navigate("/");
            }
        }
    };


    return (
        <header className="header">
            <div className="header-container">
                <nav className="nav-wrapper">

                    <a href="/" className="logo" >
                        <div className="logo-icon">🚀</div>
                        <span>YourBrand</span>
                    </a>
                    <ul className="nav-menu">
                        <li className="nav-item"><a href="#" className="nav-link">HOT</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">THEO DÕI</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">LỊCH SỬ</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">THỂ LOẠI</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">XẾP HẠNG</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">TÌM TRUYỆN</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">CON GÁI</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">CON TRAI</a></li>
                    </ul>

                    <div className="nav-right" style={{ display: "flex" }}>

                        <div className="search">
                            <div className="search-box">
                                <input type="text" className="search-input" id="searchInput" placeholder="Tìm kiếm..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                                <ion-icon name="search-outline" className ="search-btn" onClick={() => navigate(`/Search?q=${search}`)}></ion-icon>
                            </div>
                        </div>

                        <button className="login-btn">Đăng nhập</button>
                        <button className="mobile-toggle" onClick={toggleMobileMenu}>☰</button>
                    </div>

                </nav>

                <div className="mobile-menu" id="mobileMenu">
                    <ul className="mobile-nav">
                        <li><a href="#">Trang chủ</a></li>
                        <li><a href="#">Sản phẩm</a></li>
                        <li><a href="#">Dịch vụ</a></li>
                        <li><a href="#">Về chúng tôi</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Liên hệ</a></li>
                    </ul>

                    <div className="mobile-search">
                        <div className="search-box">
                            <input type="text" className="search-input" placeholder="Tìm kiếm..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                            <ion-icon name="search-outline" className ="search-btn" onClick={() => navigate(`/Search?q=${search}`)}></ion-icon>
                        </div>
                    </div>


                </div>
            </div>
        </header>
    );
}

export default Header;
