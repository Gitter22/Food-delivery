import React, { ChangeEventHandler, FormEvent, Fragment, useState, } from 'react'
import { FormEventHandler } from 'react'

const auth: React.FC = () => {
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [address, setAddress] = useState<string>()
    const [password, setPassword] = useState<string>()

    const nameHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value)
    }
    const emailHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value)

    }
    const addressHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setAddress(e.target.value)
    }
    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const submitHandler: FormEventHandler = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                address
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log('Failed to make request', e))
    }

    return (
        <Fragment>
            <h3>Welcome to Zomato!</h3>
            <form onSubmit={submitHandler}>
                <div>
                    <label> Name:
                        <input type="text" name="name" value={name} onChange={nameHandler} />
                    </label>
                </div>
                <div>
                    <label> Email:
                        <input type="email" name="email" value={email} onChange={emailHandler} />
                    </label>
                </div>
                <div>
                    <label> Address:
                        <input type="text" name="address" value={address} onChange={addressHandler} />
                    </label>
                </div>
                <div>
                    <label> Password:
                        <input type="password" name="name" value={password} onChange={passwordHandler} />
                    </label>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </Fragment>
    )
}

export default auth
