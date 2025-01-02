import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
  
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      const response = await res.json();

      if (res.ok) {
        // console.log(response);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response});
        navigate('/');
      }
      else {
        alert(response.message);
        dispatch({ type: 'LOGIN_FAILURE', payload: response.message });
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); 
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto pt-12'>
            <div className='login__container d-flex justify-content-between'>
              <div className='login__img'>
                <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729627954/login_d9l6fb.png' alt="Login" />
              </div>

              <div className='login__form'>
                {user ? (
                  <div>
                   <h2>Welcome, {user.Name.replace(/\b\w/g, (char) => char.toUpperCase())}</h2>
                    <Button className='btn secondary__btn auth__btn' onClick={handleLogout}>Logout</Button>
                  </div>
                ) : (
                  <>
                    <div className='user'>
                      <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729627956/user_u1dxyk.png' alt="User Icon" />
                    </div>

                    <h2>Login</h2>

                    <Form onSubmit={handleClick}>
                      <FormGroup>
                        <input type="text" placeholder='Email' required id='email' onChange={handleChange} />
                      </FormGroup>
                      <FormGroup>
                        <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                      </FormGroup>
                      <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                    </Form>
                    <p>Don't have an account?<Link to="/register"> Create</Link></p>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
