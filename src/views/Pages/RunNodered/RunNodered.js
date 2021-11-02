var Docker = require('dockerode');
var dockerHostIP = "192.168.56.103"
var dockerHostPort = 2375
 
var docker = new Docker({ host: dockerHostIP, port: dockerHostPort });
 
docker.listContainers({ all: true }, function (err, containers) {
    //console.log('Total number of containers: ' + containers.length);
    containers.forEach(function (container) {
        console.log("Container" +container.Names +- "current status" + container.Status +- "based on image" + container.Image)
    })
});