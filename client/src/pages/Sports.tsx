import React, { useState } from 'react';
import { searchForTeam } from '../utils/ProxyAPI';

/* Sports page functional component; allows user to search for an Italian team
and then displays which teams their team won against */
function Sports() {
    const [team, setTeam] = useState('');
    const [data, setData] = useState([]);

    /**
     * Changes the 'team' state whenever there is a change in the input field
     * @param event The event that triggered the change
     */
    function handleChange(event: any) {
        setTeam(event.target.value);
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Input winning team"
                    value={team} /* set 'team' state as the value pf the input field */
                    onChange={handleChange}
                />
            </div>
            <button onClick={() => searchForTeam(team, setData)}></button>

            {data.length > 0 ?

                <div>
                    <p>{team} won against these teams:</p>
                    {
                        data.map(function (item: any, id: number) {
                            console.log(item);

                            /* determine which team they beat using the FTR field */
                            return <p key={id}>{item.FTR == "A" ? item.HomeTeam : item.AwayTeam} </p>
                        })
                    }
                </div>

                : null
            }
        </div>
    );
}

export default Sports;
