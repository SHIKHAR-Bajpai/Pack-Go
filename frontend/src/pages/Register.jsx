import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {
  const [credentials, setCredentials] = useState({
    Name: '',
    email: '',
    password: '',
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long, include 1 symbol, and 1 number.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/users/signup`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return; 
      }

      dispatch({ type: 'REGISTER_SUCCESS' });
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between ">
              <div className="login__img">
                <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729628057/register_cw6qyo.png' alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729627956/user_u1dxyk.png' alt="" />
                </div>

                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="Name"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;

