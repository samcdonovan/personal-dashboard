import React from 'react';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Widget from '../components/Widget';
import Photo from '../components/Photo';
import { getWeather, getClothesData, getNews } from '../utils/ProxyAPI';
import styles from "../styles/dashboard.module.css";

/**
 * Main Dashboard page functional component; displays 6 different widgets,
 * a welcome message and the users profile picture
 * 
 * @returns React functional component
 */
function Dashboard() {

    const [weather, setWeather] = useState({
        status: 404,
        type: "Oops!",
        temp: Infinity,
        location: "Something went wrong!",
        icon: ''
    });

    const [clothesData, setClothesData] = useState(Array<ClothingItem>);
    const [photos, setPhotos] = useState(Array<string>);
    const [tasks, setTasks] = useState(Array<string>);
    const [team, setTeam] = useState({
        team: '',
        numWins: -1
    });
    const [news, setNews] = useState({
        title: '',
        snippet: '',
        article: ''
    });

    /* retrieve username and password from localStorage */
    const [user, setUser] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('credentials') || '{}').username);
        setProfilePicture(JSON.parse(localStorage.getItem('credentials') || '{}').profilePicture);

        getWeather(setWeather);

        ChartJS.register(ArcElement, Tooltip);
        getClothesData(setClothesData);

        let photosJson = JSON.parse(localStorage.getItem("gallery") || '{}');
        let currentPhotos = [];

        for (let idx = 0; idx < 4; idx++) {
            currentPhotos[idx] = photosJson[idx];
        }
        setPhotos(Object.values(currentPhotos));
        setTasks(Object.values(JSON.parse(localStorage.getItem("tasks") || '{}')));
        setTeam(JSON.parse(localStorage.getItem('recent_search') || '{}'));

        getNews(setNews);
    }, [])

    return (
        <div>
            <img className={styles["profile-picture"]} src={profilePicture}></img>
            <h1 className="welcome-message">Good day {user}</h1>
            <div className={"content " + styles.dashboard}>
                <Widget title="Weather">
                    {weather.status !== 404 ?
                        <div className={styles["weather-container"]}>
                            <div className={styles["weather-info"]}>
                                <div className={styles["weather-icon"]}>
                                    <img src={weather.icon} />
                                </div>
                                <div className={styles["weather-temp"]}>
                                    <p>{weather.temp} <br />degrees</p>
                                </div>
                            </div>
                            <div className={styles["location"]}>
                                <p>{weather.location}</p>
                            </div>
                        </div>
                        :
                        <div>
                            <p className={styles["inner-title"]}>Loading...</p>
                        </div>
                    }
                </Widget>
                <Widget to="/dashboard/news" title="News">

                    <div>
                        <h2 className={styles["inner-title"]}>{news.title}</h2>
                        <p className={styles["inner-text"]}>{news.snippet}</p>
                    </div>

                </Widget>
                <Widget to="/dashboard/sports" title="Sport">
                    {team.team ?
                        (<div>
                            <h2 className={styles["inner-title"]}>{team.team}</h2>
                            <p>Won {team.numWins} matches</p>
                        </div>)
                        :
                        <p className={styles["inner-title"]}>Use this widget to <br />search for a team!</p>
                    }
                </Widget>
                <Widget to="/dashboard/gallery" title="Photos">
                    <div className={styles["photo-widget"]}>
                        {photos.map(function (path: string, id: number) {

                            return <Photo key={id} size="small" src={path} page="dashboard" />;
                        })}
                    </div>
                </Widget>
                <Widget to="/dashboard/tasks" title="Tasks">
                    <div className={styles["task-container"]}>
                        {tasks.length > 0 ? tasks.map(function (task: any, id: number) {
                            if (id < 3)
                                return <div key={id}>
                                    <input
                                        readOnly
                                        type="text"
                                        value={task['task']}

                                    />
                                    <input readOnly type="checkbox" defaultChecked={task['isChecked']} />

                                </div>;
                        }) :
                            <p className={styles["inner-title"]}>You currently have no tasks in your to-do list!</p>}
                    </div>
                </Widget>
                <Widget title="Clothes">
                    {clothesData.length > 0 ?
                        <div className={styles["chart-container"]}>
                            <Pie className={styles["chart"]} data={{
                                labels: [clothesData[0].clothe, clothesData[1].clothe,
                                clothesData[2].clothe, clothesData[3].clothe,
                                clothesData[4].clothe, clothesData[5].clothe],

                                datasets: [
                                    {
                                        label: '# of days worn',
                                        data: [clothesData[0].sum, clothesData[1].sum,
                                        clothesData[2].sum, clothesData[3].sum,
                                        clothesData[4].sum, clothesData[5].sum],
                                        backgroundColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            'rgb(255, 206, 86)',
                                            'rgb(75, 192, 192)',
                                            'rgb(153, 102, 255)',
                                            'rgb(255, 159, 64)',
                                        ],
                                        borderColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(54, 162, 235)',
                                            'rgb(255, 206, 86)',
                                            'rgb(75, 192, 192)',
                                            'rgb(153, 102, 255)',
                                            'rgb(255, 159, 64)',
                                        ],
                                        borderWidth: 1,
                                    }
                                ]
                            }} options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                }
                            }}
                            />
                        </div> : null}
                </Widget>
            </div >
        </div >
    );
}

export default Dashboard;
