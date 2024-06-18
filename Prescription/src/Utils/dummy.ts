// app.post('/upload', upload.single('prescription'), async (req, res) => {
//     //@ts-ignore
//     if (!req.file) {
//         res.status(400).json({
//             message: "No file sent"
//         })
//     }
//     else{
//         try {
//             //@ts-ignore
//             const worker = createWorker({
//                 logger: m => console.log(m)
//               });
               
//               (async () => {
//                 await worker.load();
//                 await worker.loadLanguage('eng');
//                 await worker.initialize('eng');
//                 const { data: { text } } = await worker.recognize('https://basicmedicalkey.com/wp-content/uploads/2016/06/image00565-1.jpeg');
//                 console.log(text);
//                 await worker.terminate();
//                 res.json(text)
//               })();
            
    
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 message: "An unknown error occurred"
//             })
//         }
//     }
//   });

//   function extractMedicineNames(text:any) {
//     // This is a placeholder function. In a real application,
//     // you would use an NLP library or service to extract medicine names.
//     const medicines = ['Paracetamol', 'Ibuprofen', 'Amoxicillin']; // Example medicines
//     const foundMedicines = medicines.filter((medicine) =>
//       text.includes(medicine)
//     );
//     return foundMedicines;
//   }



// app.post('/api/upload', async (req, res) => {
//   try {
//     //@ts-ignore
//    // const imagePath = path.join(__dirname, req.file.path);
//    const imagePath = "https://c.ndtvimg.com/2022-09/2tcj87po_doctor-neat-prescription-650_625x300_28_September_22.jpg";
//     preprocessImage(imagePath);

//     // Perform OCR using Tesseract.js
//     const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', { logger: (m: any) => console.log(m) });


//     const lines = text.split('\n');
//     const medicines: any[] = [];

//     lines.forEach((line: string) => {
//       const words = line.split(' ');
//       words.forEach(word => {
    
//           medicines.push(word);
        
//       });
//     });
//     fs.unlinkSync(imagePath);

//     res.status(200).json({ medicines });
//   } catch (error) {
//     console.error('Error processing the prescription:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// const preprocessImage = (imagePath: any) => {
//   let src = cv.imread(imagePath);
//   cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
//   cv.GaussianBlur(src, src, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
//   cv.threshold(src, src, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
//   cv.imwrite(imagePath, src);
//   src.delete();
// };



// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
//     cb(null, 'uploads/')
//   },
//   filename: function (_req: any, file: { fieldname: string; originalname: string; }, cb: (arg0: null, arg1: string) => void) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({ dest: 'uploads/', storage });
// app.get("/", (req: Request, res: Response) => {
// res.send("Express + TypeScript Server");
// });