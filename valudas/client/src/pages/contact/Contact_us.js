import React from 'react'
import "../../assets/css/Contact_us.css"
import Navbar from "../../layout/Navbar"
import Footer from "../../layout/Footer"



const Contact_us = () => {
  return (
    <>
    <Navbar/>
<div class="contact-container">
    <div class="contact-header">
        <h1>Contact</h1>
        <p>If you have any questions/concerns about our Shipping policy, please feel free to contact our Customer Support department.</p>
    </div> 
    <div class="contact-main">
        <div class="form-top">
            <h3 id="lets-talk">Let's Talk</h3>
            <span>We would be happy to hear from you, Please fill in the form below or mail us your requirements to</span>
        </div>
        <div class="contact">
            <form >
                <div class="form-group">
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="email" placeholder="Email"/>
                </div>
                <div class="single-input">
                    <input type="number" name="number" placeholder="Phone number"/>
                </div>
                <div class="textarea-input">
                    <textarea type="text" name="comment" placeholder="Comment" id='comment'/>
                </div>
                <button className='contact-submit'>Submit</button>
            </form>
        </div>
    </div>  
</div>
<Footer/>

    </>
  )
}

export default Contact_us