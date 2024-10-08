import "./Header.scss"

const Header = ()=>{
    return (
    <div className="header-container">
        <header>
            <h2>Sciąga</h2>
            <div className="links">
                <a href="/listaSciag">Lista ściąg</a>
                <a href="/">Dodaj ściągę</a>
            </div>
        </header>
    </div>
        
    )
}

export default Header