import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

dotenv.config();

const upload = multer({ dest: 'uploads/' });

app.post('/chat', async (req,res) =>{
  const userMessage = req.body.question;
  console.log(userMessage);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: userMessage }
      ],
      max_tokens: 150
    })
  });

  console.log(response);

  if(response.status === 200){
    const data = await response.json();
    console.log(data.choices[0].message.content);
    res.json({answer: data.choices[0].message.content});
  }


  
});

app.post('/upload-images', upload.array('images', 10), (req,res) =>{
  const files = req.files;
  console.log("kuvat vastaanotettu")
  console.log(files);

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'Kuvia ei ole lisätty/löydy' });
  }
  else{
    res.json({message: 'Kuvat vastaanotettu'});
  }
  

});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
