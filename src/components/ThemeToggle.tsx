import React, {memo, useState} from "react"
import Cookies from 'universal-cookie';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const ThemeToggle = () => {
    const [themeState, setThemeState] = useState(localStorage.getItem('mode'))
    const toggleTheme = () => {
        const theme = localStorage.getItem('mode') === 'dark' ? 'light' : 'dark';
        setThemeState(theme)
        localStorage.setItem('mode', theme);
    }
    document.documentElement.setAttribute("data-theme", localStorage.getItem('mode'));

    return (
        <div>
            <label className="theme-toggle-switch">
                <input type="checkbox" onClick={toggleTheme} className={"theme-toggle"}
                       defaultChecked={((localStorage.getItem('mode')) === "dark")}/>
                {/*If the checkbox is checked, dark, render the moon, else render the sun if it is in light mode*/}
                {((localStorage.getItem('mode')) === "dark")
                    ? <FontAwesomeIcon icon={faMoon}/>
                    : <FontAwesomeIcon icon={faSun}/>
                }
                <span className="slider round"/>
            </label>
            <div>

            </div>
        </div>
    )
}
export default memo(ThemeToggle)
