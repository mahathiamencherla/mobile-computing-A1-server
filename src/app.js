var express = require('express');
var app = express();

express.json();
var bodyParser = require('body-parser');
var multer = require('multer');
var forms = multer();
const fs = require("fs");
// apply them

app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log("Server is up!")
  res.json({success: true});
})

app.post('/file-upload', (req, res) => {
  const { image, category } = req.body;

  try {
    const buffer = Buffer.from(image, "base64");

    var dir = "images/" + category
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dir + "/" + Date.now() + ".JPEG", buffer)

  } catch (e) {
    console.log("Image upload into folder error ", e);
    res.json({success: false});
  }
  

  res.json({success: true});
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is up on port '+ 3000);
})