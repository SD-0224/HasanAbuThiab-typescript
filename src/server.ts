import app from './app';
import path from 'path';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../public', 'views'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
