import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FastAPIClient from '../../client'
import config from 'config'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import * as moment from 'moment'

const client = new FastAPIClient(config)

function DashboardHeader() {
	const navigate = useNavigate()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	// STATE WHICH WE WILL USE TO TOGGLE THE MENU ON HAMBURGER BUTTON PRESS
	const [toggleMenu, setToggleMenu] = useState(false)

	useEffect(() => {
		const tokenString = localStorage.getItem('token')
		if (tokenString) {
			const token = JSON.parse(tokenString)
			const decodedAccessToken = jwtDecode<JwtPayload>(token.access_token)
			if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
				setIsLoggedIn(true)
			}
		}
	}, [])

	const handleLogout = () => {
		client.logout()
		setIsLoggedIn(false)
		navigate('/')
	}

	const handleLogin = () => {
		navigate('/login')
	}

	let displayButton
	const buttonStyle =
		'inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0'

	if (isLoggedIn) {
		displayButton = (
			<button className={buttonStyle} onClick={() => handleLogout()}>
				Logout
			</button>
		)
	} else {
		displayButton = (
			<button className={buttonStyle} onClick={() => handleLogin()}>
				Login
			</button>
		)
	}

	return (
		<nav className="flex flex-wrap justify-between items-center p-6 bg-teal-500">
			<div className="flex shrink-0 items-center mr-6 text-white">
				<a href={'/'}>
					<svg
						className="mr-2 w-8 h-8 fill-current"
						width="54"
						height="54"
						viewBox="0 0 54 54"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
					</svg>
				</a>
				<span className="text-xl font-semibold tracking-tight">
					Read With Me
				</span>
			</div>
			<div className="block lg:hidden">
				<button
					className="flex items-center py-2 px-3 text-teal-200 hover:text-white rounded border border-teal-400 hover:border-white"
					onClick={() => setToggleMenu(!toggleMenu)}
				>
					<svg
						className="w-3 h-3 fill-current"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div
				className={`animate-fade-in-down w-full ${
					toggleMenu ? 'block' : 'hidden'
				} flex-grow lg:flex lg:items-center lg:w-auto`}
			>
				<div className="text-sm lg:grow">
					<a
						href={'https://fastapi-recipe-app.herokuapp.com/docs'}
						target={'_blank'}
						rel={'noreferrer'}
						className="block mx-4 mt-4 text-teal-200 hover:text-white lg:inline-block lg:mt-0"
					>
						API Docs
					</a>
					<Link
						to="/my-recipes"
						className="block mx-4 mt-4 text-teal-200 hover:text-white lg:inline-block lg:mt-0"
					>
						My Recipes
					</Link>
					{!isLoggedIn && (
						<Link
							className="block mt-4 text-teal-200 hover:text-white lg:inline-block lg:mt-0"
							to={`/sign-up`}
						>
							Create Account
						</Link>
					)}
				</div>
				<div>{displayButton}</div>
			</div>
		</nav>
	)
}

export default DashboardHeader
