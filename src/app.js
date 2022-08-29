var express = require('express');
var app = express();

express.json();

app.get('/', (req, res) => {
  console.log("here!")
  res.json({success: true});
})

app.post('/file-upload', (req, res) => {
  console.log("in post request");
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await fileType.fromBuffer(buffer);

    
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
  
  res.json({success: true});
})

app.listen(3000, () => {
  console.log('Server is up on port '+ 3000);
})