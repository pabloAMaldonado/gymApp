import { useState } from "react";
import userService from "../../service/userService";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}
  
interface LoginData {
  username: string;
  password: string;
}
  
  const Login = ({ isOpen, onClose }: LoginProps) => {
    const [formData, setFormData] = useState<LoginData>({
      username: '',
      password: ''
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await userService.postLogin(formData);
        console.log('Login successful', res);
        onClose();
      } catch (err) {
        console.error('Login failed', err);
      }
    };
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="login-modal">
        <div className="modal-header">
          <button onClick={onClose}>×</button>
        </div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

export default Login
