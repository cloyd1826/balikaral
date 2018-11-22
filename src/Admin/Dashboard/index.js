import React, {Component} from 'react'

import Grid from '../../Components/Grid'
import Table from '../../Components/Table'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div className='admin-dashboard'>
        	<Grid fluid>
        		<Grid.X padding className='dashboard-summary-container'>
        			<Grid.Cell
        				large={4}
        				medium={12}
        				
        			>
        				<div className='dashboard-summary'>
        					
	        					<i className='fa fa-file'></i>
	        					Passers: <span>2100</span>
        					
        				</div>
        			</Grid.Cell>
        			<Grid.Cell
        				large={4}
        				medium={12}
        				

        			>
        				<div className='dashboard-summary'>
        					
	        					<i className='fa fa-file'></i>
	        					Volunteers: <span>2100</span>
        					
        				</div>
        			</Grid.Cell>
        			<Grid.Cell
        				large={4}
        				medium={12}
        				

        			>
        				<div className='dashboard-summary'>
        					
	        					<i className='fa fa-file'></i>
	        					Users: <span>2100</span>
        					
        				</div>
        			</Grid.Cell>
        			
        		</Grid.X>
        		<Grid.X padding className='dashboard-summary-container padding-16'>
        			<Grid.Cell large={12}>
        				<div className='subtitle-montserrat '>Title of Table</div>
        				<div className='context-montserrat '>Lorem ipsum dolor sit amet, 
		                    consectetur adipiscing elit, 
		                    sed do eiusmod tempor incididunt ut 
		                    labore et dolore magna aliqua. 
		                    Ut enim ad minim veniam, quis nostrud 
		                    exercitation ullamco laboris nisi ut 
		                    aliquip ex ea commodo consequat. 
		                    Duis aute irure dolor in reprehenderit 
		                    in voluptate velit esse cillum dolore 
		                    eu fugiat nulla pariatur.</div>
        			</Grid.Cell>

        		</Grid.X>
        		<Grid.X padding>
        			<Grid.Cell large={12}>
        				<div className='dashboard-table'>
	        				<div className='subtitle-montserrat '>Title of Table</div>
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
				        </div>
		        	</Grid.Cell>
        		</Grid.X>
        	</Grid>
          
        </div>

    )
  }
}

export default Dashboard