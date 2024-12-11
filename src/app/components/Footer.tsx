import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 border-t border-gray-800 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-yellow-400">Coldplay Tix</h3>
                    <p className="text-gray-400">Your gateway to the Coldplay experience</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link href="/concerts" className="text-gray-400 hover:text-blue-300 transition-colors">Tours</Link></li>
                        <li><Link href="/news" className="text-gray-400 hover:text-green-300 transition-colors">News</Link></li>
                        <li><Link href="/song-list" className="text-gray-400 hover:text-pink-300 transition-colors">Music</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-green-300">Connect</h4>
                    <ul className="space-y-2">
                        <li><a href="https://twitter.com/coldplay" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a></li>
                        <li><a href="https://www.instagram.com/coldplay" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">Instagram</a></li>
                        <li><a href="https://www.facebook.com/coldplay" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">Facebook</a></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>&copy; 2023 Coldplay Tix. All rights reserved.</p>
            </div>
        </footer>
    )
}

