// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import { Col, Row } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { addStudent } from '../services/allApis';



// function Add() {
//     const [show, setShow] = useState(false);

//     const [student,setStudent]=useState({
//       name:"",batch:"",phone:"",image:""
//     })

//     const [preview,setPreviw]=useState(" ")

//     useEffect(()=>{
//       if(student.image){
//         setPreviw(URL.createObjectURL(student.image))
//       }
//       else{
//         setPreviw(" ")
//       }
//     },[student.image])

//     const handleAddStudent=async()=>{
// console.log(student);

//     }

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
  

//   return (
//    <>
// <button className='btn btn-info mt-5 ms-2' onClick={handleShow} >Add Students</button>

//    <Modal 
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         className='modal-xl'
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add Student Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <Row>
// <Col sm={6}>
// <label>
//     <input type="file" onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} style={{visibility:'hidden'}}  />
//     <img src={ preview ? preview : "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=220" } alt="" className='img-fluid' />
// </label>


// </Col>
// <Col sm={6}>


// <input type="text" onChange={(e)=>setStudent({...student,name:e.target.value})} placeholder='enter name' name='name' className='form-control mb-4 mt-5' />
// <input type="number" onChange={(e)=>setStudent({...student,phone:e.target.value})} placeholder='enter phone number' name='phone' className='form-control mb-4' />
// <input type="text" onChange={(e)=>setStudent({...student,batch:e.target.value})} placeholder='enter class' name='class' className='form-control mb-4' />


// </Col>

//             </Row>
          
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleAddStudent}>Upload</Button>
//         </Modal.Footer>
//       </Modal>
//    </>
//   )
// }

// export default Add



import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { addStudent } from '../services/allApis';
import { toast } from 'react-toastify';
import { addResponseContext } from '../contextApi/Context';



function Add() {

  
  const [student , setStudent] = useState({
    name:"" , batch:"" , phone:""  , image:""
  })

  const [preview , setPreview ]= useState("")

  const {addResponse,setAddResponse}=useContext(addResponseContext)

  const handleAddstudent=async()=>{
    console.log(student)
    const {name,phone,batch,image}=student
    if(!name || !phone || !batch || !image){
        console.log("Name:", name, "Batch:", batch, "Phone:", phone, "Image:", image);
        toast.warning("Enter Valid Inputs")
    }
    else{
        const fd=new FormData()
        fd.append("name",name)
        fd.append("batch",batch)
        fd.append("phone",phone)
        fd.append("image",image)

        const header={
            "Content-Type":'multipart/form-data',
            "Authorization":`Token ${sessionStorage.getItem('token')}`
        }

        const res=await addStudent(fd,header)
        console.log(res)
        if(res.status==200){
            toast.success("Student Added")
            handleClose()
            setAddResponse(res)
        }
        else{
            toast.error("Adding Failed!!")
        }


    }

}

  useEffect(()=>{
    if(student.image){
      setPreview(URL.createObjectURL(student.image))
    }else{
      setPreview("")
    }
  } , [student.image])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
   <>
   <div className='m-3 d-flex justify-content-center align-items-center'>
          <button className=' btn btn-primary mt-5 ms-2' onClick={handleShow}>Add Student</button>
        </div>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='modal-xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6} sm={12} >
                <label >
                    <input type="file" style={{visibility:"hidden"}}  onChange={(e)=>setStudent({...student,image:e.target.files[0]})} />
                    <img src={preview?preview:"https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=220" }
                    className='img-fluid'
                   
                    alt="" />
                </label>
                </Col>
                <Col md={6} sm={12}  >
          <input type="text" onChange={(e)=>setStudent({...student,name:e.target.value})} className='form-control mt-4 mb-4' name='name' placeholder='Enter Name' />
          <input type="text" onChange={(e)=>setStudent({...student,batch:e.target.value})}  className='form-control mb-4' name='dt' placeholder='Batch' />
          <input type="number" onChange={(e)=>setStudent({...student,phone:e.target.value})}  className='form-control mb-4' name='phone' placeholder='Enter Phone Number' />
          </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddstudent}>Add</Button>
        </Modal.Footer>
      </Modal>

      
   </>
  )
}

export default Add