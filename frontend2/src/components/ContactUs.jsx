import React, { Component } from 'react';

class ContactUs extends Component {
    render() {
        return (
            <div className="text-left mt-5 mb-5 ml-5 mr-5 px-5 ">
                <div>
                    <h1> Contact Us </h1>
                    <div className="mb-3" >
                        <label htmlFor="exampleFormControlInput1" className="form-label">Your Email Address</label>
                        <input type="email" 
                        style={{width: '25%'}} className="form-control" id="exampleFormControlInput1" placeholder="type your email here" />
                     </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Valuable Thoughts</label>
                        <textarea style={{width: '25%'}} className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                    </div>
                    <div>
                        <button type="button" className="btn-warning btn-lg "><a href="/">Submit</a></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactUs;