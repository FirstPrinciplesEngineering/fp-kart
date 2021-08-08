import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import SubHeader from './SubHeader'

const Style = {
    padding: '34px'
}

const FAQs = () => {
    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />

            <Row className='justify-content-md-center'>
                <Col style={Style}>
                    <center><p className='heading'>FAQ</p></center>

                    <Col style={{marginTop:'5%'}}>
                    <Accordion>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Where do you ship?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>What do I do if I entered an incorrect shipping address?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>What size should I choose?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Can we purchage below Rs 200 without delivery charges?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>How do I clean my product?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                
         
                    </Col>
                </Col>
            </Row>
        </Fragment>
    )
}

export default FAQs
