import Link from 'next/link';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark-card text-gray-400 py-12 mt-auto border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold flex items-center gap-2">
                            <span className="text-primary">✨</span> FashionFixer
                        </h3>
                        <p className="text-sm">
                            AI-powered fashion styling and recommendations for everyone.
                        </p>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Features</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/style-suggestions" className="hover:text-primary transition-colors">Style Suggestions</Link></li>
                            <li><Link href="/virtual-try-on" className="hover:text-primary transition-colors">Virtual Try-On</Link></li>
                            <li><Link href="/style-quiz" className="hover:text-primary transition-colors">Style Quiz</Link></li>
                            <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><FaTwitter /> Twitter</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><FaInstagram /> Instagram</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><FaFacebook /> Facebook</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><FaLinkedin /> LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
                    <p>&copy; 2025 FashionFixer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
