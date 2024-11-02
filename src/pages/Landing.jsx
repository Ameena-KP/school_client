import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Landing() {
  return (
<>
<div className='w-100 d-flex justify-content-center align-items-center' style={{height:'100vh',backgroundColor:'lightblue'}}>
    <div className='w-75'>
        <Row>
            <Col>
            <h2>School Management</h2>
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi laboriosam distinctio iste. 
                Nam, sapiente? At voluptatem ab maxime veritatis tempore, labore qui amet laboriosam aspernatur officia illum. 
                Blanditiis, a. Nulla.</p>
                <Link to={'/auth'} className='btn btn-success'>Let's Go</Link>
            </Col>
            <Col>
            <img src="https://clipartcraft.com/images/education-clipart-child-8.png" alt="" className='img-fluid' />
            </Col>
        </Row>

    </div>

</div>
</>
)
}

export default Landing