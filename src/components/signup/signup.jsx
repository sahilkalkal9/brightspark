import Nav from "../nav/nav"
import firebase from "firebase/compat/app"
import "./signup.scss"
import { auth, firestore } from "../../firebase"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuthState } from 'react-firebase-hooks/auth';



function Signup() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userRef = firestore.collection("users");
    const [users] = useCollectionData(userRef);

    const [name, setName] = useState('')


    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser) {
            navigate('/profile');
        }
    })

    const [hasCapitalLetter, setHasCapitalLetter] = useState(false);
    const [hasWhitespace, setHasWhitespace] = useState(false);
    const [hasTwoDots, setHasTwoDots] = useState(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
    const [usernameExist, setUsernameExist] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPass, setInvalidPass] = useState(false)
    var create = 0;



    const handleSignup = async (e) => {
        e.preventDefault();

        if (usernameExist || emailExist || hasCapitalLetter || invalidEmail || hasTwoDots || hasWhitespace || hasSpecialCharacter || invalidPass) {
            alert('Cannot submit form due to error. Please fix them first');
            return;
        }

        try {

            users && users.map((ut) => (
                username == ut.username
                    ? create = 1
                    : console.log()
            ))
            if (create == 0) {
                // if (!allowedDomains.includes(emailDomain)) {
                //     setInvalidEmail(true)
                //     document.getElementById("invalidEmail").style.display = "block";
                // } else {

                document.getElementById("signupButton").innerHTML = "Signing Up.."

                await auth.createUserWithEmailAndPassword(email, password);

                await firestore.collection("users").doc(auth.currentUser.uid).set({
                    username: username,
                    name: name,
                    uid: auth.currentUser.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    email: email,
                    role: "user"
                })

                // Reset form and show success message
                setUsername('')
                setName('')
                setEmail('');
                setPassword('');
            }
            // Create user with email and password

            // }
            else {
                setUsernameExist(true)
                document.getElementById("usernameExist").style.display = "block";
            }



        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setEmailExist(true)
                document.getElementById("emailExist").style.display = "block";
            }
            else if (error.code === "auth/weak-password") {
                setInvalidPass(true)
                document.getElementById("invalidPass").style.display = "block";
            }

            else if (error.code === "auth/invalid-email") {
                setInvalidEmail(true)
                document.getElementById("invalidEmail").style.display = "block";
            }



            console.log(error)
        }
    };

    const usernameChange = (e) => {
        const inputValue = e.target.value
        setUsername(inputValue)

        const hasCapitalLetterr = /[A-Z]/.test(inputValue);
        const hasWhitespacee = /\s/.test(inputValue);
        const hasTwoDotss = /\.{2}/.test(inputValue);
        const hasSpecialCharacterr = /[^.\w\s_]/.test(inputValue);

        if (hasSpecialCharacterr) {
            setHasSpecialCharacter(true);
            document.getElementById("otherThanUnderscore").style.display = "block";
        } else if (hasCapitalLetterr) {
            setHasCapitalLetter(true);
            document.getElementById("capitalUsername").style.display = "block";
        } else if (hasWhitespacee) {
            setHasWhitespace(true);
            document.getElementById("whitespaceFound").style.display = "block";
        } else if (hasTwoDotss) {
            setHasTwoDots(true);
            document.getElementById("twoDots").style.display = "block";
        } else if (create == 1) {
            setUsernameExist(true)
            document.getElementById("usernameExist").style.display = "block";

        }
        else if (inputValue == "") {
            setUsernameExist(false)
            setHasCapitalLetter(false)
            setHasSpecialCharacter(false)
            setHasWhitespace(false)
            setHasTwoDots(false)
        }

        else {
            document.getElementById("capitalUsername").style.display = "none"
            document.getElementById("twoDots").style.display = "none"
            document.getElementById("whitespaceFound").style.display = "none"
            document.getElementById("otherThanUnderscore").style.display = "none"
            document.getElementById("usernameExist").style.display = "none";

            setUsernameExist(false)
            setHasCapitalLetter(false)
            setHasSpecialCharacter(false)
            setHasWhitespace(false)
            setHasTwoDots(false)
        }
    }

    const handleBackspaceUsername = (event) => {
        if (event.key === 'Backspace') {
            document.getElementById("capitalUsername").style.display = "none"
            document.getElementById("usernameExist").style.display = "none";
            document.getElementById("twoDots").style.display = "none"
            document.getElementById("whitespaceFound").style.display = "none"
            document.getElementById("otherThanUnderscore").style.display = "none"
        }
    };

    const emailChange = (e) => {
        const emailValue = e.target.value
        setEmail(emailValue)
        if (emailExist) {
            document.getElementById("emailExist").style.display = "block";
        } else if (emailValue == "") {
            setEmailExist(false)
            setInvalidEmail(false)
        } else if (invalidEmail) {
            document.getElementById("invalidEmail").style.display = "block";
        }
        else {
            setEmailExist(false)
            setInvalidEmail(false)
            document.getElementById("emailExist").style.display = "none";
            document.getElementById("invalidEmail").style.display = "none";
        }
        setEmailExist(false)
        setInvalidEmail(false)
        document.getElementById("emailExist").style.display = "none";
        document.getElementById("invalidEmail").style.display = "none";
    }

    const handleBackspaceEmail = (event) => {
        if (event.key === 'Backspace') {
            setEmailExist(false)
            setInvalidEmail(false)
            document.getElementById("emailExist").style.display = "none";
            document.getElementById("invalidEmail").style.display = "none";
        }
    };

    const passChange = (e) => {
        const passValue = e.target.value
        setPassword(passValue)
        if (invalidPass) {
            document.getElementById("invalidPass").style.display = "block";
        } else if (passValue == "") {

            setInvalidPass(false)
        }
        else {
            setInvalidPass(false)
            document.getElementById("invalidPass").style.display = "none";
        }
        setInvalidPass(false)
        document.getElementById("invalidPass").style.display = "none";
    }

    const handleBackspacePass = (event) => {
        if (event.key === 'Backspace') {
            setInvalidPass(false)
            document.getElementById("invalidPass").style.display = "none";
        }
    };



    return (
        <div className="Login">
            <Nav />
            <div className="login-box">
                <form onSubmit={handleSignup} className="login-form">
                    <p className="heading tl mb3 lht">Create account</p>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} className="contactInp lip" />
                    <input type="text" placeholder="Username" onKeyDown={handleBackspaceUsername} value={username} onChange={usernameChange} className="contactInp lip" />

                    <p id="capitalUsername" className="incorrect-chatpass" >You cannot use capital letters</p>
                    <p id="otherThanUnderscore" className="incorrect-chatpass" >You cannot use special characters other than underscore</p>
                    <p id="twoDots" className="incorrect-chatpass" >You cannot use two dots in a row</p>
                    <p id="whitespaceFound" className="incorrect-chatpass" >You cannot use whitespace</p>
                    <p id="usernameExist" className="incorrect-chatpass" >Username already exist</p>

                    <input type="email" placeholder="Email" onKeyDown={handleBackspaceEmail} value={email} onChange={emailChange} className="contactInp lip" />

                    <p id="emailExist" className="incorrect-chatpass" >E-mail already in use</p>
                    <p id="invalidEmail" className="incorrect-chatpass" >Invalid e-mail</p>

                    <input type="password" onKeyDown={handleBackspacePass} placeholder="Password" value={password} onChange={passChange} className="contactInp lip" />
                    <p id="invalidPass" className="incorrect-chatpass" >Password must be of atleast 6 characters</p>
                    <input type="submit" className="subForm lsb" id="signupButton" value="Register" disabled={usernameExist || emailExist || hasCapitalLetter || invalidEmail || hasTwoDots || hasWhitespace || hasSpecialCharacter || invalidPass} />

                    <div className="createBox">
                        <p className="register">Already a member ?</p>
                        <Link to='/login'>
                            <p className="register cp">Log In</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup