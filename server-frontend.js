const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

// Serve static files
app.use('/html', express.static(path.join(__dirname, 'public', 'html')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/themes', express.static(path.join(__dirname, 'src', 'template', 'themes')));

// Routes redirect
app.get('/', (req, res) => {
  res.redirect('/html/index.html');
});

app.get('/login', (req, res) => {
  res.redirect('/html/login.html');
});

app.get('/admin', (req, res) => {
  res.redirect('/html/admin.html');
});

app.listen(PORT, () => {
  console.log(`🎨 Frontend Server running on http://localhost:${PORT}`);
  console.log(`📡 API calls will be made to http://localhost:3000`);
});
