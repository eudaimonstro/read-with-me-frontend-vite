import React, { useState } from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import { Link, useNavigate } from 'react-router-dom'
import FastAPIClient from '../../client'
import config from 'config'
import Button from '../../components/Button/Button'
import FormInput from '../../components/FormInput/FormInput'

const client = new FastAPIClient(config)

const Login: React.FC = () => {
	const [error, setError] = useState({ email: '', password: '' })
	const [loginForm, setLoginForm] = useState({ email: '', password: '' })

	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const onLogin = (e) => {
		e.preventDefault()
		setError(false)
		setLoading(true)

		if (loginForm.email.length <= 0) {
			setLoading(false)
			return setError({ email: 'Please Enter Email Address' })
		}
		if (loginForm.password.length <= 0) {
			setLoading(false)
			return setError({ password: 'Please Enter Password' })
		}

		client
			.login(loginForm.email, loginForm.password)
			.then(() => {
				navigate('/my-recipes')
			})
			.catch((err) => {
				setLoading(false)
				setError(true)
				console.err(err)
			})
	}

	return (
		<>
			<section className="bg-black ">
				<DashboardHeader />
				<div className="flex justify-center items-center min-h-screen text-left bg-gray-100">
					<div className="p-5 m-auto w-full max-w-xs bg-indigo-100 rounded shadow-lg">
						<header>
							{/* <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" /> */}
							<div className="flex justify-center items-center mx-auto mb-5 w-20 h-20 bg-teal-500 rounded-full">
								<svg
									className="w-8 h-8"
									width="54"
									height="54"
									viewBox="0 0 54 54"
									fill="white"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
								</svg>
							</div>
						</header>
						<form onSubmit={(e) => onLogin(e)}>
							<FormInput
								type={'text'}
								name={'email'}
								label={'Email'}
								error={error.email}
								value={loginForm.email}
								onChange={(e) =>
									setLoginForm({ ...loginForm, email: e.target.value })
								}
							/>
							<FormInput
								type={'password'}
								name={'password'}
								label={'Password'}
								error={error.password}
								value={loginForm.password}
								onChange={(e) =>
									setLoginForm({ ...loginForm, password: e.target.value })
								}
							/>
							<Button
								title={'Login'}
								loading={loading}
								error={error.password}
							/>
						</form>
						<footer>
							<Link
								className="float-right text-sm text-teal-700 hover:text-blue-900"
								to="/sign-up"
							>
								Create Account
							</Link>
						</footer>
					</div>
				</div>
			</section>
		</>
	)
}

export default Login
