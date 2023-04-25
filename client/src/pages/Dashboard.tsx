import React from 'react';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Widget from '../components/Widget';
import Photo from '../components/Photo';
import { getWeather, getClothesData } from '../utils/ProxyAPI';

/* Main Dashboard page functional component; displays the 6 different widgets,
a welcome message and the users profile picture */
function Dashboard() {

    const [weather, setWeather] = useState({
        status: 404,
        type: "Oops!",
        temp: Infinity,
        location: "Something went wrong!"
    });

    const [clothesData, setClothesData] = useState(Array<ClothingItem>);

    useEffect(() => {

        getWeather(setWeather);

        ChartJS.register(ArcElement, Tooltip, Legend);
        getClothesData(setClothesData);
    }, [])

    return (
        <div>
            <img></img>
            <h1>Good day User</h1>
            <div className="content dashboard">
                <Widget title="Weather">
                    {weather.status !== 404 ?
                        <div>
                            <p>{weather.type}</p>
                            <p>{weather.temp}</p>
                            <p>{weather.location}</p>
                        </div>
                        :
                        <div>
                            <p>Loading...</p>
                        </div>
                    }
                </Widget>
                <Widget to="/dashboard/news" title="News">

                </Widget>
                <Widget to="/dashboard/sports" title="Sport">

                </Widget>
                <Widget to="/dashboard/photos" title="Photos">
                    <Photo size="small" />
                    <Photo size="small" />
                    <Photo size="small" />
                    <Photo size="small" />
                </Widget>
                <Widget to="/dashboard/tasks" title="Tasks">

                </Widget>
                <Widget title="Clothes">
                    {clothesData.length > 0 ?
                        <Pie data={{
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
                        }}
                        /> : null}
                </Widget>
            </div>
        </div>
    );
}

export default Dashboard;
