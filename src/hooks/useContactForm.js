import { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing again
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
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all fields');
      }

      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Prepare additional template variables
      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      });
      const firstLetter = formData.name.charAt(0).toUpperCase();
      const currentYear = now.getFullYear();

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: timeString,
          firstLetter: firstLetter,
          currentYear: currentYear
        },
        EMAILJS_CONFIG.publicKey
      );

      if (result.status === 200) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Email sending error:', err);
      
      // Provide user-friendly error messages
      if (err.text?.includes('Invalid template ID') || err.text?.includes('Invalid service ID')) {
        setError('Email service configuration error. Please contact me directly at bahaekenikssi@email.com');
      } else if (err.text?.includes('Public key is invalid')) {
        setError('Email service configuration error. Please contact me directly at bahaekenikssi@email.com');
      } else {
        setError(err.message || 'Failed to send message. Please try again or contact me directly at bahaekenikssi@email.com');
      }
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
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