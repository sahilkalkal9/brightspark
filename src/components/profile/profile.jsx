import Nav from "../nav/nav"
import "./profile.scss"
import { auth, firestore } from "../../firebase"
import { Link, useNavigate } from "react-router-dom"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useEffect } from "react"
import firebase from "firebase/compat/app"
import { format } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore"

function Profile() {

    const usersRef = firestore.collection("users")
    const [users] = useCollectionData(usersRef)

    const contactsRef = firestore.collection("contacts").orderBy("sentAt", "desc")
    const [contacts] = useCollectionData(contactsRef)

    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.currentUser) {
            navigate("/login")
        }

    })


    const handleDelete = async (docIds) => {

        await firestore.collection("contacts").doc(docIds).delete()


    };


    return (
        <div className="Login">
            <Nav />
            <div className="profile-box">
                <div className="logOutBox">
                    <button onClick={() => { navigate("/login"); auth.signOut(); }} className="logOut">Log Out</button>
                </div>
                <div className="welcomeBox">
                    {
                        users && users.map((u) => (
                            auth.currentUser?.uid === u.uid
                                ? <p className="welcomeText">Welcome {u.name},</p>
                                : null
                        ))
                    }
                </div>
                {
                    users && users.map((u) => (
                        auth.currentUser?.uid === u.uid
                            ? (
                                u.role === "user"
                                    ? (
                                        <p style={{ textAlign: "center" }} >
                                            This is your profile page. Currently there is nothing much for you.
                                            <br />
                                            We are working on it.
                                        </p>
                                    )
                                    : (
                                        u.role === "admin"
                                            ? (
                                                <div className="contact-list-box">
                                                    {
                                                        contacts != 0 ? <p style={{ textAlign: "center" }} >
                                                            Here is the list of contact form submissions.
                                                        </p> : null
                                                    }
                                                    <div className="contacts">
                                                        {
                                                            contacts === 0
                                                                ?
                                                                <p className="noCont">No contact submissions</p>
                                                                : (
                                                                    contacts && contacts.map((c) => (

                                                                        <div className="contactP">
                                                                            <div className="chead">
                                                                                <p onClick={() => { handleDelete(c.mid) }} className="delete">Delete</p>
                                                                            </div>
                                                                            <div className="clower">
                                                                                <p className="ctext">
                                                                                    <span className="ctextHead">Date : </span>{format(c.sentAt.toDate(), "PPpp")}
                                                                                </p>
                                                                                <p className="ctext">
                                                                                    <span className="ctextHead">Name : </span>{c.name}
                                                                                </p>
                                                                                <p className="ctext">
                                                                                    <span className="ctextHead">Phone : </span>{c.phone}
                                                                                </p>
                                                                                <p className="ctext">
                                                                                    <span className="ctextHead">Email : </span>{c.email}
                                                                                </p>
                                                                                <p className="ctext">
                                                                                    <span className="ctextHead">Message : </span>{c.message}
                                                                                </p>


                                                                            </div>
                                                                        </div>

                                                                    ))
                                                                )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                            : null
                                    )
                            )
                            : null
                    ))
                }
            </div>
        </div>
    )
}

export default Profile