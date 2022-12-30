import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../css/login.css'
import eye from '../images/eye.png'

function Signin ({ setUser, setToken }) {
  const [showPassword, setShowPassword] = useState(false)

  const [inpval, setInpval] = useState({
    email: '',
    password: ''
  })
  const history = useNavigate()
  const setVal = e => {
    // console.log(e.target.value);
    const { name, value } = e.target

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  }
  const loginuser = async e => {
    e.preventDefault()

    const { email, password } = inpval

    // console.log("user login succesfully done");

    const data = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const res = await data.json()

    if (res.status == 201) {
      localStorage.setItem('usersdatatoken', res.result.token)
      history('/list')
      // console.log(res)
    } else {
      alert(res.message)

      setInpval({ ...inpval, email: '', password: '' })
    }
  }

  return (
    <div className='sign-in-parent'>
      <div className='sign-in-form-container'>
        <h1 style={{ color: '#4c57b6' }} className="page__logo">Logo</h1>
        <p className="page__header_text">
          Enter your credentials to access your Account
        </p>
        <form className="page__form" onSubmit={loginuser}>
        <div className="input__email--field">

          <input
            type='email'
            className='UserID'
            id='email'
            placeholder='Mail ID'
            name='email'
            value={inpval.email}
            required
            onChange={setVal}
          />
        </div>
        <div className="input__password--field">

          <input
            className='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            id='password'
            name='password'
            value={inpval.password}
            required
            onChange={setVal}
          />
          <div
             
             onClick={() => {
               setShowPassword(!showPassword);
             }}
           >
             <i className="fa fa-eye-slash fa-2x" aria-hidden="true"></i>
           </div>
        </div>
          <button type='submit' className='submit-button'>
            Sign in
          </button>
          <div className="redirection">
            <p>Dont have an account yet ? <span><Link to="/Signup"> Register </Link></span></p>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signin
