import React, { useState, useEffect } from 'react';
import styles from "../styles/news.module.css";
import { Link } from "react-router-dom";

/* News page functional component; displays the most recent article
from the BBC RSS feed */
function News() {

    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');

    useEffect(() => {
        let currentArticle = JSON.parse(sessionStorage.getItem('currentArticle') || '{}');
        setTitle(currentArticle.title);
        setArticle(currentArticle.article);
    }, [])

    return (
        <div>

            <Link to="/dashboard">
                <button className="link-btn">Go to dashboard</button>
            </Link>

            <h1 className="page-title">News</h1>
            <div className="content">
                <h1 className={styles["news-title"]}>{title}</h1>
                <div className={styles["news-div"]} dangerouslySetInnerHTML={{ __html: article }}>
                </div>
            </div>

        </div>
    );
}

export default News;
