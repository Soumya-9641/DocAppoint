import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const multer = require('multer');
dotenv.config();
import path from 'path';
import { createWorker } from "tesseract.js";
//const upload = multer({ dest: 'uploads/' });
const app: Express = express();
const port = process.env.PORT || 9002;


import { removeFile } from './Utils/removeFile';
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
      cb(null, 'uploads/')
    },
    filename: function (_req: any, file: { fieldname: string; originalname: string; }, cb: (arg0: null, arg1: string) => void) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ dest: 'uploads/', storage });
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.post('/upload', upload.single('prescription'), async (req, res) => {
    //@ts-ignore
    if (!req.file) {
        res.status(400).json({
            message: "No file sent"
        })
    }
    else{
        try {
            //@ts-ignore
            const worker = createWorker({
                logger: m => console.log(m)
              });
               
              (async () => {
                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');
                const { data: { text } } = await worker.recognize('https://image.slidesharecdn.com/prescription-220805053821-4c2dd2a0/85/Prescription-pptx-17-320.jpg');
                console.log(text);
                await worker.terminate();
                res.json(text)
              })();
            
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "An unknown error occurred"
            })
        }
    }
  });

//   function extractMedicineNames(text:any) {
//     // This is a placeholder function. In a real application,
//     // you would use an NLP library or service to extract medicine names.
//     const medicines = ['Paracetamol', 'Ibuprofen', 'Amoxicillin']; // Example medicines
//     const foundMedicines = medicines.filter((medicine) =>
//       text.includes(medicine)
//     );
//     return foundMedicines;
//   }

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});