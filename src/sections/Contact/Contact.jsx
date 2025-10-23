import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContactForm } from '../../hooks/useContactForm';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiMapPin, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';

const ContactContainer = styled.section`
  min-height: 100vh;
  padding: 5rem 2rem;
  background: rgba(15, 23, 42, 0.9);
  position: relative;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Roboto Slab', serif;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactSubtitle = styled.h3`
  font-size: 1.5rem;
  color: #f8fafc;
  margin-bottom: 1rem;
`;

const ContactDescription = styled.p`
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2563eb;
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #f8fafc;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  color: #f8fafc;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: #64748b;
  }
`;

const TextArea = styled.textarea`
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  color: #f8fafc;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: #64748b;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
`;

const Contact = () => {
  const { t } = useTranslation();
  const { formData, loading, success, error, handleChange, handleSubmit } = useContactForm();

  const contactInfo = [
    {
      icon: <FiMapPin />,
      label: 'Location',
      value: 'Ouezzane, Morocco',
      link: 'https://www.google.com/maps/place/Ouazzane/@34.8063393,-5.6151406,13z/data=!3m1!4b1!4m6!3m5!1s0xd0af214a9a5c247:0x78e0bca6569eeaf0!8m2!3d34.7971926!4d-5.5789576!16zL20vMDJzdjN3?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'bahaekenik@email.com',
      link: 'mailto:bahaekenik@email.com'
    },
    {
      icon: <FiPhone />,
      label: 'Phone',
      value: '+212 6 04 34 16 69',
      link: 'tel:+212604341669'
    }
  ];

  const socialLinks = [
    {
      icon: <FiLinkedin />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bahae-kenikssi-40414021b/'
    },
    {
      icon: <FiGithub />,
      label: 'GitHub',
      url: 'https://github.com/BAHAEKENIK'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const formVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  return (
    <ContactContainer id="contact">
      <Container>
        <SectionTitle
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('contact.title')}
        </SectionTitle>

        <ContactContent>
          <ContactInfo
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div>
              <ContactSubtitle>{t('contact.subtitle')}</ContactSubtitle>
              <ContactDescription>
                I'm always interested in new opportunities and collaborations. 
                Whether you have a project in mind or just want to say hello, 
                feel free to get in touch!
              </ContactDescription>
            </div>

            <ContactItems>
              {contactInfo.map((item, index) => (
                <ContactItem
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ContactIcon>
                    {item.icon}
                  </ContactIcon>
                  <ContactText>
                    <ContactLabel>{item.label}</ContactLabel>
                    <ContactValue>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </ContactValue>
                  </ContactText>
                </ContactItem>
              ))}
            </ContactItems>

            <div>
              <ContactLabel style={{ marginBottom: '1rem' }}>
                Follow Me
              </ContactLabel>
              <SocialLinks>
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </SocialLink>
                ))}
              </SocialLinks>
            </div>
          </ContactInfo>

          <ContactForm
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onSubmit={handleSubmit}
          >
            <FormGroup variants={itemVariants}>
              <Label htmlFor="name">
                <FiUser size={16} style={{ marginRight: '0.5rem' }} />
                {t('contact.name')}
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name')}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="email">
                <FiMail size={16} style={{ marginRight: '0.5rem' }} />
                {t('contact.email')}
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email')}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="message">
                <FiMessageSquare size={16} style={{ marginRight: '0.5rem' }} />
                {t('contact.message')}
              </Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                required
                disabled={loading}
              />
            </FormGroup>

            {success && (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {t('contact.success')}
              </SuccessMessage>
            )}

            {error && (
              <ErrorMessage
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {t('contact.error')}
              </ErrorMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.05 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FiSend />
                  </motion.div>
                  {t('contact.sending')}
                </>
              ) : (
                <>
                  <FiSend />
                  {t('contact.send')}
                </>
              )}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactContainer>
  );
};

export default Contact;