import React from 'react';
import NavBar from '../Components/NavBar';

function About(){
    return(
        <>
        <NavBar />
            <div style={{marginLeft: 10}}>
                <h1>About</h1>
                <p>Welcome to TakewonTourney! This web application is for Taekwondo orgianizations
                    and allows martial arts organizers to organize their events <br /> by supplying useful features that are important
                    for tournaments to take place.</p>
                <p>
                    This application facilitates the creation and administration of tournaments. Features include:
                </p>

                <ul>
                    <li>Tournament creation and management. This includes naming and scheduling your tournaments.</li>
                    <li>Ranking system</li>
                    <li>User profile</li>
                    <li>Tournament history</li>
                </ul>

                

            </div>
        </>
    )
}
export default About;