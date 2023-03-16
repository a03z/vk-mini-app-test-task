import React from 'react'
import PropTypes from 'prop-types'

import {
	Panel,
	PanelHeader,
	Header,
	Button,
	Group,
	Cell,
	Div,
	Avatar,
} from '@vkontakte/vkui'

const Home = ({ id, go, fetchedUser }) => {
	return (
		<Panel id={id}>
			<PanelHeader>Profile</PanelHeader>
			{fetchedUser && (
				<Group>
					<Cell
						before={
							fetchedUser.photo_max_orig ? (
								<Avatar src={fetchedUser.photo_max_orig} />
							) : null
						}>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
					<Div>
						<Button
							size='l'
							mode='secondary'
							onClick={go}
							data-to='friends'>
							Друзья
						</Button>
					</Div>
				</Group>
			)}
		</Panel>
	)
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
}

export default Home
