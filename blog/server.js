const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//App Config 
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//Data Storage
let posts = [] //stores blogs posts

//post route for delete 
app.post('/delete/:id', (req, res) => {
  const postId = req.params.id;
  posts = posts.filter(post => post.id !== postId);
  res.redirect('/');
});

//post route for edit
app.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).send('Post not found');
  }

  // Update the post's title and content
  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect(`/post/${postId}`);
});

// Get route for edit
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);

  if (post) {
    res.render('edit', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

// get route for post
app.get('/post/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

// get Route for compose
app.get('/compose', (req, res) => {
    res.render('compose');
});

//post route for compose
app.post('/compose', (req, res) => {
    const post = {
        id: Date.now().toString(),
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        createdAt: new Date().toLocaleString()
    };

    posts.unshift(post); // add new post to the beginning of the array
    res.redirect('/');
});

// Home Route
app.get('/', (req, res) => {
    res.render('home', { posts: posts });

});

// Server Start - Woohoo
const PORT = 3000;
app.listen(PORT, () => {
    console.log('This server is kicking at http:localhost:3000');

});