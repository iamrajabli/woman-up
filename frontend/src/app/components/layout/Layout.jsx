import Header from './header/Header'
import Footer from './footer/Footer'


const Layout = ({ children }) => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main className='bg-primaryBg'>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>

    );
};

export default Layout;