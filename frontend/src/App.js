import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import PasswordForm from './components/PasswordForm';


class App extends React.Component{

  render(){
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Card border="success" bg="transparent" style={{ width: '18rem' }}>
          <Card.Body>
            <PasswordForm></PasswordForm>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default App;
