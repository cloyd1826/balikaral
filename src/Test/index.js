import React, { Component } from 'react'

import Grid from '../Components/Grid'
import Table from '../Components/Table'

class Test extends Component{
  constructor(props){
    super(props)
    this.state = {}
  
  }
  render() {
    return (
      <div>
      	<div style={{marginTop: '100px'}} />
        	<Grid full className='test'> 
        		<Grid.X className='test'>
        			<Grid.Cell large={6} medium={4} small={12} className='test-className'>1</Grid.Cell>
        			<Grid.Cell large={6} medium={4} small={12} className='test-className'>1</Grid.Cell>
        			<Grid.Cell large={6} medium={4} small={12} className='test-className'>1</Grid.Cell>
        			<Grid.Cell large={6} medium={4} small={12} className='test-className'>1</Grid.Cell>
        		</Grid.X>
        	</Grid>

        	<Table hover nostripe>
        		<Table.Header>
        			<Table.Row>
        				<Table.HeaderCell>a</Table.HeaderCell>
        				<Table.HeaderCell>a</Table.HeaderCell>
        				<Table.HeaderCell>a</Table.HeaderCell>
        				<Table.HeaderCell>a</Table.HeaderCell>
        				<Table.HeaderCell>a</Table.HeaderCell>
        			</Table.Row>
        		</Table.Header>
        		<Table.Body>
        			<Table.Row>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        			</Table.Row>
        			<Table.Row>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        			</Table.Row>
        			<Table.Row>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        			</Table.Row>
        		</Table.Body>
        		<Table.Footer>
        			<Table.Row>
        				<Table.HeaderCell>a</Table.HeaderCell>
        				<Table.HeaderCell>a</Table.HeaderCell>
        				<Table.HeaderCell>a</Table.HeaderCell>
        				<Table.HeaderCell>a</Table.HeaderCell>
        				<Table.HeaderCell>a</Table.HeaderCell>
        			</Table.Row>

        		</Table.Footer>
        		

        	</Table>
        		<Table.Pagination />
        	
      </div>
    );
  }
}

export default Test
