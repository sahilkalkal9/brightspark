import Nav from "../nav/nav";
import "./login.scss";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        invalidCredentials: false,
        manyAttempts: false,
        userNotFound: false,
    });

    useEffect(() => {
        if (auth.currentUser) {
            navigate("/profile");
        }
    });

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (error.invalidCredentials || error.manyAttempts) {
            alert("Cannot sign in due to some errors. Please fix them first");
            return;
        }

        try {
            const signInButton = document.getElementById("signInButton");
            if (signInButton) {
                signInButton.innerHTML = "Signing In..";
            }

            await auth.signInWithEmailAndPassword(email, password);
            navigate("/profile");
        } catch (err) {
            const newError = {
                invalidCredentials: false,
                manyAttempts: false,
                userNotFound: false,
            };

            if (err.code === "auth/user-not-found") {
                newError.userNotFound = true;
            } else if (err.code === "auth/wrong-password") {
                newError.invalidCredentials = true;
            } else if (err.code === "auth/too-many-requests") {
                newError.manyAttempts = true;
            }

            setError(newError);
        } finally {
            const signInButton = document.getElementById("signInButton");
            if (signInButton) {
                signInButton.innerHTML = "Log In";
            }
        }
    };

    const handleChange = (e, setFunc, errorKey) => {
        setFunc(e.target.value);
        setError((prevError) => ({ ...prevError, [errorKey]: false }));
    };

    const handleKeyDown = (e, errorKey) => {
        if (e.key === "Backspace") {
            setError((prevError) => ({ ...prevError, [errorKey]: false }));
        }
    };

    return (
        <div className="Login">
            <Nav />
            <div className="login-box">
                <form onSubmit={handleSignIn} className="login-form">
                    <p className="heading tl mb3 lht">Log in to your account</p>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        autoComplete="off"
                        onKeyDown={(e) => handleKeyDown(e, "invalidCredentials")}
                        onChange={(e) => handleChange(e, setEmail, "invalidCredentials")}
                        className="contactInp lip"
                    />
                    {error.userNotFound && (
                        <p id="noUser" className="incorrect-chatpass">
                            User not found
                        </p>
                    )}
                    <input
                        type="password"
                        value={password}
                        autoComplete="off"
                        onKeyDown={(e) => handleKeyDown(e, "invalidCredentials")}
                        onChange={(e) => handleChange(e, setPassword, "invalidCredentials")}
                        placeholder="Password"
                        className="contactInp lip"
                    />
                    {error.invalidCredentials && (
                        <p id="invalidCred" className="incorrect-chatpass">
                            Invalid credentials
                        </p>
                    )}
                    {error.manyAttempts && (
                        <p id="manyAttempts" className="incorrect-chatpass">
                            Too many attempts. Try after some time or change your password.
                        </p>
                    )}
                    <input
                        type="submit"
                        id="signInButton"
                        className="subForm lsb"
                        value="Log In"
                    />
                    <div className="createBox">
                        <p className="register">New member ?</p>
                        <Link to="/signup">
                            <p className="register cp">Register</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
