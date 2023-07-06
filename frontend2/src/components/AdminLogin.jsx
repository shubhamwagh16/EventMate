import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation"
import "../Styles/Login.css";

function AdminLogin(){
    const dispatch=useDispatch()
    const [user,setUser]=useState({
        "userid":"",
        "pwd":""
    })
    const [submitted,setSubmitted]=useState(false)
    const [errors,setErrors]=useState({})
    const [errmsg,setErrmsg]=useState()
    const history=useHistory()

    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(loginvalidation(user))    
        setSubmitted(true)
    }

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            console.log(user)
            axios.post("http://localhost:8080/api/admin/validate",user)
            .then(resp=>{
                let result=resp.data.data;
                console.log(resp.data.data)
                sessionStorage.setItem("userid",result.userid)
                sessionStorage.setItem("uname",result.uname)
                sessionStorage.setItem("role","admin")
                dispatch({type:'IsLoggedIn'})
                history.push("/aprofile")
            })
            .catch(error=>{
                console.log("Error",error);
                setErrmsg("Invalid username or password..!!")
            })            
        }
    },[errors])


    return (
        <div className="container">
        <div className="card shadow bg-transparent mt-3 text-black">
    <div className="card-body">
    <div className="row">
        <div className="col-sm-6 mx-auto">
            <h3 className="text-center p-2 ">
                <b>Admin Login</b>
            </h3>
            <form onSubmit={handleSubmit}>                 
            <div className="form-group form-row">
                <label className=" label col-sm-4 form-control-label">User Id</label>
                <div className="col-sm-8">
                    <input type="text" name="userid" placeholder="Enter Your Email" value={user.userid} onChange={handleInput} className="form-control" />
                    {errors.userid && <small className="text-danger float-right">{errors.userid}</small>}
                </div>
            </div>  

            <div className="form-group form-row">
                <label className=" label col-sm-4 form-control-label ">Password</label>
                <div className="col-sm-8">
                    <input type="password" name="pwd" placeholder="Enter Your Password" value={user.pwd} onChange={handleInput} className="form-control" />
                    {errors.pwd && <small className="text-danger float-right">{errors.pwd}</small>}
                </div>
            </div>  
                              
            <button className="btn float-right text-black">Login</button>
            </form>
            <div className="clearfix"></div>
            {errmsg && <p className="alert alert-danger mt-4 text-center font-weight-bold">{errmsg}</p>}
        </div>
    </div>
    </div>
    </div>
    </div>
    );
}

export default AdminLogin;