import "./home.scss"
import seo from "./seo.png"
import ppc from "./ppc.png"
import sm from "./sm.png"
import cretive from "./creative.png"
import em from "./em.png"
import monitor from "./monitor.png"
import gps from "./gp.png"
import email from "./ep.png"
import phone from "./pp.png"
import time from "./tp.png"
import fb from "./fp.png"
import linkedin from "./lp.png"
import insta from "./ip.png"
import yt from "./yp.png"
import Nav from "../nav/nav"
import { useState } from "react"
import { firestore } from "../../firebase"
import firebase from "firebase/compat/app"




function Home() {


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const [msgSent, setMsgSent] = useState(false)



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const submitMessage = (e) => {
        e.preventDefault();

        const docId = firestore.collection("contacts").doc().id;
        firestore.collection("contacts").doc(docId).set({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            mid: docId,
            sentAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsgSent(true)

        setFormData({
            name: "",
            email: "",
            phone: "",
            message: ""
        })





    }


    return (
        <div className="Home">
            <div className="introBox">
                <Nav />
                <div className="introDets">
                    <p className="brightspark">WELCOME TO BRIGHTSPARK</p>
                    <p className="tagline">THE SPARK THAT YOUR BRAND NEEDS</p>

                    <p className="desc">
                        Bright Spark is a cutting-edge digital marketing agency dedicated to transforming your online presence into a powerhouse of engagement and growth.
                    </p>

                    <a href="#services" className="servicesButton">Our Services</a>

                </div>
            </div>
            <div id="services" className="servicesMain">
                <div className="serviceBox">
                    <p className="heading">WHAT WE OFFER</p>
                    <p className="subHead">Where Strategy Meets BrightSpark. <br /> Your Success Story Begins with BrightSpark</p>
                    <div className="services">
                        <div className="service">
                            <img className="simg" src={seo} />
                            <p className="sname">Search Engine Optimisation</p>
                            <p className="sdesc">Boost your online visibility with our expert SEO services. We specialize in optimizing your website to rank higher on search engines, driving organic traffic and increasing your digital presence. </p>

                        </div>
                        <div className="service">
                            <img className="simg" src={ppc} />
                            <p className="sname">Pay Per Click</p>
                            <p className="sdesc">Unlock instant traffic and boost conversions with our pay-per-click (PPC) services. We create and manage targeted PPC campaigns that deliver immediate results, ensuring your ads reach potential customers effectively.</p>

                        </div>

                        <div className="service">
                            <img className="simg" src={sm} />
                            <p className="sname">Social Media Management</p>
                            <p className="sdesc">Enhance your brand's online presence with our comprehensive social media management services. We create engaging content, manage your profiles, and interact with your audience to build a loyal community. Let us help you drive engagement and grow your social media influence!</p>

                        </div>
                        <div className="service">
                            <img className="simg" src={cretive} />
                            <p className="sname">Content Creation</p>
                            <p className="sdesc">Bright Spark is a cutting-edge digital marketing agency dedicated to transforming your online presence into a powerhouse of engagement and growth.</p>

                        </div>
                        <div className="service">
                            <img className="simg" src={em} />
                            <p className="sname">Email Marketing</p>
                            <p className="sdesc">Bright Spark is a cutting-edge digital marketing agency dedicated to transforming your online presence into a powerhouse of engagement and growth.</p>

                        </div>
                        <div className="service">
                            <img className="simg" src={monitor} />
                            <p className="sname">Analytics and Reporting</p>
                            <p className="sdesc">Bright Spark is a cutting-edge digital marketing agency dedicated to transforming your online presence into a powerhouse of engagement and growth.</p>

                        </div>
                    </div>
                </div>
            </div>

            <div id="contact" className="contact">
                <div className="serviceBox">
                    <p className="heading ch">CONTACT US</p>
                    <p className="subHead">Start the conversation to establish <br /> good relationship and business.</p>
                    <div className="contactBox">
                        <div className="contactLeft">
                            <p className="heading tl ch">Get in touch</p>
                            <p className="head-sub">
                                Seamless Communication, Global Impact.
                            </p>
                            <div className="contactMeds">
                                <div className="contactMed">
                                    <div className="contactMedLeft">
                                        <img className="cimg" src={gps} />
                                    </div>
                                    <div className="contactMedRight">
                                        <p className="medHead">HEAD OFFICE</p>
                                        <div className="medDets">
                                            <p className="medDetText">
                                                Kunwar Singh Nagar, Nangloi, New Delhi - 110041
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="contactMed">
                                    <div className="contactMedLeft">
                                        <img className="cimg" src={email} />
                                    </div>
                                    <div className="contactMedRight">
                                        <p className="medHead">EMAIL SUPPORT</p>
                                        <div className="medDets">
                                            <p className="medDetText">
                                                support@brightspark.com
                                                <br />
                                                hello@brightspark.com
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="contactMed">
                                    <div className="contactMedLeft">
                                        <img className="cimg" src={phone} />
                                    </div>
                                    <div className="contactMedRight">
                                        <p className="medHead">LET'S TALK</p>
                                        <div className="medDets">
                                            <p className="medDetText">
                                                Phone : +91 0123456789<br />
                                                Fax : +91 0123456789
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="contactMed">
                                    <div className="contactMedLeft">
                                        <img className="cimg" src={time} />
                                    </div>
                                    <div className="contactMedRight">
                                        <p className="medHead">WORKING HOURS</p>
                                        <div className="medDets">
                                            <p className="medDetText">
                                                Monday - Friday
                                                <br />
                                                09am - 06pm
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="socialsBox">
                                <p className="heading tl ch">Follow us on social media!!</p>

                                <div className="socials">
                                    <img className="social" src={insta} />
                                    <img className="social" src={fb} />
                                    <img className="social" src={yt} />
                                    <img className="social" src={linkedin} />
                                </div>
                            </div>

                        </div>
                        <div className="contactRight">
                            {
                                msgSent ? (
                                    <div className="msgSent">
                                        <p className="sentText">Message sent successfully</p>
                                        <button onClick={() => { setMsgSent(false) }} className="closeMsg" >Close</button>
                                    </div>
                                )
                                    : (
                                        <form onSubmit={submitMessage} className="contact-form">
                                            <p className="heading tl ch mb3 ch">Send us a message</p>
                                            <input name="name" type="text" placeholder="Full name" value={formData.name} onChange={handleInputChange} className="contactInp" />
                                            <input name="email" type="text" placeholder="Email address" value={formData.email} onChange={handleInputChange} className="contactInp" />
                                            <input name="phone" type="number" placeholder="Phone number" value={formData.phone} onChange={handleInputChange} className="contactInp no-arrows" />
                                            <textarea name="message" className="contactText" value={formData.message} onChange={handleInputChange} placeholder="Write message here" />
                                            <input type="submit" className="subForm" value="Send message" />
                                        </form>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;