import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {useHistory,useParams,useLocation} from "react-router-dom";
import Product from "./Product";
import queryString  from "query-string";
import TopSlider from "./TopSlider";

function AllProduct(){
    const [products,setProducts]=useState([])
    const [totalPage,setTotalPage]=useState(0)
    const state=useSelector((state)=>state);
    const location=useLocation()
    const [item,setItem]=useState({})
    const [qty,setQty]=useState(1)
    const dispatch=useDispatch()
    const history=useHistory()

    const [showDialog,setShowDialog]=useState("modal fade")
    const [display,setDisplay]=useState("none")
    
    const showModal=(prod)=>{
        setShowDialog("modal fade show")
        setDisplay("block")
        setItem(prod)
    }

    const checkItem =(prodid)=>{
        return state.cart.findIndex(x=>x.prodid===prodid)<0
    }

    const closeDialog=()=>{        
        setShowDialog("modal fade")
        setDisplay("none")
    }

    const loadDataFromServer=(page=0,pagesize=8)=>{
        axios.get("http://localhost:8080/api/products/paginated?page="+page+"&pagesize="+pagesize)
            .then(resp=>{
                console.log(resp.data.data.total)
                setProducts(resp.data.data.plist)
                setTotalPage(Math.ceil(resp.data.data.total/pagesize))
                console.log(products)
            })
    }

    useEffect(()=>{
        console.log("I am here cat",location.search)
        let pcat=queryString.parse(location.search)
        console.log(pcat.cat)
        if(pcat.cat!==undefined){
            axios.get("http://localhost:8080/api/products?cat="+pcat.cat)
            .then(resp=>{
                console.log(resp.data)
                setProducts(resp.data.data)
                console.log(products)
            })
        }
        else {
            loadDataFromServer()
        }
    },[location])
    const addToCart=item=>{  
        if(sessionStorage.getItem("userid")==null){
            alert("Please login first to buy product")
            history.push("/clogin")
        }
        else if(sessionStorage.getItem("role")!=="customer"){
            alert("Only customer can buy product")
        }      
        else{            
            if(checkItem(item.prodid))
            {     
                showModal() 
                setDisplay("none")
                setShowDialog("modal fade") 
                item.qty=qty         
                dispatch({type:'AddItem',payload:item})
                // eslint-disable-next-line no-undef
                swal({
                    title: "Thank You!",
                    text: "Item added to cart successfully"
                  });
                // eslint-disable-next-line no-undef
                // swal({
                //     title: "Item added to cart successfully",
                //     text: "Thank You!",
                //     icon: "success",
                //     button: "Ok!",
                //   });                
                //   alert("Item added to cart successfully")
            }
            else{                
                alert("Item already in cart")
            }
        }
    }


    const handlePageClick=({selected:selectedPage})=>{
        loadDataFromServer(selectedPage)
    }
    
    return (
        <>   
        <div className="container-fluid p-2 ">
        <TopSlider/>
        </div>              
        <div className="container-fluid" style={{width:"92% "}}>
            <div className="card shadow bg-transparent">
                <div className="card-body">
                <ReactPaginate 
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    containerClassName={"pagination"}
                    pageCount={totalPage}
                    onPageChange={handlePageClick}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"} />
                    <div className="row">
                    {products.map(x=>(
                        <Product key={x.prodid} x={x} showModal={showModal} />
                    ))}
                    </div>
                    
                </div>
            </div> 
            {display=="block"?( 
            <div className={showDialog} style={{zIndex:"1000",display:display,color:"black"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Add to Cart</h5>
                            <button onClick={closeDialog} className="close">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex">
                                <img src={"http://localhost:8080/"+item.photo} style={{width:"200px"}}/>
                                <div className="ml-3">
                                    <h4 className="p-2 text-warning">{item.pname}</h4>
                                    <h5 className="px-2">Brand: {item.brand}</h5>
                                    <h5 className="px-2">Category: {item.pcat}</h5>
                                    <h5 className="px-2">Seller: {item.sellerName}</h5>
                                    <h5 className="px-2">Price: &#8377; {item.price}</h5>
                                    <input type="number" value={qty} onChange={e=>setQty(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={e=>addToCart(item)} className="btn btn-warning btn-sm">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>) : ""}
        </div>
        </>
    )
}

export default AllProduct;