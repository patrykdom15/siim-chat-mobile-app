import React, { Component } from 'react'
import {
    AsyncStorage,
    StyleSheet,
    Text,
    ListView,
    View,
    Navigator, 
    TouchableOpacity 
} from 'react-native'

import UserService from '../../services/userAPI'

const Header = () => (
    <View style={styles.headlineBox}>
        <Text style={styles.headline}>ALL USERS</Text>
    </View>
)

export default class UsersListView extends Component {
    constructor(props) {
        super(props)

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

        this.state = {
            users: ds.cloneWithRows([]),
        }
    }

    renderListElement(rowData) {
        return (
            <TouchableOpacity onPress={() => { this.props.navigator.push({ name:'Chat', id: rowData.id }) }}>
                <View style={styles.listBox}>
                    <Text style={styles.listTest}>{rowData.username}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    async componentDidMount() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

        try {
            let users = await UserService.getAllUsers()
            this.setState({
                users: ds.cloneWithRows(users),
            })
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        return (
            <ListView
                contentContainerStyle={styles.dashboard}
                dataSource={this.state.users}
                renderRow={this.renderListElement.bind(this)}
                renderHeader={Header}
            />
        )
    }
}

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#BD632F',
    },
    headlineBox: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    headline: {
        fontSize: 24,
        color: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    listBox: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 40,
        paddingRight: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: '100%',
    },
    listTest: {
        color: 'white',
    }
});