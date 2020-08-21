import React, {memo, useEffect, useState} from "react"
import Cookies from 'universal-cookie';

const ThemeToggle = () => {
    const cookies = new Cookies();
    const [themeState, setThemeState] = useState(localStorage.getItem('mode'))
    const toggleTheme = () => {
        const theme = localStorage.getItem('mode') === 'dark' ? 'light' : 'dark';
        setThemeState(theme)
        localStorage.setItem('mode', theme);
    }
    document.documentElement.setAttribute("data-theme", localStorage.getItem('mode'));

    return (
        <div>
            <label className="switch">
                <input type="checkbox" onClick={toggleTheme} defaultChecked={((localStorage.getItem('mode')) === "dark")}/>
                <span className="slider round"/>
            </label>
        </div>
    )
}
export default memo(ThemeToggle)
