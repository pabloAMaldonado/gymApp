import { useState } from "react";
import userService from "../../service/userService";

interface NewUserData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Register = ({ isOpen, onClose }: RegisterProps) => {
  const [formData, setFormData] = useState<NewUserData>({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await userService.registerUser(formData);
      setFormData({
        username: '',
        email: '',
        password: '',
      });
      onClose();
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="register-modal">
      <div className="modal-header">
        <button onClick={onClose} className="close-button">×</button>
        <h1>Register</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
                
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password-confirmation"
            placeholder="Password"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
                
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;