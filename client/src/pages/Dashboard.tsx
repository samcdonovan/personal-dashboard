import React from 'react';
import Widget from '../components/Widget';
import Photo from '../components/Photo';

/* Main Dashboard page functional component; displays the 6 different widgets,
a welcome message and the users profile picture */
function Dashboard() {
    return (
        <div>
            <img></img>
            <h1>Good day User</h1>
            <div className="content dashboard">
                <Widget title="Weather">
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
                </Widget>
            </div>
        </div>
    );
}

export default Dashboard;
