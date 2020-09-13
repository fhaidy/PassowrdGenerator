import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class App extends React.Component{
  constructor(){
     super();
     this.state = {
       passwordLength: '',
       upperCase: false,
       lowerCase: false,
       numbers: false,
       symbols: false,
       response: ''
    };
     this.onChange = this.onChange.bind(this)
     this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    let jsonToSent = Object.fromEntries(new FormData(form))
    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      this.setState({response: xhr.responseText})
    })
    xhr.open('POST', 'http://localhost:2000/password')
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(jsonToSent))
  }
  
  onChange(e){
     const re = /^[0-9\b]+$/;
     if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({passwordLength: e.target.value})
     }
  }
  
  render(){
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Card border="success" bg="transparent" style={{ width: '18rem' }}>
          <Card.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="passLengthControl">
                <Form.Label>Tamanho da Senha</Form.Label>
                <Form.Control name="passwordLength" type="text" min="0" max="99" maxLength="2" step="1" value={this.state.passwordLength} onChange={this.onChange}/>
              </Form.Group>
              <Form.Group controlId="uppercaseCheckbox">
                <Form.Check name="upperCase" type="checkbox" label="Conter Letras Maiúscula" />
              </Form.Group>
              <Form.Group controlId="lowercaseCheckbox">
                <Form.Check name="lowerCase" type="checkbox" label="Conter Letras Minúsculas" />
              </Form.Group>
              <Form.Group controlId="numbersCheckbox">
                <Form.Check name="numbers" type="checkbox" label="Conter Números" />
              </Form.Group>
              <Form.Group controlId="symbolsCheckbox">
                <Form.Check name="symbols" type="checkbox" label="Conter Caracter Especiais" value='on'/>
              </Form.Group>
              <Button size="lg" block variant="success" type="submit">
                Submit
              </Button>
              <Form.Group controlId="passwordControl">
                <Form.Label>Sua Senha:</Form.Label>
                <Form.Control name="password" type="text" min="0" max="99" maxLength="2" step="1" value={this.state.response} onChange={this.onChange}/>
              </Form.Group>
            </Form>
          </Card.Body>
          </Card>
      </div>
    );
  }
}
export default App;