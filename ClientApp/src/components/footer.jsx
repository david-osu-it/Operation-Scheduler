import React from 'react';

const Footer = () => {
    let year = new Date().getFullYear();
    return (
        <footer className="footer mt-auto py-3 bg-dark text-right">
            <div className="container ">
                <span className="text-muted" id="footer">&copy; {year} David Hernandez</span>
            </div>
        </footer>
    );
}

export default Footer;