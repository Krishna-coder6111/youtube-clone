import express from "express";
import ffmpeg from "fluent-ffmpeg";


const app = express();
const port = 3000;

app.post("/process-video", (req, res) => {
    
    //Get path of the input cideo file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    //Check if the input file path is defined
    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad request: Missing file path");
    }

    //Create a ffmpeg command
    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360") //360p
        .on("end", function() {
            console.log('Processing finished successfully');
            res.status(200).send("Processing finished successfully");
        })
        .on("error", function(err: any) {
            console.log('An error occurred: ' + err.message);
            res.status(500).send("An error occurred: " + err.message);
            })
            .save(outputFilePath);
        });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log('Video processing service listening  http://localhost:${port}');
});