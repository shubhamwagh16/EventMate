import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import uservalidation from "../uservalidation"
import "../Styles/Login.css";

function RegSupplier()
{
    const history=useHistory()
    const [submitted,setSubmitted]=useState(false)
    const [user,setUser]=useState({
        "name":"",
        "city":"",
        "userid":"",
        "pwd":"",
        "cpwd":"",
        "phone":""
    })
    const [errors,setErrors]=useState({})
 
    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setErrors(uservalidation(user))   
        setSubmitted(true)     
    }

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            console.log(user)
            axios.post("http://localhost:8080/api/sellers",user)
            .then(resp=>{
                console.log(resp)
                alert("Seller registered successfully")
                history.push("/slogin")
            })
            .catch(error=>console.log("Error",error))            
        }
    },[errors])
    return (
        <div className="container">
            <div className="card shadow bg-transparent mt-3 text-black">
        <div className="card-body">
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <h4 className="text-center p-2">
                       <b>Seller Registration Form</b> 
                    </h4>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label"><b>Seller Name</b></label>
                        <div className="col-sm-8">
                            <input type="text" name="name" value={user.name} onChange={handleInput} className="form-control" />
                            {errors.name && <small className="text-danger float-right">{errors.name}</small>}
                        </div>                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label"><b>City</b></label>
                        <div className="col-sm-8">
                            <input type="text" name="city" value={user.city} onChange={handleInput} className="form-control" />
                            {errors.city && <small className="text-danger float-right">{errors.city}</small>}
                        </div>
                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label"><b>User Id</b></label>
                        <div className="col-sm-8">
                            <input type="text" name="userid" value={user.userid} onChange={handleInput} className="form-control" />
                            {errors.userid && <small className="text-danger float-right">{errors.userid}</small>}
                        </div>
                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label"><b>Phone</b></label>
                        <div className="col-sm-8">
                            <input type="text" maxLength="10" name="phone" value={user.phone} onChange={handleInput} className="form-control" />
                            {errors.phone && <small className="text-danger float-right">{errors.phone}</small>}
                        </div>
                        
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label"><b>Password</b></label>
                        <div className="col-sm-8">
                            <input type="password" name="pwd" value={user.pwd} onChange={handleInput} className="form-control" />
                            {errors.pwd && <small className="text-danger float-right">{errors.pwd}</small>}
                        </div>
                    </div>
                    <div className="form-group form-row">
                        <label className="col-sm-4 form-control-label"><b>Confirm Password</b></label>
                        <div className="col-sm-8">
                            <input type="password" name="cpwd" value={user.cpwd} onChange={handleInput} className="form-control" />
                            {errors.cpwd && <small className="text-danger float-right">{errors.cpwd}</small>}
                        </div>
                    </div>
                    <button className="btn btn-primary float-right">Register Now</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default RegSupplier;
