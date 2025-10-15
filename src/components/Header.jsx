import '../styles/header.css'

function Header() {
    return (
        <>
            <header>
                <div className='d-flex p-2 gap-3'>
                    <img src="/logo192.png" className='my-auto' alt='minha imagem' />
                    <h1 className='fs-4 my-auto'>SpaceTask</h1>
                </div>
                <a href='#' className='nav-link underline-anim fs-5 mx-5'>Inicio</a>
            </header>
        </>
    )
}

export default Header;