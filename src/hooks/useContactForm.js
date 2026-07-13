import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Initialize EmailJS once with your public key
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (success || error) {
      setSuccess(false);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all fields');
      }

      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      });
      const firstLetter = formData.name.charAt(0).toUpperCase();
      const currentYear = now.getFullYear();

      // Make sure the template variables exactly match what's in EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: timeString,
        firstLetter: firstLetter,
        currentYear: currentYear
      };

      console.log('Sending email with params:', templateParams);

      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
        // No need to pass publicKey again if init() was called
      );

      console.log('EmailJS response:', result);

      if (result.status === 200) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error(`Unexpected status: ${result.status}`);
      }
    } catch (err) {
      console.error('Full EmailJS error:', err);
      
      // Attempt to extract a user-friendly message
      let userMessage = 'Failed to send message. Please try again or contact me directly at bahaekenikssi@email.com';
      
      if (err.text) {
        // EmailJS often returns a text property with the error
        if (err.text.includes('Invalid template ID')) {
          userMessage = 'Invalid EmailJS template ID. Please check your configuration.';
        } else if (err.text.includes('Invalid service ID')) {
          userMessage = 'Invalid EmailJS service ID. Please check your configuration.';
        } else if (err.text.includes('Public key is invalid')) {
          userMessage = 'Invalid EmailJS public key. Please check your configuration.';
        } else {
          userMessage = `EmailJS error: ${err.text}`;
        }
      } else if (err.message) {
        userMessage = err.message;
      }
      
      setError(userMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return {
    formData,
    loading,
    success,
    error,
    handleChange,
    handleSubmit
  };
};