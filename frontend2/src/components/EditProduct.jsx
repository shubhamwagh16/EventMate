import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productvalidation from "./productvalidation";

function EditProduct(){
    console.log("Edit product page")
    const sellerid=sessionStorage.getItem("id")
    const {prodid}=useParams()
    const [product,setProduct]=useState({
        "prodid":prodid,
        "pname":"",
        "pcat":"",
        "subcat":"",
        "price":"",
        "brand":"",
        "sellerId":sellerid
    })
    
    
    const [errors,setErrors]=useState({})
    const [submitted,setSubmitted]=useState(false)
    const history=useHistory()

    const handleInput=e=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(productvalidation(product))    
        setSubmitted(true)
    }
    
    useEffect(()=>{        
        console.log(errors)

        axios.get("http://localhost:8080/api/products/"+prodid)
        .then(resp=>{
            console.log(resp.data.data)
            setProduct(resp.data.data)
        })
        
        if(Object.keys(errors).length===0 && submitted){            
            console.log(product)
            axios.put("http://localhost:8080/api/products/"+prodid,product)
            .then(resp=>{
                let result=resp.data.data;
                console.log(result) 
                alert("Product saved successfully")               
                history.push("/myproducts")
            })
            .catch(error=>{
                console.log("Error",error);
                alert("Error saving product")
            })            
        }
    },[errors])
    return (
        <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3">
                            <img width="300" src={"http://127.0.0.1:8887/"+product.photo} />
                        </div>
                        <div className="col-sm-9">
                            <h4 className="text-center p-2">
                                Edit Product Form (Product ID : )
                            </h4>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Product Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="pname" value={product.pname} onChange={handleInput} className="form-control" />
                                    {errors.pname && <small className="text-danger float-right">{errors.pname}</small>}
                                </div>
                                
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Category</label>
                                <div className="col-sm-8">
                                    <select name="pcat" value={product.pcat} onChange={handleInput} className="form-control">
                                        <option value="">Select Category</option>
                                        <option>TShirt</option>     
                                        <option>Jeans</option>     
                                        {/* <option>Laptops</option>     
                                        <option>Televisions</option>     
                                        <option>Washing Machines</option>     
                                        <option>Refrigrators</option>      */}
                                    </select>   
                                    {errors.pcat && <small className="text-danger float-right">{errors.pcat}</small>}                    
                                </div>                        
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Price</label>
                                <div className="col-sm-8">
                                    <input type="number" name="price" value={product.price} onChange={handleInput} className="form-control" />
                                    {errors.price && <small className="text-danger float-right">{errors.price}</small>}
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Brand</label>
                                <div className="col-sm-8">
                                    <input type="text" name="brand" value={product.brand} onChange={handleInput} className="form-control" />
                                    {errors.brand && <small className="text-danger float-right">{errors.brand}</small>}
                                </div>                                
                            </div>                           
                            
                            <button className="btn btn-primary float-right">Update Product</button>
                            </form>
                        </div>
                    </div>
                </div>
    )
}

export default EditProduct;
