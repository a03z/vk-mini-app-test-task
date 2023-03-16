import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import bridge from '@vkontakte/vk-bridge'
import {
	Avatar,
	Cell,
	Div,
	Group,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelSpinner,
} from '@vkontakte/vkui'
import './friends.css'
import { useState } from 'react'

const Friends = (props) => {
	const [friends, setFriends] = useState(null)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		async function getFriends(token) {
			const data = await bridge.send('VKWebAppCallAPIMethod', {
				method: 'friends.get',
				params: {
					access_token: token,
					v: '5.131',
					fields: 'nickname,photo_100',
				},
			})
			if (data.response) {
				setFriends(data.response.items)
			}
		}
		async function fetchData() {
			setLoading(true)
			const data = await bridge.send('VKWebAppGetAuthToken', {
				app_id: process.env.REACT_APP_VK_APP_ID * 1,
				scope: 'friends',
			})
			getFriends(data.access_token)
			setLoading(false)
		}

		fetchData()
	}, [])

	if (loading) return <PanelSpinner></PanelSpinner>

	return (
		<Panel id={props.id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={props.go} data-to='home' />}>
				Друзья
			</PanelHeader>
			<Div>
				{!loading &&
					friends?.map((friend) => {
						return (
							<Group
								key={`${friend.first_name} ${friend.last_name}`}>
								<Cell
									before={
										friend.photo_100 ? (
											<Avatar src={friend.photo_100} />
										) : null
									}>
									{`${friend.first_name} ${friend.last_name}`}
								</Cell>
							</Group>
						)
					})}
			</Div>
		</Panel>
	)
}

Friends.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
}

export default Friends
