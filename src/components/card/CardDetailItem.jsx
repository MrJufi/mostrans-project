import {React} from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function CardDetailItem ({show, close, character, locationName, handleLocationChange}) {
  const notifyErrorMsg = (msg) => toast.error(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    theme: "colored",
  })

  const addLocation = () => {
    const locations = JSON.parse(localStorage.getItem('Location')) || []
    
    const charExist = locations.find(loc => {
        return Object.values(loc).flat().includes(character.id);
    })
    
    if (charExist) {
        notifyErrorMsg('Character already exist in this location or another location')
        return
    }

    const checkLocationExist = locations.find(loc => loc.hasOwnProperty(locationName))

    if (checkLocationExist) { 
        const locationIndex = locations.findIndex(loc => loc.hasOwnProperty(locationName))
        const existingCharacters = locations[locationIndex][locationName]

        locations[locationIndex][locationName] = [...existingCharacters, character.id]
    } else {
        locations.push({ [locationName]: [character.id] })
    }

    localStorage.setItem('Location', JSON.stringify(locations))
    close()
  }

  return (
    <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Image src={character.image} fluid />
            <h4 className='mt-2' style={{ color: 'green' }}>{character.name}</h4>
            <p><b style={{ color: 'purple' }}>Species :</b> Human</p>
            <p style={{ lineHeight: '0' }}><b>Status :</b> Alive</p>
            <p><b>Location :</b> {character.location.name}</p>
            <Form.Control 
              type="text" 
              placeholder="Location name" 
              className='mt-3'
              value={locationName}
              onChange={handleLocationChange}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
                if (locationName) addLocation()
                else notifyErrorMsg('Please enter the location name first')
            }}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer/>
      </Modal>
  )
}

export default CardDetailItem