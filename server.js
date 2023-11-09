// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/memo', (req, res) => {
  fs.readFile('memo.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read memo file' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/memo', (req, res) => {
  const memo = req.body.memo;
  if (!memo) {
    res.status(400).json({ error: 'Memo is required' });
  } else {
    fs.readFile('memo.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Failed to read memo file' });
      } else {
        const memoList = JSON.parse(data);
        memoList.push(memo);
        fs.writeFile('memo.json', JSON.stringify(memoList), (err) => {
          if (err) {
            res.status(500).json({ error: 'Failed to write memo file' });
          } else {
            res.json({ message: 'Memo saved successfully' });
          }
        });
      }
    });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
