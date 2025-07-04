const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

let posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// New post form
app.get('/new', (req, res) => {
  res.render('new');
});

// Create new post
app.post('/new', (req, res) => {
  const post = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content
  };
  posts.unshift(post);
  res.redirect('/');
});

// Edit post form
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render('edit', { post });
});

// Update post
app.post('/edit/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    posts[index].title = req.body.title;
    posts[index].content = req.body.content;
  }
  res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});