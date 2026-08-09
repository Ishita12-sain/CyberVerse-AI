import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`  CyberVerse AI Backend Active  `);
  console.log(`  Listening on port: ${PORT}     `);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=================================`);
});
