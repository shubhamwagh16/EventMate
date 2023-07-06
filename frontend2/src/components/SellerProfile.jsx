import axios from "axios"
import { useEffect, useState } from "react"

function SellerProfile(){
    const id=sessionStorage.getItem("id")
    const [user,setUser]=useState({
        "id":sessionStorage.getItem("id"),
        "name":"",
        "city":"",
        "userid":"",
        "pwd":"",
        "phone":""
    })

    useEffect(()=>{
        axios.get("http://localhost:8080/api/sellers/"+id)
        .then(resp=>{
            console.log(resp.data.data)
            setUser(resp.data.data)
        })
    },[])
    return (
        
        <div className="container">
            <div className="card shadow m-3 p-2 bg-info text-light text-center">
                <h4 className="p-2" style={{borderBottom:"2px solid black",width:"300px",margin:"auto"}}>Seller Profile Page</h4>
                <br/>
                <h4>Welcome {user.name}</h4>
                <h5>City : {user.city}</h5>
                <h5>User Id : {user.userid}</h5>
                <h5>Contact No : {user.phone}</h5>
            </div>
        </div>
    )
}

export default SellerProfile;
