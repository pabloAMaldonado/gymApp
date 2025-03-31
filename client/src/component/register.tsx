
import userService from "../service/userService";

import { newUser } from "../types";

const Register = () => {
    const data: newUser = {
        username: '',
        name: '',
        email: '',
        password: '',
        dateBirth: '',
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        data[name as keyof typeof data] = value
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await userService.registerUser(data)
        } catch (err) {
            console.log(err)
        }
    }   

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="test" name="name" placeholder="Name" onChange={handleChange} />
                <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                <input type="date" name="dateBirth" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    )   
}
export default Register