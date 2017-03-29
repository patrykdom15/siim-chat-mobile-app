import React, { Component } from 'react'
import {
    Navigator, 
} from 'react-native'


import UsersListView from '../UsersListView'

export default class DashboardView extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <UsersListView { ...this.props } />
        )
    }
}