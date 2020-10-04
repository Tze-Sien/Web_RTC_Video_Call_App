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

    if(location.hash === '#init'){
        document.getElementById("header").innerHTML  += "(Host)"
        document.getElementById("myid").innerHTML  += "<small>Send This id to Your Peers</small>"
    }

    if(location.hash !== '#init'){
        document.getElementById("header").innerHTML  += "(Attendees)"
        document.getElementById("peerid").innerHTML  += "<small>Paste host id here & click connect, send your id back to host</small>"
    }

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
        let flex = document.getElementById('flex');
        flex.appendChild(video);
        video.srcObject = stream;
        video.play();
    })

},function(err){
        console.error(err);
});