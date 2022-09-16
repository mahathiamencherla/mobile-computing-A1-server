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
  console.log("here!")
  res.json({success: true});
})

app.post('/file-upload', (req, res) => {
  console.log("in post request");
  const buffer = Buffer.from(req.body.image, "base64");

  var dir = "images/" + req.body.category
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dir + "/" + Date.now() + ".JPEG", buffer)

  res.json({success: true});
})

app.listen(5000, () => {
  console.log('Server is up on port '+ 5000);
})