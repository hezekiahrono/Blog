

const express = require('express');

//const expphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const mysql = require('mysql');

const cors = require('cors');

  const multer = require('multer');
  
const path = require('path');
  

const app = express();


const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',  // allow dev origin
  // (add methods, credentials etc. if needed)
};
// app.engine('hbs', expphbs({extname:'.hbs'}));
//   app.set('view engine', 'hbs');

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

module.exports = app;

  

/* MySQL Connection */

const db = mysql.createConnection({

  host: 'localhost',

  user: 'root',

  password: '',

  database: 'posts_db'

});



  

/* Connect to MySQL */

db.connect(err => {

  if (err) {

    throw err;

  }

  console.log('Connected to MySQL');

});

  

/* Middleware */

app.use(bodyParser.json());

app.use(cors());
// app.use('/public/images', express.static(path.join(__dirname, 'public/images')));




  

/* Routes */

/* List all posts */

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images/'); // Directory where images will be stored
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname); // Unique filename
        }
    });
    app.use("/photos", express.static(path.join(__dirname, 'public/images')))

    const upload = multer({ storage: storage });

    // Define the upload endpoint
   app.post('/upload', upload.single('image'), (req, res) => {


       if (!req.file) {
           return res.status(400).send('No file uploaded.');
       }
       res.send({ message: 'File uploaded successfully', filename: req.file.filename });
   });

   app.get('/api/image/:filename', (req, res) => {
        const filename = req.params.filename;
        const imagePath = path.join(__dirname, 'public/images', filename); // Assuming 'uploads' directory
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                return res.status(404).send('Image not found');
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Adjust content type as needed
            res.end(data);
        });
    });

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });

 


       
   
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });

   

app.get('/posts', (req, res) => {

  db.query('SELECT * FROM blog_pics', (err, results) => {

    if (err) {

      res.status(500).send('Error fetching posts');

      return;

    }

    res.json(results);

  });

});

app.get('/blogs', (req, res) => {

  db.query('SELECT * FROM blog_pics', (err, results) => {

    if (err) {

      res.status(500).send('Error fetching posts');

      return;

    }

    res.json(results);

  });

});

app.get('/pics', async(req, res) => {


  db.query('SELECT image FROM blog_pics', (err, results) => {

    

    if (err) {

      res.status(500).send('Error fetching posts');

      return;

    }

    res.json(results);

  });

});




   

/* Create a new post */

app.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    const image = `/uploads/images/${req.file.filename}`; // Path to store in DB

    // Insert image URL into MySQL
    const { title, slug,body,date } = req.body;
    db.query('INSERT INTO blog_pics (title,body,slug,date,image) VALUES (?, ?, ?, ?,?)', 
      [title,body,slug,date,image], (err, result) => {
        if (err) {
            console.error('Error inserting image URL:', err);
            return res.status(500).send('Error saving image URL to database.');
        }
        res.status(200).json({ message: 'Image uploaded and URL saved!', image: image, title:title });
    });
});


app.post('/posts/create',(req, res) => {

   if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
   

  const { title, slug,body,date } = req.body;

  

  db.query('INSERT INTO posts (title, slug, body, date) VALUES (?, ?, ?, ?,?)', 
    [title,slug, body,date], (err, result) => {

    if (err) {

      res.status(500).send('Error creating post');

      return;

    }

    const postId = result.insertId;

    db.query('SELECT * FROM posts WHERE id = ?', postId, (err, result) => {

      if (err) {

        res.status(500).send('Error fetching created post');

        return;

      }

      res.status(201).json(result[0]);

    });

  });

});

  

/* Get a specific post */

app.get('/posts/:id', (req, res) => {

  const postId = req.params.id;

  db.query('SELECT * FROM posts WHERE id = ?', postId, (err, result) => {

    if (err) {

      res.status(500).send('Error fetching post');

      return;

    }

    if (result.length === 0) {

      res.status(404).send('Post not found');

      return;

    }

    res.json(result[0]);

  });

});

  

/* Update a post */

app.put('/posts/:id', (req, res) => {

  const postId = req.params.id;

  const { title,slug,body,date} = req.body;

  db.query('UPDATE posts SET title = ?, slug = ?,body = ?, date = ?, WHERE id = ?', [title, slug, body, date, postId], err => {

    if (err) {

      res.status(500).send('Error updating post');

      return;

    }

    db.query('SELECT * FROM posts WHERE id = ?', postId, (err, result) => {

      if (err) {

        res.status(500).send('Error fetching updated post');

        return;

      }

      res.json(result[0]);

    });

  });

});

  

/* Delete a post */

app.delete('/posts/:id', (req, res) => {

  const postId = req.params.id;

  db.query('DELETE FROM posts WHERE id = ?', postId, err => {

    if (err) {

      res.status(500).send('Error deleting post');

      return;

    }

    res.status(200).json({ msg: 'Post deleted successfully' });

  });

});

  

/* Start server */

app.listen(port, () => {

  console.log(`Server running on port ${port}`);

});