import {React, useState} from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import CardDetailItem from '../card/CardDetailItem'

function CardItem ({ character, type }) {
    const [showDetail, setShowDetail] = useState(false)
    const [locationName, setLocationName] = useState('')
    
    const handleClose = () => setShowDetail(false)
    const handleOpen = () => {
      setLocationName('')
      setShowDetail(true)
    }

    const handleLocationChange = (e) => {
      setLocationName(e.target.value)
    }

  return (
    <>
    <Card style={{ width: '10rem' }}>
      <Card.Img variant="top" src={character.image}/>
      <Card.Body>
        <Card.Title style={{ color: 'green' }}>{character.name}</Card.Title>
        <Card.Text>
          <span><b>Species :</b> {character.species}</span>
          <p><b>Status :</b> {character.status}</p>
        </Card.Text>
        {
          type !== 'char-loc' && <Button variant="outline-warning" onClick={handleOpen}>Detail</Button>
        }
      </Card.Body>
    </Card>
    {
     <CardDetailItem show={showDetail} close={handleClose} character={character} locationName={locationName} handleLocationChange={handleLocationChange}/>
    }
    </>
  )
}

export default CardItem