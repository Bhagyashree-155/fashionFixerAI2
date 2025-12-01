import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="flex-grow flex flex-col items-center justify-center px-4 py-20 text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Ready to Transform Your Style?
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl">
                    Join thousands of fashion enthusiasts who have discovered their perfect style with FashionFixer.
                </p>
                <Link
                    href="/style-quiz"
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-semibold transition-colors text-lg"
                >
                    Get Started for Free
                </Link>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-dark-card/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-dark-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <span className="text-2xl">✨</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">AI Style Suggestions</h3>
                        <p className="text-gray-400 mb-6">
                            Upload your photos or enter preferences and our AI will recommend personalized outfits.
                        </p>
                        <Link href="/style-suggestions" className="text-primary hover:text-primary-hover font-medium">
                            Try it now &rarr;
                        </Link>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-dark-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <span className="text-2xl">👗</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Virtual Try-On</h3>
                        <p className="text-gray-400 mb-6">
                            See how outfits look on you with our AI-powered virtual try-on technology.
                        </p>
                        <Link href="/virtual-try-on" className="text-primary hover:text-primary-hover font-medium">
                            Try it now &rarr;
                        </Link>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-dark-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <span className="text-2xl">🤝</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Social Sharing</h3>
                        <p className="text-gray-400 mb-6">
                            Share your favorite looks with friends and get feedback from the community.
                        </p>
                        <Link href="/shop" className="text-primary hover:text-primary-hover font-medium">
                            Learn more &rarr;
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
