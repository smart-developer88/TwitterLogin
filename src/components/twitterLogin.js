/**
 * Created by jinzhe cui on 8/23/20.
 */
import React, {useState, useEffect} from 'react';

export const TwitterLogin = () => {
    const [twitterName, setTwitterName] = useState();

    useEffect(() => {
        async function anyNameFunction() {
          const resp = await fetch("/api/twitter-username");
            console.log(resp);
            const unamej = await resp.json();
            console.log(unamej);
            const uname = await unamej.screen_name;
            setTwitterName(uname);
        };

        anyNameFunction();
    }, []);


    return(
        <>
            {
                twitterName && twitterName !== "Please click on Log in with Twitter button" ? (
                <div>
                    <p> {twitterName} </p>
                </div>
            ) :
                <div>
                    {/*<form action="localhost:5000/login" method="get">*/}
                    <form action="https://mytwitterappapi.herokuapp.com/login" method="get">
                        <label>
                          Name:
                         <input type="submit" value="Log in with Twitter"/>
                        </label>
                    </form>
                </div>

            }
        </>
    );


};

export default TwitterLogin;