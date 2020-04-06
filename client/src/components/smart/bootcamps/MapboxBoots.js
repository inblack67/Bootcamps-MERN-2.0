import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const MapboxBoots = ({ bootcamps }) => {

    useEffect(() => {

        const listner = e => {
            if(e.key === 'Escape'){
                setSelectedBootcamp(null)
            }
        }

        window.addEventListener('keydown', listner)

        return () => {
            window.removeEventListener('keydown', listner)
        }

        // eslint-disable-next-line
    },[])

    const [viewPort, setViewPort] = useState({
        latitude: 41.483657,
        longitude: -71.525909,
        width: '50wh',
        height: '50vh',
        zoom: 10
    })

    const [selectedBootcamp, setSelectedBootcamp] = useState(null)

    return (
        <Fragment>
            <ReactMapGl {...viewPort} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} onViewportChange={viewPort => setViewPort(viewPort)} mapStyle='mapbox://styles/inblack1967/ck8omk5xm3q4j1ioda783oxwj'>
            
            { bootcamps.map(b => (
                <Marker key={b._id} latitude={b.location.coordinates[1]} longitude={b.location.coordinates[0]}>
                    <button className="btn red pulse waves-effect" onClick={e => setSelectedBootcamp(b)}>
                        <i className="material-icons">devices</i>
                    </button>
                </Marker>
            )) }

            { selectedBootcamp && <Popup latitude={selectedBootcamp.location.coordinates[1]} longitude={selectedBootcamp.location.coordinates[0]} onClose={() => setSelectedBootcamp(null)}>
                <div className="">
                    <p className="flow-text">{ selectedBootcamp.name }</p>
                    <span className="red-text"> {selectedBootcamp.location.formattedAddress} </span>
                    <br/>
                    <br/>
                    <br/>
                    <Link to={`/bootcamps/${selectedBootcamp._id}`} className='red btn'>Explore</Link>
                </div>
            </Popup> }

            </ReactMapGl>
        </Fragment>
    )
}

MapboxBoots.propTypes = {
    bootcamps: PropTypes.array.isRequired,
}

export default MapboxBoots
