//in root directory run react-native run-ios to refresh simulator
//control command z on simulator, opens web page to use console!

import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native'

class Startups extends Component{

  constructor(props, context){
    super(props, context)
    this.renderRow = this.renderRow.bind(this)

    // const startups = [
    //   {id:0, name: 'uber', location: 'california', industry:'transportation'},
    //   {id:1, name: 'instagram', location: 'california', industry:'social'},
    //   {id:2, name: 'air bnb', location: 'california', industry:'hospitality'},
    //   {id:3, name: 'birchbox', location: 'new york', industry:'food'},
    // ]

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      startups: dataSource
      // startups: dataSource.cloneWithRows(startups) //from our array of data, from api call check out this.setState
    }
  }

  componentDidMount(){
    const url = 'https://velocity-startups-api.herokuapp.com/api/startup'
    fetch(url)
    .then(response => response.json())
    .then(json =>{
      console.log('JSON ', JSON.stringify(json))
      const startups = json.startups
      const dataSource = this.state.startups
      this.setState({
        startups: dataSource.cloneWithRows(startups)
      })
    })
    .catch(e => {console.log('Error in componentDidMount api call', e)})
  }

  renderRow(startup, sID, rID){
    return(
      <Text>{startup.name}, {startup.ceo}</Text>
    )
  }

  render(){
    return(
        <ListView style={styles.list} dataSource={this.state.startups} renderRow={this.renderRow}/>
    )
  }
  //List View minimum needs dataSource and renderRow
}

const styles = StyleSheet.create({
  list: {
    padding: 32
  }
})

export default Startups









