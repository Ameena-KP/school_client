import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { loginApi, registerApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'





function Auth() {
const [user,setUser]=useState({
    email:"",username:"",password:""
})

const nav=useNavigate()

    const [state,setState]=useState(false)

    const changeState=()=>{
        setState(!state)
    }

    const handleRegister=async()=>{
        console.log(user);
        const {username,email,password}=user
        if(!username || !email || !password){
            toast.warning('enter valid input')
        }
        else{
       const res =await registerApi(user)
       console.log(res);
       if(res.status==200){
        toast.success("register succesfull!!!")
        changeState()
        setUser({
            email:"",username:"",password:""

        })
       }
       else{
        toast.error("register failed!!!")
       }

        }
        
    }


    const handleLogin=async()=>{
        const {email,password}=user
        if(!email || !password){
            toast.warning("enter valid input")
        }
        else{
            const res=await loginApi({email,password})
            if(res.status==200){
                console.log(res);
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('uname',res.data.username)
                
                toast.success("login successfully!!!")
                setUser({
                    email:"",username:"",password:""
                })
                nav('/dash')
            }
            else{
                toast.error("login failed")
                console.log(res);
                
            }
        }
    }
    
  return (
    <>
    <div className='d-flex container-fluid justify-content-center align-items-center' style={{height:'100vh'}}>
        <div className='w-75 border shadow bg-light p-2'>
           <Row>
            <Col>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/app-login-5948720-4922487.png" alt="" className='img-fluid' />
            </Col>
            <Col className='d-flex flex-column justify-content-center'>
            {
                state ?

            
            <h3>Registration</h3>
            :
            <h3>Login</h3>

}
            <input type="email" placeholder='email ID' value={user.email} name='email' onChange={(e)=>setUser({...user,email:e.target.value})} className='form-control mb-3' />
            {
                state &&
            

            <input type="text" placeholder='user name' name='uname' value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} className='form-control mb-3' />
}

            <input type="password" placeholder='password' name='pswd' value={user.password}  onChange={(e)=>setUser({...user,password:e.target.value})}  className='form-control mb-3' />
            <div className='d-flex justify-content-between'>  
                {
                    state ?
                
                <button className='btn btn-info' onClick={handleRegister}>Register</button>
                :
                <button className='btn btn-primary' onClick={handleLogin} >login</button>
            }

<button className='btn btn-link'>
    {
        state ?
        <span onClick={changeState}>Already A User ?</span>
        :
        <span onClick={changeState}>New User</span>
    }


</button>
            </div>

            </Col>
           </Row>

        </div>

    </div>
    
    </>
  )
}

export default Auth