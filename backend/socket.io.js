const { Server } = require('socket.io');
const Document = require('./models/Document');
const { updateDocument } = require('./controllers/document');
const jwt = require('jsonwebtoken');

function initializeSocket(server) {
    const io = new Server(server, {
        cors: { origin: '*' },
    });

    // Add middleware to authenticate socket connections
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userInfo = decoded; // Store user info in socket
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', function (socket) {
        // console.log('Authenticated connection', socket.id, 'User:', socket.userInfo);

        socket.on('join-document', async function (documentId) {
            socket.join(documentId);

            let document = [];
            try {
                document = await Document.findById(documentId);
            } catch (error) {
                console.log(error);
            }
            socket.emit('load-document', document);
        });

        // Rest of your socket event handlers...
        socket.on('send-changes', function ({ id, content }) {
            socket.to(id).emit('receive-changes', { ...content, id });
            updateDocument({ ...content, id });
        });

        socket.on('on-typing', async function ({ id }) {
            socket.to(id).emit('on-typing-response', { id: id, userInfo: socket.userInfo });
        });

        socket.on('disconnect', function () {
            console.log('disconnect', socket.id);
        });
    });

    return io;
}

module.exports = initializeSocket;