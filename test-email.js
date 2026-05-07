import { sendContactEmail } from './src/routes/api.send-email.js';

// Test the email functionality
async function testEmail() {
  try {
    console.log('Testing email functionality...');
    const result = await sendContactEmail({
      name: 'Test User',
      email: 'test@example.com',
      organisation: 'Test Company',
      message: 'This is a test message from the contact form.'
    });
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Email failed:', error);
  }
}

testEmail();