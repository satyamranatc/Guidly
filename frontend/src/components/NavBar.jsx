import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserData'


export default function NavBar() {
  let {token} = useContext(UserContext)
  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo Section */}
        <div id="LogoSection" className="text-white">
          <h2 className="text-2xl font-bold tracking-wide">
            <Link to="/" className="hover:text-yellow-300 transition">
              The Guidly
            </Link>
          </h2>
          <p className="text-sm text-indigo-100">
            Find your next adventure
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6 text-white font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/roadmap"
              className="hover:text-yellow-300 transition duration-200"
            >
              Roadmap
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className="hover:text-yellow-300 transition duration-200"
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className="hover:text-yellow-300 transition duration-200"
            >
              Jobs
            </Link>
          </li>
          {
            token.access_token == null ?
            <li>
              <Link
                to="/auth"
                className="hover:text-yellow-300 transition duration-200"
              >
                Auth
              </Link>
            </li>
            :
            <li>
              <Link
                to="/profile"
                className="hover:text-yellow-300 transition duration-200"
              >
                Profile
              </Link>
            </li>
          }
        </ul>

      </div>
    </nav>
  )
}
