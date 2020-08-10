import React, { Component } from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal'
import Venue from './Venue'

var clientId = 'FCNYO5KHZ1TOD4UNGU5FNMPHJY30GBRJ0QXVJHDFLWLWVSBN'
var clientSecret = 'UBQLBN3APF2VOZZW3UPE3SNLNHOSYM1WVMWQVLTN10XPR0ZN'
var key = '?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20200810'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: [
      ],
      isModalOpen: false,
      modalVenue: {
      }
    }
  }

  loadVenues = () => {
    var latLong = '-36.683386,174.740605'
    var url = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latLong

    //make an Ajax request to endpoint
    fetch(url)
      .then((res) => {
        return res.json()//creates json data from response
      })
      .then((data) => {
        return data.response.groups[0].items
      })
      .then((data) => {
        return data.map((item) => {
          var venue = {
            id: item.venue.id,
            name: item.venue.name,
            address: item.venue.location.address,
            category: item.venue.categories[0].shortName
          }
          return venue
        })
      })
      .then((data) => {
        this.setState({
          venues: data
        })
      })
  }

  loadVenue = (id) => {
    var url = 'https://api.foursquare.com/v2/venues/' + id + key

    fetch(url)
      .then(res => res.json())
      .then(data => {
        var item = data.response.venue
        // console.log(item)
        var venue = {
          id: item.id,
          name: item.name,
          category: item.categories[0].shortName,
          address: item.location.address,
          description: item.description,
          photo: item.bestPhoto.prefix + '300x300' + item.bestPhoto.suffix
        }
        return venue
      })
      .then(data => {
        this.setState({
          modalVenue: data
        })
      })
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  componentDidMount() {
    this.loadVenues()
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="venues">
            {//Do the mapping
              this.state.venues.map(item => {
                var props = {
                  key: item.id,
                  ...item,
                  openModal: this.openModal,
                  loadVenue: this.loadVenue
                }
                return (

                  <Venue {...props} />

                )
              })
            }
          </div>
        </div>


        <Modal show={this.state.isModalOpen} onHide={this.closeModal}>

          <Modal.Body>
            <div className="venue-popup-body row">
              <div className="col-6">
                <h1 className="venue-name">{this.state.modalVenue.name}</h1>
                <p>{this.state.modalVenue.address}</p>
                <p>Auckland</p>
                <p><span className="badge venue-type">{this.state.modalVenue.category}</span></p>
              </div>
              <div className="col-6">
                <img src={this.state.modalVenue.photo} className="img-fluid" alt="Responsive" />
              </div>
            </div>

          </Modal.Body>

        </Modal>

      </div>
    )
  }


}

export default App;
