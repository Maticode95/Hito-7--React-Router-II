
import React from "react";
import "./Header.css";

const Header = () => {
	return (
		<header className="app-header">
			<div className="container header-inner">
				<div className="brand">
					{/* Placeholder logo local en public/images/logo.svg */}
					<img src="/images/logo.svg" alt="Logo" className="logo" />
					<h1 className="brand-title">La Pizzería</h1>
				</div>

				<nav className="nav-links">
					<a href="#" className="nav-link">
						Inicio
					</a>
					<a href="#" className="nav-link">
						Menú
					</a>
					<a href="#" className="nav-link">
						Contacto
					</a>
				</nav>
			</div>
		</header>
	);
};

export default Header;
