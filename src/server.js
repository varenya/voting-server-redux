import Server from 'socket.io';

export default function startServer(store){
	console.log("Starting socket server it port 5000...");
	const io = new Server().attach(5000);
	store.subscribe(
		() => io.emit('state',store.getState().toJS())
	);

	io.on('connection',(socket) => {
		socket.emit('state',store.getState().toJS());
		socket.on('action',store.dispatch.bind(store));
	});
}
