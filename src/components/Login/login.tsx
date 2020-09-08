import React from "react"
import book from "../Home/img/book.png"
const Login = () => {
    return (
        <div>
            <form className="form-signin" action={"/login"}>
                <div className="text-center mb-4">
                    <img className="mb-4" src={book} alt="" width="72"
                         height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                </div>

                <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                    <label htmlFor="inputEmail">Email address</label>
                </div>

                <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                    <label htmlFor="inputPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <a href={"/signup"} className="btn btn-sm btn-secondary btn-block" type="submit">Create Account</a>
                <p className="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
            </form>
        </div>
    )
}
export default Login