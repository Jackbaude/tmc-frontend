import React, {useState} from "react"
import book from "../Home/img/book.png"
const Signup = () => {
    const [password, setPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")
    const passwordMatch = () => {
        if (password !== secondPassword) {
            return <div className="alert alert-danger" role="alert">Passwords do not match.</div>
        }
    }
    return (
        <div>
            <form className="form-signin" action={"/"} method={"post"}>
                <div className="text-center mb-4">
                    <img className="mb-4" src={book} alt="" width="72"
                         height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Signup</h1>
                </div>
                <div className="form-label-group">
                    <input type="username" id="inputUserName" className="form-control" placeholder="Username" required autoFocus/>
                    <label htmlFor="inputUserName">Username</label>
                </div>
                <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                    <label htmlFor="inputEmail">Email address</label>
                </div>

                <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" onChange={event => setPassword(event.target.value)} placeholder="Password" required/>
                    <label htmlFor="inputPassword">Password</label>
                </div>
                <div className="form-label-group">
                    <input type="password" id="inputRepeatPassword" className="form-control" onChange={event => setSecondPassword(event.target.value)} placeholder="Repeat Passowrd" required/>
                    <label htmlFor="inputRepeatPassword">Retype Password</label>
                </div>
                <input type="hidden" id="op" name="op" value="0"/>
                {passwordMatch()}
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Create Account</button>
                <a href={"/login"} className="btn btn-sm btn-secondary btn-block" type="submit">Sign in</a>
                <p className="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
            </form>
        </div>
    )
}
export default Signup
