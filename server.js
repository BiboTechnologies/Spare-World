const express = require('express');
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');

const app = express();
const port = 3000;

// Initialize the Google Vision client
const client = new vision.ImageAnnotatorClient();

app.use(bodyParser.json());

app.post('/search', (req, res) => {
    const imageDataUrl = req.body.imageDataUrl;

    // Perform image recognition using Google Vision API
    client
        .labelDetection(imageDataUrl)
        .then(results => {
            const labels = results[0].labelAnnotations;
            console.log('Labels:', labels);
            // Send the search results back to the client
            res.json({ labels: labels });
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
app.get('/', (req, res) => {
    res.send('Hello, world of Pearl!'); // Replace with your desired response
});
app.use(express.static('Bibo Phone Spare World'));
