import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import Home from './pages/home'
import ReadingGroupDashboard from './pages/my-reading-groups'
import ErrorPage from './pages/error-page'

const App = () => {
	return (
		<div className="bg-white App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						exact
						path="/my-reading-groups"
						element={<ReadingGroupDashboard />}
					/>
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/sign-up" element={<SignUp />} />
					<Route exact={true} path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
