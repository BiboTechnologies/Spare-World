// Get the modal element
var modal = document.getElementById("cameraModal");
var uploadedImage = document.getElementById("uploadedImage")
// Get the button that opens the modal
var openCameraButton = document.getElementById("openCameraButton");

// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
openCameraButton.onclick = function() {
    // Activate the camera preview
    initializeCamera();
    modal.style.display = "block";
}

closeButton.onclick = function() {
    // Close the camera
    stopCamera();
    modal.style.display = "none";
    
    // Clear the uploaded image
    uploadedImage.src = ''; // Set src attribute to an empty string to clear the image
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        // Close the camera
        //stopCamera();
       // modal.style.display = "none";
    }
}

// Shutter button functionality
var cameraPreview = document.getElementById("cameraPreview");
var shutterButton = document.getElementById("shutterButton");




shutterButton.onclick = function() {
    // Capture picture from camera preview
    var canvas = document.createElement('canvas');
    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;
    canvas.getContext('2d').drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
    var imageDataUrl = canvas.toDataURL('image/jpeg');

    // Display the captured image
    var uploadedImage = document.getElementById("uploadedImage");
    uploadedImage.src = imageDataUrl;

    // Close the camera
    stopCamera();
    //modal.style.display = "none";

    // Send the image data to the server for processing
    searchWithGoogleLens(imageDataUrl);
}

function searchWithGoogleLens(imageDataUrl) {
    fetch('https://bibospareworld.com/search', {
        method: 'POST',
        body: JSON.stringify({ imageDataUrl: imageDataUrl }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the response from the server
        console.log('Search results:', data);
        // Display the search results or provide feedback to the user
    })
    .catch(error => {
        console.error('Error:', error);
        // Display error message in the modal
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.style.display = 'block';
    });
}









function initializeCamera() {
    // Define constraints to prioritize the back camera
    var constraints = {
        video: {
            facingMode: { ideal: 'environment' } // Use the back camera
        }
    };

    // Initialize camera preview with constraints
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        cameraPreview.srcObject = stream;
        cameraPreview.play();
    })
    .catch(function(err) {
        console.error('Error accessing camera:', err);
    });
}


function stopCamera() {
    // Stop camera preview
    if (cameraPreview.srcObject) {
        var tracks = cameraPreview.srcObject.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
        cameraPreview.srcObject = null;
    }
}