import { serveHttp } from './http';
import './webSocket';

const port = 3001;

serveHttp.listen(port, () => {
  console.log();
  console.log(`Executando na porta ${port}`);
  console.log(`CTRL + Clique em http://localhost:${port}`);
});
