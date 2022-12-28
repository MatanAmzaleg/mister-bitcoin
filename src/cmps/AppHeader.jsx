import { NavLink, withRouter } from 'react-router-dom'


function _AppHeader(props) {

    console.log('props:', props)

    function onBack() {
        props.history.goBack()
    }

    return (
        <header className="app-header">
            <section className="container">
                <h1 className="logo">Contacts</h1>
                <section className='back'>
                    <button onClick={onBack}>Back</button>
                </section>
                <nav>
                    <NavLink exact to="/" >My profile</NavLink>
                    <NavLink to="/contacts" >Contacts</NavLink>
                    <NavLink to="/charts" >Statistics</NavLink>
                    <NavLink to="/transactions" >My transactions</NavLink>
                </nav>
            </section>
        </header>
    )
}


export const AppHeader = withRouter(_AppHeader)