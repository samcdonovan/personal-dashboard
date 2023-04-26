import React, { useState, useEffect } from 'react';
import { getNews } from '../utils/ProxyAPI'

interface News {
    title: string,
    snippet: string,
    article: string
}

/* News page functional component; displays the most recent article
from the BBC RSS feed */
function News() {

    const [news, setNews] = useState<News>({
        title: '',
        snippet: '',
        article: ''
    });
    useEffect(() => {
        getNews(setNews);

    }, [])

    return (
        <div>
            <h1>{news.title}</h1>
            <div className="news-div" dangerouslySetInnerHTML={{ __html: news.article }}>
            </div>
        </div>
    );
}

export default News;
