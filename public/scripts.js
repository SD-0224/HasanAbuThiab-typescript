async function resizeImage(filename) {
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

    try {
      const response = await fetch(`/resize/${filename}`, {
        method: 'PUT', // Using PUT method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ width, height }), // Sending width and height as JSON in the request body
      });
  
      if (!response.ok) {
        throw new Error('Image resize failed. Please try again.');
      }
  
      console.log('Image resized successfully');
      window.location.href = "/";
      // Handle success as needed
    } catch (error) {
      console.error('Error resizing image:', error.message);
      // Handle errors as needed
    }
  }