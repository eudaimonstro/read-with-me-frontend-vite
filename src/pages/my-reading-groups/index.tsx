import React, { useEffect, useState } from 'react'
import FastAPIClient from '../../client'
import config from 'config'
import DashboardHeader from '../../components/DashboardHeader'
import Footer from '../../components/Footer'
import jwtDecode from 'jwt-decode'
import * as moment from 'moment'
import ReadingGroupTable from '../../components/ReadingGroupTable'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'
import { NotLoggedIn } from './NotLoggedIn'
import Loader from '../../components/Loader'
import PopupModal from '../../components/Modal/PopupModal'

const client = new FastAPIClient(config)

const ProfileView = ({ recipes }) => {
	return (
		<>
			<ReadingGroupTable recipes={recipes} showUpdate={true} />
		</>
	)
}

const ReadingGroupDashboard = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [error, setError] = useState({ label: '', url: '', source: '' })
	const [recipeForm, setReadingGroupForm] = useState({
		label: '',
		url: 'https://',
		source: ''
	})

	const [showForm, setShowForm] = useState(false)
	const [recipes, setReadingGroups] = useState([])

	const [loading, setLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(true)

	useEffect(() => {
		fetchUserReadingGroups()
	}, [])

	const fetchUserReadingGroups = () => {
		client.getUserReadingGroups().then((data) => {
			setRefreshing(false)
			setReadingGroups(data?.results)
		})
	}

	const urlPatternValidation = (URL) => {
		const regex = new RegExp(
			'(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
		)
		return regex.test(URL)
	}

	const onCreateReadingGroup = (e) => {
		e.preventDefault()
		setLoading(true)
		setError(false)

		if (recipeForm.label.length <= 0) {
			setLoading(false)
			return setError({ label: 'Please Enter Reading Group Label' })
		}
		if (recipeForm.url.length <= 0) {
			setLoading(false)
			return setError({ url: 'Please Enter Reading Group Url' })
		}
		if (!urlPatternValidation(recipeForm.url)) {
			setLoading(false)
			return setError({ url: 'Please Enter Valid URL' })
		}
		if (recipeForm.source.length <= 0) {
			setLoading(false)
			return setError({ source: 'Please Enter Reading Group Source' })
		}

		client.fetchUser().then((user) => {
			client
				.createReadingGroup(
					recipeForm.label,
					recipeForm.url,
					recipeForm.source,
					user?.id
				)
				// eslint-disable-next-line no-unused-vars
				.then((data) => {
					// eslint:ignore
					fetchUserReadingGroups()
					setLoading(false)
					setShowForm(false)
				})
		})
	}

	useEffect(() => {
		const tokenString = localStorage.getItem('token')
		if (tokenString) {
			const token = JSON.parse(tokenString)
			const decodedAccessToken = jwtDecode(token.access_token)
			if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
				setIsLoggedIn(true)
			}
		}
	}, [])

	if (refreshing) return !isLoggedIn ? <NotLoggedIn /> : <Loader />

	return (
		<>
			<section
				className="flex flex-col text-center bg-black"
				style={{ minHeight: '100vh' }}
			>
				<DashboardHeader />
				<div className="container px-5 pt-6 mx-auto text-center lg:px-20">
					{/*TODO - move to component*/}
					<h1 className="mb-12 text-3xl font-medium text-white">
						Reading Groups - Better than all the REST
					</h1>

					<button
						className="p-3 my-5 text-white bg-teal-500 rounded"
						onClick={() => {
							setShowForm(!showForm)
						}}
					>
						Create Reading Group
					</button>

					<p className="text-base leading-relaxed text-white">Latest recipes</p>
					<div className="text-white mainViewport">
						{recipes.length && (
							<ProfileView
								recipes={recipes}
								fetchUserReadingGroups={fetchUserReadingGroups}
							/>
						)}
					</div>
				</div>

				<Footer />
			</section>
			{showForm && (
				<PopupModal
					modalTitle={'Create Reading Group'}
					onCloseBtnPress={() => {
						setShowForm(false)
						setError({ fullName: '', email: '', password: '' })
					}}
				>
					<div className="mt-4 text-left">
						<form className="mt-5" onSubmit={(e) => onCreateReadingGroup(e)}>
							<FormInput
								type={'text'}
								name={'label'}
								label={'Label'}
								error={error.label}
								value={recipeForm.label}
								onChange={(e) =>
									setReadingGroupForm({ ...recipeForm, label: e.target.value })
								}
							/>
							<FormInput
								type={'text'}
								name={'url'}
								label={'Url'}
								error={error.url}
								value={recipeForm.url}
								onChange={(e) =>
									setReadingGroupForm({ ...recipeForm, url: e.target.value })
								}
							/>
							<FormInput
								type={'text'}
								name={'source'}
								label={'Source'}
								error={error.source}
								value={recipeForm.source}
								onChange={(e) =>
									setReadingGroupForm({ ...recipeForm, source: e.target.value })
								}
							/>
							<Button
								loading={loading}
								error={error.source}
								title={'Create Reading Group'}
							/>
						</form>
					</div>
				</PopupModal>
			)}
		</>
	)
}

export default ReadingGroupDashboard
