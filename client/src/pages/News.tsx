import React, { useState, useEffect } from 'react';
import { getNews } from '../utils/ProxyAPI'

interface NewsProps {
    title: string,
    snippet: string,
    article: string
}

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
            <h1>{title}</h1>
            <div className="news-div" dangerouslySetInnerHTML={{ __html: article }}>
            </div>
        </div>
    );
}

export default News;
