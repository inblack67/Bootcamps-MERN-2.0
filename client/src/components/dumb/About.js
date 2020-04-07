import React from 'react'

const About = () => {
    return (
        <div className='container' style={{'marginBottom': '15rem'}}>
            <h1>About</h1>
            <p className="flow-text">
                Explore the Bootcamps, review them or choose the best fit for you, by location, money, courses etc.
                <br/><br/>
                Or, publish a new Bootcamp and manage it by adding courses, photo and what not.
                {/* For JavaScript Devs, By JavaScript Devs. */}
            </p>
            <hr/>
            <strong>
                BootCamps 2020 &copy; All Rights Reserved
            </strong>
        </div>
    )
}

export default About
