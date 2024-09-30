document.getElementById('chatbot-send-button').addEventListener('click', sendChatMessage);

document.getElementById('chatbot-user-input').addEventListener('keypress', function (keyPressed) {
    if (keyPressed.key === 'Enter') {
        sendChatMessage();
    }
  });
  

function sendChatMessage() {
    console.log('viesti lähetetään');
    var userChatMessage = document.getElementById('chatbot-user-input').value;
    console.log(userChatMessage);
    document.getElementById('chatbot-user-input').value = '';
    addMessageToChatbox(userChatMessage); 

    const response = fetch('/get-question',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({question:userChatMessage})
    });
    
}

function addMessageToChatbox(message){
    console.log('viesti lisätään chatboxiin');
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    console.log(messageElement);
    document.getElementById('chatbox').appendChild(messageElement);


}
    