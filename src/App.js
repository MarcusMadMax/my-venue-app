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
        { id: "4b4d4133f964a52070cf26e3", name: "Real Groovy", address: "369 Queen Street", category: "Record Shop" },
        { id: "4b633568f964a520bc6a2ae3", name: "Cordis Auckland", address: "83 Symonds St", category: "Hotel" },
        { id: "4bc992e7b6c49c7401a28e91", name: "Ken Yakitori", address: "89 Karangahape Rd.", category: "Yakitori" }
      ]
    }



  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="venues">

            {//Do the mapping
              this.state.venues.map(item => {

                var props = {
                  key: item.id,
                  ...item
                }
                return (

                  <Venue {...props} />

                )
              })
            }



          </div>
        </div>
      </div>
    )
  }


}

export default App;
