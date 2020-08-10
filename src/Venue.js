import React, { Component } from 'react'

class Venue extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div className="card venue">
                <div className="card-body">
        <h1 className="venue-name">{this.props.name}</h1>
        <p>{this.props.address}</p>
        <p>{this.props.city}</p>
        <p><span className="badge venue-type">{this.props.category}</span></p>
                </div>
            </div>
        )
    }
}

export default Venue