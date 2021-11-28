import React from 'react';
import NavBar from '../Components/NavBar';

function MeetTheTeam(){
    return(
        <div style={{marginLeft: 10}}>
            <NavBar />
            <h1>Meet The Team</h1>
            <p>This web aplication was a collaborative project between five university students for Sophomore Project.</p>
            <p>We are:</p>
            <p>Vincent Schmick - Team Leader/Scrum Master/Assistant Developer</p>
            <p>Edgar Terrazas Jacquez - Full Stack Developer</p>
            <p>Paige Craig - Backend Developer</p>
            <p>Joshua Pagonas - Frontend Engineer/Product Owner</p>
            <p>Shelnesha Taylor - Frontend Designer</p>

            <p>Thank you for checking out our application!</p>

        </div>
    )
}
export default MeetTheTeam;