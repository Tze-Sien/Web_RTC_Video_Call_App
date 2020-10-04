navigator.getUserMedia({
    video: true,
    audio: true,
},function(stream){

    let Peer = require('simple-peer');
    let peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    });

    peer.on('signal', function(data){
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', function() {
        console.log("connect clicked")
        let otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId);
    })


    document.getElementById('send').addEventListener('click', function(){
        let yourMessage = document.getElementById('yourMessage').value;
        peer.send(yourMessage);
    })

    peer.on('data',function(data){
        document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream', function(stream){
        let video = document.createElement('video');
        document.body.appendChild(video);
        video.srcObject = stream;
        video.play();
    })

},function(err){
        console.error(err);
});