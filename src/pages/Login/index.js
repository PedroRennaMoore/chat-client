import React, { useContext, useState } from "react";
import "./index.css"
import { AuthContext } from "../../contexts/auth";

const Login = () => {
    const {login, loginError, loginLoading} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async(e) => {
        e.preventDefault()
        await login(email, password)
    }

    return(
        <div className="login">
            <div className="login_container">
                <form>
                    <h3>Login</h3>
                    <div className="input_login_email">
                        <label htmlFor="login_email">Email</label>
                        <input type="email" required={true} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="&#128231; Type your email" />
                    </div>
                    <div className="input_login_password">
                        <label htmlFor="login_password">Password</label>
                        <input type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="&#128274; Type your password"/>
                        <p><a href="https://teste">Forgot your password?</a></p>
                    </div>
                    <button onClick={handleLogin}>{loginLoading ? <span>loading</span> : <span>Login</span>}</button>
                    <div className="new_register">
                        <p>Doesn't have an account? <a href="/register">Register Here</a></p>
                    </div>
                    <div className="login_erros">
                        {loginError && 
                        <p>{loginError}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login