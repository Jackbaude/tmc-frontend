import React from "react"
import Nav from "./nav";
import Footer from "./footer";
import PropTypes from "prop-types"

const Layout = ({children}) => {
    return (
        <>
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 1200,
                    padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <Nav/>
            </div>
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 1100,
                    padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <main id="main">{children}</main>
                <Footer/>
            </div>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
