import React, { useEffect, useState } from 'react';
import { searchForTeam } from '../utils/ProxyAPI';
import styles from "../styles/sports.module.css";
import { Link } from "react-router-dom";

/**
 * Sports page functional component; allows user to search for an Italian team
 * and then displays which teams their team won against 
 * @returns React component
 */
function Sports() {
    const [team, setTeam] = useState('');
    const [data, setData] = useState([]);

    /**
     * Changes the 'team' state whenever there is a change in the input field
     * @param event The event that triggered the change
     */
    function handleChange(event: any) {
        setTeam(event.target.value);

        if (event.target.value !== '')
            searchForTeam(event.target.value, setData);
    }

    /* when data state is updated, store the recent search in localStorage */
    useEffect(() => {
        localStorage.setItem('recent_search', JSON.stringify({ team: team, numWins: data.length }))
    }, [data])

    return (
        <div>
            <Link to="/dashboard">
                <button className="link-btn">Go to dashboard</button>
            </Link>

            <h1 className="page-title">Champion's League Challenge</h1>
            <div className="content">
                <div className={styles["input-container"]}>
                    <input
                        type="text"
                        placeholder="Input winning team"
                        value={team} /* set 'team' state as the value pf the input field */
                        onChange={handleChange}
                    />
                </div>
                {data.length > 0 ?

                    <div>
                        <p className={styles["subtext"]}>{team} won against these teams:</p>
                        <div className={styles["won-against"]}>
                            {
                                data.map(function (item: any, id: number) {

                                    /* determine which team they beat using the FTR field */
                                    return <p key={id}>{item.FTR == "A" ? item.HomeTeam : item.AwayTeam} </p>
                                })
                            }
                        </div>
                    </div>

                    : null
                }
            </div>

        </div>
    );
}

export default Sports;
