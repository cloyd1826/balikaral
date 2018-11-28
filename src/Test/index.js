import React, { Component } from 'react'

import Grid from '../_component/Grid'
import Table from '../_component/Table'
import Form from '../_component/Form/Form'
import Input from '../_component/Form/Input'
import Select from '../_component/Form/Select'
import Textarea from '../_component/Form/Textarea'


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
        				<Table.HeaderCell isNarrowed>a</Table.HeaderCell>
        			</Table.Row>
        		</Table.Header>
        		<Table.Body>
        			<Table.Row>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell isNarrowed>a</Table.Cell>
        			</Table.Row>
        			<Table.Row>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell isNarrowed>a</Table.Cell>
        			</Table.Row>
        			<Table.Row>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell>a</Table.Cell>
        				<Table.Cell isNarrowed>a</Table.Cell>
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

            <Form title='Form Title' subtitle='Form Subtitle'>
                <Grid fluid>
                    <Grid.X>
                        <Grid.Cell large={12}>
                            <Textarea label='Test Textarea' rows={4} />
                        </Grid.Cell>
                    </Grid.X>
                     <Grid.X>
                        <Grid.Cell large={6}>
                            <Select label='Test Select'>
                                <option value=''>Test</option>
                                <option value=''>Test</option>
                                <option value=''>Test</option>
                                <option value=''>Test</option>
                            </Select>
                        </Grid.Cell>
                        <Grid.Cell large={6}>
                            <Select label='Test Select'>
                                <option value=''>Test</option>
                                <option value=''>Test</option>
                                <option value=''>Test</option>
                                <option value=''>Test</option>
                            </Select>
                        </Grid.Cell>

                    </Grid.X>
                     <Grid.X>
                        <Grid.Cell large={4}>
                            <Input placeholder='Test' label='Test Input' />
                        </Grid.Cell>
                        <Grid.Cell large={4}>
                            <Input placeholder='Test' label='Test Input' />
                        </Grid.Cell>
                        <Grid.Cell large={4}>
                            <Input placeholder='Test' label='Test Input' />
                        </Grid.Cell>
                    </Grid.X>

                </Grid>
        	</Form>
      </div>
    );
  }
}

export default Test
