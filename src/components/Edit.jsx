import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { updateStudentApi } from '../services/allApis';
import { editStudentContext } from '../contextApi/Context';



function Edit({student}) {

    const [show, setShow] = useState(false);
    const [detail,setDetail]=useState({...student})
    const [preview,setPreview]=useState("")
    const {editResponse,seteEditResponse}=useContext(editStudentContext)

    useEffect(()=>{
      if(detail.image.type){
        setPreview(URL.createObjectURL(detail.image))

      }
      else{
        setPreview("")
      }

    },[detail.image])


    const handleEdit=async()=>{
      console.log(detail);

      const {name,phone,batch,image}=detail
      if(!name || !phone || !batch || !image){
        toast.warning("invalid input")
      }
      else{
        if(image.type){
          const fd=new FormData()
          fd.append('name',name)
          fd.append('phone',phone)
          fd.append('batch',batch)
          fd.append('image',image)

          const header={
            'Content-Type':'multipart/form-data' ,
            'Authorization':`Token ${sessionStorage.getItem('token')}`
          }

          const res=await updateStudentApi(student._id,fd,header)
          if(res.status==200){
            toast.success("student details updated!!!")
            seteEditResponse(res)
            handleClose()
            setDetail({...res.data})
            setPreview("")
          }
          else{
            toast.error("updation failed!!!")
          }
        }
        else{
          const header={
            'Content-Type':'application/json',
            'Authorization':`Token ${sessionStorage.getItem('token')}`
          }
          const res=await updateStudentApi(student._id,detail,header)
          if(res.status==200){
            toast.success("updated")
            seteEditResponse(res)
            handleClose()
            setDetail({...res.data})
            setPreview("")
          }
          else{
            toast.error("failed")
          }

        }
      }
      
    }



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
<button className='btn' onClick={handleShow}>
<i className="fa-solid fa-pen-to-square" style={{color: "#154b06",}} />
</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
<Col sm={6}>
<label>
    <input type="file" style={{visibility:'hidden'}} onChange={(e)=>setDetail({...detail,image:e.target.files[0]})}  />
    <img src={preview?preview: `${base_url}/uploads/${student.image}`} alt=""  className='img-fluid' />
</label>


</Col>
<Col sm={6}>


<input type="text" onChange={(e)=>setDetail({...detail,name:e.target.value})} defaultValue={student.name} placeholder='enter name' name='name' className='form-control mb-2' />
<input type="number" onChange={(e)=>setDetail({...detail,phone:e.target.value})} defaultValue={student.phone} placeholder='enter phone number' name='phone' className='form-control mb-2' />
<input type="text" onChange={(e)=>setDetail({...detail,batch:e.target.value})} defaultValue={student.batch} placeholder='enter class' name='class' className='form-control mb-2' />


</Col>

            </Row>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit