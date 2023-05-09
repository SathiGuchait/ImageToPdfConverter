const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const multer = require('multer');
const imgToPDF = require('image-to-pdf')
//const docxConverter = require('docx-pdf');
const app = express()


let storage = multer.diskStorage({
    destination: 'fileuplode/pictures',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uplode = multer({ storage: storage })

const pat = path.join(__dirname, "/project.html")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    // console.log(pat)
    res.sendFile(pat)
})

app.post('/con', uplode.array('photo', 300), (req, res) => {
    // console.log(req.files);

    const pages = req.files.map(a => a.path)
    const ar = pages.length
    // console.log(ar);
    // console.log(pages)


    res.writeHead(200, { 'content-type': 'application/pdf' })
    imgToPDF(pages, imgToPDF.sizes.A4).pipe(res)
    console.log('succesfully complete')

    /*
         const deleteFile= 'sathi/tithi/*'
         if (fs.existsSync(deleteFile)) {
         fs.unlink(deleteFile, (err) => {
         if (err) {its basically docxConverter(inputPath,outPath,function(err,result){
          if(err){
         console.log(err);
         }
         console.log('result'+result);
         });
             console.log(err);
             }
             console.log('deleted');})
         }
  
// if ((/\.doc?x$/i.test(pages)) && (ar == 1)) {

     docxConverter('./fileuplode/pictures/simple.docx', 'output.pdf', function (err, result) {
         if (err) {
             console.log(err);
         }
         console.log("succcessful");
        //res.sendFile('output.pdf')
     })
// }*/

})

app.listen(8081, () => {
    console.log("listenting to the 8081")
}) 