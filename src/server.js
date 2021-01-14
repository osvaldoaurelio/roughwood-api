const app = require('./app');

const { server } = require('./config/app');

app.set('port', server.port || 3030);

app.listen(app.get('port'), () => {
  console.log(`Server is running at port ${app.get('port')}`)
});
