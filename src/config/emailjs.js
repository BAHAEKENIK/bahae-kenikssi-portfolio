// EmailJS Configuration
// You need to sign up at https://www.emailjs.com/ and get these values

export const EMAILJS_CONFIG = {
  // Replace these with your actual EmailJS credentials
  serviceId: 'service_1056uvd', // Found in EmailJS dashboard under "Email Services"
  templateId: 'template_1fqnkn5', // Found in EmailJS dashboard under "Email Templates"
  publicKey: 'JvC3xoPI8n5OQBelZ' // Found in EmailJS dashboard under "Account" > "API Keys"
};

// Instructions to set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add a new email service (Gmail, Outlook, etc.)
// 3. Create an email template with the following variables:
//    - {{from_name}}
//    - {{from_email}}
//    - {{message}}
//    - {{to_name}}
//    - {{reply_to}}
// 4. Copy your Service ID, Template ID, and Public Key
// 5. Replace the placeholder values above with your actual credentials
// 6. Test the contact form to make sure emails are sent successfully

export default EMAILJS_CONFIG;