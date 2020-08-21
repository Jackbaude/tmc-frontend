import React, {useState} from "react"
import Cookies from 'universal-cookie';

const ThemeToggle = () => {
    const cookies = new Cookies();

    const [themeState, setThemeState] = useState((cookies.get('theme')))
    const toggleTheme = () => {

        const theme = themeState === 'light' ? 'dark' : 'light';
        cookies.set('theme', theme, { path: '/' });
        setThemeState(theme)
        document.documentElement.setAttribute("data-theme", theme);
    }
    return (
        <div>
            <label className="switch">
                <input type="checkbox" onClick={toggleTheme}/>
                <span className="slider round"/>
            </label>
        </div>
    )
}
export default ThemeToggle