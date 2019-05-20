import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ''
        };
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
            .then(robots => this.setState({robots}));
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    render() {
        console.log(this.state.robots)
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        });

        if (this.state.robots.length === 0) {
            return <h1>Loading</h1>
        }else {
            return (
                <div className="tc">
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = {filteredRobots}/>
                        </ErrorBoundary>    
                    </Scroll>    
                </div>
            );
        }
    } 
}

export default App;