import * as Server from 'socket.io';
import {Store} from 'redux';
import {VotingServerState} from './core';

export default function startServer(store: Store<VotingServerState>) {
    const io: SocketIO.Server = Server().attach(8090);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket: SocketIO.Socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}