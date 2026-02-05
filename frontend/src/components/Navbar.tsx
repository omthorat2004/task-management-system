import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <nav className="fixed top-0 w-full z-50 bg-header-bg backdrop-blur-sm border-b border-border">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Product Name */}
                <div className="text-xl flex gap-2 font-bold text-foreground">

                    <Link to={'/'}   className="no-underline text-accent hover:text-accent-hover hover:!no-underline decoration-0" >TaskFlow</Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={()=>navigate('/login')} className="nav-btn">
                        Login
                    </button>
                    <button onClick={()=>navigate('/signup')}  className="nav-btn">
                        Signup
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-header-bg border-t border-border">
                    <button onClick={()=>navigate('/signup')} className="nav-btn w-full">
                        Login
                    </button>
                    <button onClick={()=>navigate('/signup')} className="nav-btn w-full">
                        Signup
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
