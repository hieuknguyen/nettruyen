import { use, useEffect, useState } from 'react';
import './ReadComic.css';
import { Link, useLocation } from "react-router-dom";

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
function ReadComic() {
    // const location = useLocation();
   const chapterApiData = localStorage.getItem("chapter_api_data");
    
    const [imgs, setImgs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await API(chapterApiData);
                const domain_cdn = data.data.domain_cdn;
                const chapter_path = data.data.item.chapter_path;
                const imgs = [];
                data.data.item.chapter_image.forEach(img => {
                    imgs.push(`${domain_cdn}/${chapter_path}/${img.image_file}`);
                });
                setImgs(imgs);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="read-comic">
            {/* { chapterApiData} */}
            {imgs.map((img, index) => (
                <img key={index} src={img} alt="comic" style={{ display: "block" }} loading="lazy"/>
            ))}
        </div>
    );

}
export default ReadComic;
