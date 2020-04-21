import http from 'http';
import app from './app';

const pid = process.pid;

const server = http.createServer(app)
    .listen(3000, () => console.log(`Worker started. Pid: ${pid}`));

process.on('SIGINT', () => {
    console.log('Signal is SIGINT');
    server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
    console.log('Signal is SIGTERM');
    server.close(() => process.exit(0));
});

process.on('SIGUSR2', () => {
    console.log('Signal is SIGUSR2');
    server.close(() => process.exit(1));
});
