import Collapse from 'react-bootstrap/Collapse';
import React from 'react';
import './App.css';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChair, faCity, faCouch, faHandSparkles, faHome, faHospital, faInfoCircle, faStoreAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nameAndAddress: {
        email: '',
        mrMrs: '',
        title: '',
        firstName: '',
        surname: '',
        phone: '',
        company: '',
        road: '',
        roadNo: '',
        postcode: '',
        city: ''
      },
      sepAddress: {
        company: '',
        road: '',
        roadNo: '',
        postcode: '',
        city: ''
      },
      sepPerson: {
        email: '',
        mrMrs: '',
        title: '',
        firstName: '',
        surname: '',
        phone: '',
        doorBell: ''
      },
      cleaningDetails: {
        property: '',
        floor: '',
        furnitureType: ''
      },
      generalCleaning: {
        area: '',
        purification: '',
        pollutionDegree: '',
        additionalInfo: ''
      },
      windowCleaning: {
        casement: '',
        max: '',
        cleaningRequests: [],
        pollutionDegree: '',
        additionalInfo: ''
      },
      carpetCleaning: {
        looseCarpet: null,
        area: '',
        fixedCarpet: '',
        cleaningRequests: [],
        pollutionDegree: '',
        additionalInfo: ''
      },
      upholsteryCleaning: {
        twoSeater: null,
        threeSeater: null,
        smallCornerCouch: null,
        largeCornerCouch: null,
        armchair: null,
        stool: null,
        chairWithoutBack: null,
        chairWithBack: null,
        individualCouch: null,
        cleaningRequests: [],
        pollutionDegree: '',
        additionalInfo: ''
      },
      mainCheckboxes: {
        check_1_1: false,
        check_1_2: false,
        check_2_1: false,
        check_2_2: false,
        check_2_i: true,
        check_2_3: false,
        check_2_4: false
      },
      windowCheckboxes: ['inside Outside', 'only inside', 'only outside', 'with frame', 'Joints/folds', 'Window sills', 'Lattice windows', 'Old building window', 'Skylights', 'Winter garden', 'Blinds', 'Roller shutter', 'canopy'],
      carpetCheckboxes: ['stains', 'red wine', 'Tracks', 'blood','urine','Vomit', 'move', 'Construction work', 'Water damage'],
      upholsteryCheckboxes: ['stains', 'red wine', 'milk', 'blood','urine','Vomit', 'Pencil marks', 'Construction work', 'Water damage']
    };
  }
  

  textInputChange(event, stateRef) {
    const newData = Object.assign(this.state[stateRef], {
      [ event.target.id ]: event.target.value,
    });

     this.setState(Object.assign(this.state, { 
      [stateRef]: newData
     }));
  }

  numberInputChange(event, stateRef) {
    const newData = Object.assign(this.state[stateRef], {
      [ event.target.id ]: Number(event.target.value)
    });

    this.setState(Object.assign(this.state, { 
      [stateRef]: newData
    }));
  }

  handleCounter(e, counter) {
    e.preventDefault();
    
    if (e.target.id === 'looseCarpet') {
      let val = this.state.carpetCleaning.looseCarpet;
    
      if (counter === 'minus') val--
      if (counter === 'plus') val++
      if (val < 0) val = 0

      const newData = Object.assign(this.state.carpetCleaning, {
        looseCarpet: val
      });
  
      this.setState(Object.assign(this.state, { 
        carpetCleaning: newData
      }));
    } else {
      let propName = e.target.id;
      let val = this.state.upholsteryCleaning[propName];

      if (counter === 'minus') val--
      if (counter === 'plus') val++
      if (val < 0) val = 0

      const newData = Object.assign(this.state.upholsteryCleaning, {
        [propName]: val
      });
  
      this.setState(Object.assign(this.state, { 
        upholsteryCleaning: newData
      }));
    }
  }

  toggleChange(event, stateRef) {
    let id;
    if (event.target.id) id = event.target.id;
    if (event.target.parentElement.id) id = event.target.parentElement.id;
    if (event.target.parentElement.parentElement.id) id = event.target.parentElement.parentElement.id;
    
    let propName;
    // if (stateRef === 'cleaningDetails') propName = 'property';
    // if (stateRef === 'generalCleaning' || stateRef === 'windowCleaning' || stateRef === 'carpetCleaning' || stateRef === 'upholsteryCleaning') propName = 'pollutionDegree';
    switch (stateRef) {
      case 'cleaningDetails': propName = 'property'; break;
      case 'generalCleaning': propName = 'pollutionDegree'; break;
      case 'windowCleaning': propName = 'pollutionDegree'; break;
      case 'carpetCleaning': propName = 'pollutionDegree'; break;
      case 'upholsteryCleaning': propName = 'pollutionDegree'; break;
    }

    const newData = Object.assign(this.state[stateRef], {
      [propName]: id,
    });

    this.setState(Object.assign(this.state, {
      [stateRef]: newData
    }));
  }

  mainCheckboxChange(event) {
    const checkId = String(event.target.id);
    const newChecks = Object.assign(this.state.mainCheckboxes, {
      [ checkId ]: !this.state.mainCheckboxes[checkId],
    });

    this.setState(Object.assign(this.state, {
      mainCheckboxes: newChecks
    }))
  }

  checkboxChange(event, stateRef) {
    const value = event.target.value;

    (event.target.checked) ?
    this.addCleaningRequest(value, stateRef)
    : this.removeCleaningRequest(value, stateRef)
  }

  addCleaningRequest(value, stateRef) {
    let newRequests = [ ...this.state[stateRef].cleaningRequests ];

    newRequests.push(value);

    this.setRequests(newRequests, stateRef);
  }

  removeCleaningRequest(value, stateRef) {
    let newRequests = this.state[stateRef].cleaningRequests.filter(item => {
      return !(item === value)
    });

    this.setRequests(newRequests, stateRef);
  }

  setRequests(newRequests, stateRef) {
    const newData = Object.assign(this.state[stateRef], {
      cleaningRequests: newRequests,
    });

    this.setState(Object.assign(this.state, {
      [stateRef]: newData
    }));
  }

  render() {
    return (
      <div>
        <div className="bg-success header">
          <h1 className="text-light">Mr Cleaner</h1>
        </div>
        <Container>
          <h4 className="text-success">In a few steps to a non-binding offer</h4>
          <Form>
            <Row>
              <Col xs="12" sm="12" md="6" lg="4">
                <div className="form-col">
                  <h5>
                    <span>1</span> Name and address
                  </h5>
                  <div>
                    <h5 className="text-success">Billing address</h5>
                    <div className="form-item">
                      <Form.Control type="email" id="email"
                      value={ this.state.nameAndAddress.email } placeholder="E-mail address"
                      onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                    </div>
                    <div className="form-item">
                      <Form.Control type="text" id="company"
                      value={ this.state.nameAndAddress.company } placeholder="company"
                      onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                    </div>
                    <Row>
                      <Col md="6"  className="form-item">
                        <Form.Control as="select" id="mrMrs" custom
                        onChange={ event => this.textInputChange(event, 'nameAndAddress') } >
                          <option value="">Please choose</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                        </Form.Control>
                      </Col>
                      <Col md="6" className="form-item">
                        <Form.Control as="select" id="title"
                        custom 
                        onChange={ event => this.textInputChange(event, 'nameAndAddress') } >
                          <option value="">Please choose</option>
                          <option value="Dr">Dr</option>
                          <option value="Prof.">Prof.</option>
                          <option value="Prof. Dr">Prof. Dr</option>
                          <option value="Like.">Like.</option>
                          <option value="Dr Like.">Dr Like.</option>
                          <option value="Prof. Dr">Prof. Dr Like.</option>
                        </Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" className="form-item">
                        <Form.Control type="text" id="firstName"
                        value={ this.state.nameAndAddress.firstName } placeholder="First name"
                        onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                      </Col>
                      <Col md="6" className="form-item">
                        <Form.Control type="text" id="surname"
                        value={ this.state.nameAndAddress.surname } placeholder="Surname"
                        onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="9" className="form-item">
                        <Form.Control type="text" id="road"
                        value={ this.state.nameAndAddress.road } placeholder="road"
                        onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                      </Col>
                      <Col md="3" className="form-item">
                        <Form.Control type="text" id="roadNo"
                        value={ this.state.nameAndAddress.roadNo } placeholder="No."
                        onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4" className="form-item">
                        <Form.Control type="text" id="postcode"
                        value={ this.state.nameAndAddress.postcode } placeholder="Postcode"
                        onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                      </Col>
                      <Col md="8" className="form-item">
                        <Form.Control type="text" id="city"
                        value={ this.state.nameAndAddress.city } placeholder="city"
                        onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                      </Col>
                    </Row>
                    <div className="form-item">
                      <Form.Control type="text" value="Österreich" readOnly
                      />
                    </div>
                    <div className="form-item">
                      <Form.Control type="text" id="phone"
                      value={ this.state.nameAndAddress.phone } placeholder="Telephone / mobile number"
                      onChange={ event => this.textInputChange(event, 'nameAndAddress') } />
                    </div>
                    <div className="main-checkbox">
                      <Form.Check type="checkbox" id="check_1_1" onChange={ event => this.mainCheckboxChange(event) } label="Add a separate cleaning address" aria-controls="sepAddress"
                      aria-expanded={ this.state.mainCheckboxes.check_1_1 } />
                    </div>
                    <Collapse in={ this.state.mainCheckboxes.check_1_1 }>
                      <div id="sepAddress">
                        <h5 className="text-success">Cleaning address</h5>
                        <div className="form-item">
                          <Form.Control type="text" id="company"
                          value={ this.state.sepAddress.company } placeholder="company"
                          onChange={ event => this.textInputChange(event, 'sepAddress') } />
                        </div>
                        <Row>
                          <Col md="6" className="form-item">
                            <Form.Control type="text" id="road"
                            value={ this.state.sepAddress.road } placeholder="road"
                            onChange={ event => this.textInputChange(event, 'sepAddress') } />
                          </Col>
                          <Col md="6" className="form-item">
                            <Form.Control type="text" id="roadNo"
                            value={ this.state.sepAddress.roadNo } placeholder="No."
                            onChange={ event => this.textInputChange(event, 'sepAddress') } />
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6" className="form-item">
                            <Form.Control type="text" id="postcode"
                            value={ this.state.sepAddress.postcode } placeholder="Postcode"
                            onChange={ event => this.textInputChange(event, 'sepAddress') } />
                          </Col>
                          <Col md="6" className="form-item">
                            <Form.Control type="text" id="city"
                            value={ this.state.sepAddress.city } placeholder="city"
                            onChange={ event => this.textInputChange(event, 'sepAddress') } />
                          </Col>
                        </Row>
                        <div className="form-item">
                          <Form.Control type="text" value="Österreich" readOnly
                          />
                        </div>
                      </div>
                    </Collapse>
                    <div className="main-checkbox">
                      <Form.Check type="checkbox" id="check_1_2" onChange={ event => this.mainCheckboxChange(event) } label="Add a separate contact person"
                      aria-controls="sepPerson"
                      aria-expanded={ this.state.mainCheckboxes.check_1_2 } />
                    </div>
                    <Collapse in={ this.state.mainCheckboxes.check_1_2 }>
                      <div id="sepPerson">
                        <h5 className="text-success">Contact Person</h5>
                        <div className="form-item">
                          <Form.Control type="email" id="email"
                          value={ this.state.sepPerson.email } placeholder="E-mail address"
                          onChange={ event => this.textInputChange(event, 'sepPerson') } />
                        </div>
                        <Row>
                          <Col md="6" className="form-item">
                            <Form.Control as="select" id="mrMrs" custom
                            onChange={ event => this.textInputChange(event, 'sepPerson') } >
                              <option value="">Please choose</option>
                              <option value="Mr">Mr</option>
                              <option value="Mrs">Mrs</option>
                            </Form.Control>
                          </Col>
                          <Col md="6" className="form-item">
                            <Form.Control as="select" id="title"
                            custom 
                            onChange={ event => this.textInputChange(event, 'sepPerson') } >
                              <option value="">Please choose</option>
                              <option value="Dr">Dr</option>
                              <option value="Prof.">Prof.</option>
                              <option value="Prof. Dr">Prof. Dr</option>
                              <option value="Like.">Like.</option>
                              <option value="Dr Like.">Dr Like.</option>
                              <option value="Prof. Dr">Prof. Dr Like.</option>
                            </Form.Control>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6" className="form-item">
                            <Form.Control type="text" id="firstName"
                            value={ this.state.sepPerson.firstName } placeholder="First name"
                            onChange={ event => this.textInputChange(event, 'sepPerson') } />
                          </Col>
                          <Col md="6" className="form-item">
                            <Form.Control type="text" id="surname"
                            value={ this.state.sepPerson.surname } placeholder="Surname"
                            onChange={ event => this.textInputChange(event, 'sepPerson') } />
                          </Col>
                        </Row>
                        <div className="form-item">
                          <Form.Control type="text" id="phone"
                          value={ this.state.sepPerson.phone } placeholder="Telephone / mobile number"
                          onChange={ event => this.textInputChange(event, 'sepPerson') } />
                        </div>
                        <Form.Control id="doorBell" as="textarea" rows={2} placeholder="E.g. different name on the doorbell label" onChange={ event => this.textInputChange(event, 'sepPerson') } />
                      </div>
                    </Collapse>
                  </div>
                </div>
              </Col>
              <Col xs="12" sm="12" md="6" lg="4">
                <div className="form-col">
                  <h5>
                    <span>2</span> Cleaning details
                  </h5>
                  <h5 className="text-success">Property type</h5>
                  <div className="form-item property-grid">
                    <div className="grid-item">
                      <div id="house" onClick={ event => this.toggleChange(event, 'cleaningDetails') } className={ 'wrap-item ' + (this.state.cleaningDetails.property === 'house' && 'active') }>
                        <FontAwesomeIcon icon={ faHome } /> House
                      </div>
                    </div>
                    <div className="grid-item">
                      <div id="flat" onClick={ event => this.toggleChange(event, 'cleaningDetails') } className={ 'wrap-item ' + (this.state.cleaningDetails.property === 'flat' && 'active') }>
                        <FontAwesomeIcon icon={ faCity } /> flat
                      </div>
                    </div>
                    <div className="grid-item">
                      <div id="office" onClick={ event => this.toggleChange(event, 'cleaningDetails') } className={ 'wrap-item ' + (this.state.cleaningDetails.property === 'office' && 'active') }>
                        <FontAwesomeIcon icon={ faBuilding } /> office
                      </div>
                    </div>
                    <div className="grid-item">
                      <div id="practice" onClick={ event => this.toggleChange(event, 'cleaningDetails') } className={ 'wrap-item ' + (this.state.cleaningDetails.property === 'practice' && 'active') }>
                        <FontAwesomeIcon icon={ faHospital } /> practice
                      </div>
                    </div>
                    <div className="grid-item">
                      <div id="loan" onClick={ event => this.toggleChange(event, 'cleaningDetails') } className={ 'wrap-item ' + (this.state.cleaningDetails.property === 'loan' && 'active') }>
                        <FontAwesomeIcon icon={ faStoreAlt } /> loan
                      </div>
                    </div>
                    <div className="grid-item">
                      <div id="restaurant" onClick={ event => this.toggleChange(event, 'cleaningDetails') } className={ 'wrap-item ' + (this.state.cleaningDetails.property === 'restaurant' && 'active') }>
                        <FontAwesomeIcon icon={ faUtensils } /> restaurant
                      </div>
                    </div>
                  </div>
                  <Row className="form-item">
                    <Col xs="4">
                      <Form.Label htmlFor="floor">Floor / floor</Form.Label>
                    </Col>
                    <Col xs="8">
                      <Form.Control type="text" id="floor"
                      value={ this.state.cleaningDetails.floor } placeholder="e.g. ground floor or 4th floor"
                      onChange={ event => this.textInputChange(event, 'cleaningDetails') } />
                    </Col>
                  </Row>
                  <Row className="form-item">
                    <Col xs="4">
                      <Form.Label htmlFor="furnitureType">Type of furniture</Form.Label>
                    </Col>
                    <Col xs="8">
                      <Form.Control as="select" id="furnitureType" custom
                      onChange={ event => this.textInputChange(event, 'cleaningDetails') } >
                        <option value="">Please choose</option>
                        <option value="furnished">furnished</option>
                        <option value="partly furnished">partly furnished</option>
                        <option value="unfurnished">unfurnished</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </div>
                <div className="form-col">
                  <div className="main-checkbox">
                    <Form.Check type="checkbox" id="check_2_1" onChange={ event => this.mainCheckboxChange(event) } label="General cleaning" aria-controls="generalCleaning"
                    aria-expanded={ this.state.mainCheckboxes.check_2_1 } />
                  </div>
                  <Collapse in={ this.state.mainCheckboxes.check_2_1 }>
                    <div id="generalCleaning">
                      <Row className="form-item">
                        <Col xs="4">
                          <Form.Label htmlFor="area">Area in m&sup2;</Form.Label>
                        </Col>
                        <Col xs="8">
                          <Form.Control type="text" id="area"
                          value={ this.state.generalCleaning.area } placeholder="0"
                          onChange={ event => this.textInputChange(event, 'generalCleaning') } />
                        </Col>
                      </Row>
                      <Row className="form-item">
                        <Col xs="4">
                          <Form.Label htmlFor="purification">Purification occasion</Form.Label>
                        </Col>
                        <Col xs="8">
                          <Form.Control as="select" id="purification" custom
                          onChange={ event => this.textInputChange(event, 'generalCleaning') } >
                            <option value="">Please choose</option>
                            <option value="normal">Normal cleaning</option>
                            <option value="final">Final cleaning</option>
                            <option value="moving">Moving cleaning</option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <h6 className="text-success">Degree of pollution</h6>
                      <div className="form-item pollution-grid">
                        <div className="grid-item">
                          <div id="light" onClick={ event => this.toggleChange(event, 'generalCleaning') } className={ 'wrap-item ' + (this.state.generalCleaning.pollutionDegree === 'light' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> light
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="normal" onClick={ event => this.toggleChange(event, 'generalCleaning') } className={ 'wrap-item ' + (this.state.generalCleaning.pollutionDegree === 'normal' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> normal
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="strong" onClick={ event => this.toggleChange(event, 'generalCleaning') } className={ 'wrap-item ' + (this.state.generalCleaning.pollutionDegree === 'strong' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> strong
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="extreme" onClick={ event => this.toggleChange(event, 'generalCleaning') } className={ 'wrap-item ' + (this.state.generalCleaning.pollutionDegree === 'extreme' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> extreme
                          </div>
                        </div>
                      </div>
                      <h6 className="text-success">additional information (optional)</h6>
                      <Form.Control id="additionalInfo" as="textarea" rows={2} placeholder="e.g. degree of pollution or what should be cleaned ..." onChange={ event => this.textInputChange(event, 'generalCleaning') } />
                    </div>
                  </Collapse>
                </div>
                <div className="form-col">
                  <div className="main-checkbox">
                    <Form.Check type="checkbox" id="check_2_2" onChange={ event => this.mainCheckboxChange(event) } label="Window cleaning" aria-controls="windowCleaning"
                    aria-expanded={ this.state.mainCheckboxes.check_2_2 } />
                  </div>
                  <Collapse in={ this.state.mainCheckboxes.check_2_2 }>
                    <div id="windowCleaning">
                      <Row className="form-item">
                        <Col xs="4">
                          <Form.Label htmlFor="casement">Casement<FontAwesomeIcon icon={ faInfoCircle } id="check_2_i" onClick={ event => this.mainCheckboxChange(event) } aria-controls="windowCleaningPicture"
                    aria-expanded={ this.state.mainCheckboxes.check_2_i } />
                          </Form.Label>
                        </Col>
                        <Col xs="8">
                          <Form.Control type="text" id="casement"
                          value={ this.state.windowCleaning.casement } placeholder="Number of windows x sash"
                          onChange={ event => this.textInputChange(event, 'windowCleaning') } />
                        </Col>
                      </Row>
                      <Collapse in={ this.state.mainCheckboxes.check_2_i }>
                        <div id="windowCleaningPicture">
                          <img src='mrc_info_windows.png' />
                        </div>
                      </Collapse>
                      <Row className="form-item">
                        <Col xs="4">
                          <Form.Label htmlFor="max">max</Form.Label>
                        </Col>
                        <Col xs="8">
                          <Form.Control type="text" id="max"
                          value={ this.state.windowCleaning.max } placeholder="e.g. 2.5m or 4m"
                          onChange={ event => this.textInputChange(event, 'windowCleaning') } />
                        </Col>
                      </Row>
                      <h6 className="text-success">Cleaning</h6>
                      <p style={{fontSize: "12px"}}>requests (on this basis our uvb. Effort estimate is made)</p>
                      <div className="checkbox-grid">
                        { this.state.windowCheckboxes.map(item => {
                          return(
                            <Form.Check type="checkbox" label={ item } value={ item } onChange={ (event) => this.checkboxChange(event, 'windowCleaning') } />
                          )})
                        }
                      </div>
                      <h6 className="text-success">Degree of pollution</h6>
                      <div className="form-item pollution-grid">
                        <div className="grid-item">
                          <div id="light" onClick={ event => this.toggleChange(event, 'windowCleaning') } className={ 'wrap-item ' + (this.state.windowCleaning.pollutionDegree === 'light' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> light
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="normal" onClick={ event => this.toggleChange(event, 'windowCleaning') } className={ 'wrap-item ' + (this.state.windowCleaning.pollutionDegree === 'normal' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> normal
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="strong" onClick={ event => this.toggleChange(event, 'windowCleaning') } className={ 'wrap-item ' + (this.state.windowCleaning.pollutionDegree === 'strong' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> strong
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="extreme" onClick={ event => this.toggleChange(event, 'windowCleaning') } className={ 'wrap-item ' + (this.state.windowCleaning.pollutionDegree === 'extreme' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> extreme
                          </div>
                        </div>
                      </div>
                      <h6 className="text-success">additional information (optional)</h6>
                      <Form.Control id="additionalInfo" as="textarea" rows={2} placeholder="e.g. degree of pollution or what should be cleaned ..." onChange={ event => this.textInputChange(event, 'windowCleaning') } />
                    </div>
                  </Collapse>
                </div>
                <div className="form-col">
                  <div className="main-checkbox">
                    <Form.Check type="checkbox" id="check_2_3" onChange={ event => this.mainCheckboxChange(event) } label="Carpet cleaning" aria-controls="carpetCleaning"
                    aria-expanded={ this.state.mainCheckboxes.check_2_3 } />
                  </div>
                  <Collapse in={ this.state.mainCheckboxes.check_2_3 }>
                    <div id="carpetCleaning">
                      <Row className="form-item">
                        <Col xs="5">
                          <Form.Label htmlFor="looseCarpet">Loose carpet</Form.Label>
                        </Col>
                        <Col xs="7" className="handle-counter">
                          <button id="looseCarpet" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="looseCarpet"
                          value={ this.state.carpetCleaning.looseCarpet } placeholder="number"
                          onChange={ event => this.numberInputChange(event, 'carpetCleaning') } />
                          <button id="looseCarpet" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item">
                        <Col xs="5">
                        </Col>
                        <Col xs="7">
                          <Form.Control type="text" id="area"
                          value={ this.state.carpetCleaning.area } placeholder="Total area in m&sup2;"
                          onChange={ event => this.textInputChange(event, 'carpetCleaning') } />
                        </Col>
                      </Row>
                      <Row className="form-item">
                        <Col xs="5">
                          <Form.Label htmlFor="fixedCarpet">Fixed carpet</Form.Label>
                        </Col>
                        <Col xs="7">
                          <Form.Control type="text" id="fixedCarpet"
                          value={ this.state.carpetCleaning.fixedCarpet } placeholder="Surface in m&sup2;"
                          onChange={ event => this.textInputChange(event, 'carpetCleaning') } />
                        </Col>
                      </Row>
                      <h6 className="text-success">Cleaning</h6>
                      <p>requests (on this basis our uvb. Effort estimate is made)</p>
                      <div className="checkbox-grid">
                        { this.state.carpetCheckboxes.map(item => {
                          return(
                            <Form.Check type="checkbox" label={ item } value={ item } onChange={ (event) => this.checkboxChange(event, 'carpetCleaning') } />
                          )})
                        }
                      </div>
                      <h6 className="text-success">Degree of pollution</h6>
                      <div className="form-item pollution-grid">
                        <div className="grid-item">
                          <div id="light" onClick={ event => this.toggleChange(event, 'carpetCleaning') } className={ 'wrap-item ' + (this.state.carpetCleaning.pollutionDegree === 'light' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> light
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="normal" onClick={ event => this.toggleChange(event, 'carpetCleaning') } className={ 'wrap-item ' + (this.state.carpetCleaning.pollutionDegree === 'normal' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> normal
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="strong" onClick={ event => this.toggleChange(event, 'carpetCleaning') } className={ 'wrap-item ' + (this.state.carpetCleaning.pollutionDegree === 'strong' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> strong
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="extreme" onClick={ event => this.toggleChange(event, 'carpetCleaning') } className={ 'wrap-item ' + (this.state.carpetCleaning.pollutionDegree === 'extreme' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> extreme
                          </div>
                        </div>
                      </div>
                      <h6 className="text-success">additional information (optional)</h6>
                      <Form.Control id="additionalInfo" as="textarea" rows={2} placeholder="e.g. degree of pollution or what should be cleaned ..." onChange={ event => this.textInputChange(event, 'carpetCleaning') } />
                    </div>
                  </Collapse>
                </div>
                <div className="form-col">
                  <div className="main-checkbox">
                    <Form.Check type="checkbox" id="check_2_4" onChange={ event => this.mainCheckboxChange(event) } label="Upholstery cleaning" aria-controls="upholsteryCleaning"
                    aria-expanded={ this.state.mainCheckboxes.check_2_4 } />
                  </div>
                  <Collapse in={ this.state.mainCheckboxes.check_2_4 }>
                    <div id="upholsteryCleaning">
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="twoSeater">
                            <FontAwesomeIcon icon={ faCouch }></FontAwesomeIcon> 2 seater
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="twoSeater" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="twoSeater"
                          value={ this.state.upholsteryCleaning.twoSeater } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="twoSeater" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="threeSeater">
                            <FontAwesomeIcon icon={ faCouch }></FontAwesomeIcon> 3 seater
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="threeSeater" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="threeSeater"
                          value={ this.state.upholsteryCleaning.threeSeater } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="threeSeater" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="smallCornerCouch">
                            <FontAwesomeIcon icon={ faCouch }></FontAwesomeIcon> Small corner couch
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="smallCornerCouch" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="smallCornerCouch"
                          value={ this.state.upholsteryCleaning.smallCornerCouch } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="smallCornerCouch" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="largeCornerCouch">
                            <FontAwesomeIcon icon={ faCouch }></FontAwesomeIcon> Large corner couch
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="largeCornerCouch" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="largeCornerCouch"
                          value={ this.state.upholsteryCleaning.largeCornerCouch } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="largeCornerCouch" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="armchair">
                            <FontAwesomeIcon icon={ faChair }></FontAwesomeIcon> armchair
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="armchair" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="armchair"
                          value={ this.state.upholsteryCleaning.armchair } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="armchair" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="stool">
                            <FontAwesomeIcon icon={ faCouch }></FontAwesomeIcon> stool
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="stool" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="stool"
                          value={ this.state.upholsteryCleaning.stool } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="stool" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="chairWithoutBack">
                            <FontAwesomeIcon icon={ faChair }></FontAwesomeIcon> Chair without back
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="chairWithoutBack" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="chairWithoutBack"
                          value={ this.state.upholsteryCleaning.chairWithoutBack } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="chairWithoutBack" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="chairWithBack">
                            <FontAwesomeIcon icon={ faChair }></FontAwesomeIcon> Chair with back
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="chairWithBack" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="chairWithBack"
                          value={ this.state.upholsteryCleaning.chairWithBack } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="chairWithBack" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <Row className="form-item upholstery-item">
                        <Col xs="7">
                          <Form.Label className="upholstery-label" htmlFor="individualCouch">
                            <FontAwesomeIcon icon={ faCouch }></FontAwesomeIcon> Individual couch
                          </Form.Label>
                        </Col>
                        <Col xs="5" className="handle-counter">
                          <button id="individualCouch" className="counter" onClick={ e => this.handleCounter(e, 'minus') }>-</button>
                          <Form.Control type="number" id="individualCouch"
                          value={ this.state.upholsteryCleaning.individualCouch } placeholder="0"
                          onChange={ event => this.numberInputChange(event, 'upholsteryCleaning') } />
                          <button id="individualCouch" className="counter" onClick={ e => this.handleCounter(e, 'plus') }>+</button>
                        </Col>
                      </Row>
                      <h6 className="text-success">Cleaning</h6>
                      <p>requests (on this basis our uvb. Effort estimate is made)</p>
                      <div className="checkbox-grid">
                        { this.state.upholsteryCheckboxes.map(item => {
                          return(
                            <Form.Check type="checkbox" label={ item } value={ item } onChange={ (event) => this.checkboxChange(event, 'upholsteryCleaning') } />
                          )})
                        }
                      </div>
                      <h6 className="text-success">Degree of pollution</h6>
                      <div className="form-item pollution-grid">
                        <div className="grid-item">
                          <div id="light" onClick={ event => this.toggleChange(event, 'upholsteryCleaning') } className={ 'wrap-item ' + (this.state.upholsteryCleaning.pollutionDegree === 'light' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> light
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="normal" onClick={ event => this.toggleChange(event, 'upholsteryCleaning') } className={ 'wrap-item ' + (this.state.upholsteryCleaning.pollutionDegree === 'normal' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> normal
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="strong" onClick={ event => this.toggleChange(event, 'upholsteryCleaning') } className={ 'wrap-item ' + (this.state.upholsteryCleaning.pollutionDegree === 'strong' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> strong
                          </div>
                        </div>
                        <div className="grid-item">
                          <div id="extreme" onClick={ event => this.toggleChange(event, 'upholsteryCleaning') } className={ 'wrap-item ' + (this.state.upholsteryCleaning.pollutionDegree === 'extreme' && 'active') }>
                            <FontAwesomeIcon icon={ faHandSparkles } /> extreme
                          </div>
                        </div>
                      </div>
                      <h6 className="text-success">additional information (optional)</h6>
                      <Form.Control id="additionalInfo" as="textarea" rows={2} placeholder="e.g. degree of pollution or what should be cleaned ..." onChange={ event => this.textInputChange(event, 'upholsteryCleaning') } />
                    </div>
                  </Collapse>
                </div>
              </Col>
              <Col xs="12" sm="12" md="6" lg="4">
                <div  className="form-col">
                  <h5>
                    <span>3</span> Appointment & time
                  </h5>
                  <div>
                    <h5 className="text-success">Calendar</h5>
                  </div>
                </div>
                <div  className="form-col">
                  <h5>
                    <span>4</span> Add pictures
                  </h5>
                  <div className="boxUploadedFiles">
                    <button className="uploadButton" onClick="">+</button>
                  </div>
                </div>
                <div  className="form-col">
                  <h5>
                    <span>5</span> Coupon Code
                  </h5>
                  <p style={{fontSize: "13px", marginTop: "20px"}}>Enter your voucher code here and then click on "Redeem".</p>
                  <h6>Enter code</h6>
                    <div style={{display: "flex", flexDirection: "row"}}>
                      <Form.Control type="text" style={{width: "73%"}} id="couponCode" placeholder="Coupon code" />
                      <button className="redeem" >
                        Redeem
                      </button>
                  </div>
                </div>
                <div  className="form-col">
                  <h5>
                    <span>6</span> Terms and conditions and privacy policy
                  </h5>
                  <div className="privacyPolicy">
                    <Form.Check type="checkbox" /><p>
                    I agree that my data will be used to process my request and I hereby agree to the <a href="https://www.mrcleaner.at/nuetzliches/agb.html" target="_blank">terms</a> and <a href="https://www.mrcleaner.at/nuetzliches/agb.html" target="_blank">conditions</a> and the <a href="https://www.mrcleaner.at/nuetzliches/datenschutz.html" target="_blank">privacy policy</a>.</p></div>
                  <button className="submit"
                    onClick={ () => console.log(this.state) } >
                    Log Form Data to the console
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    )
  }
}

export default App;
