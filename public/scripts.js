document.getElementById('chatbot-send-button').addEventListener('click', sendChatMessage);

document.getElementById('chatbot-user-input').addEventListener('keypress', function (keyPressed) {
    if (keyPressed.key === 'Enter') {
        sendChatMessage();
    }
  });

document.getElementById('send-images-button').addEventListener('click', sendImages);
  

async function sendChatMessage() {
    console.log('viesti lähetetään');
    var userChatMessage = document.getElementById('chatbot-user-input').value;
    console.log(userChatMessage);
    document.getElementById('chatbot-user-input').value = '';
    addMessageToChatbox("Minä: " + userChatMessage, "user-message"); 

    
        const response = await fetch('/chat',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({question:userChatMessage})
        });

        console.log(response);

        if(response.status === 200){
            const data = await response.json();
            console.log(data);
            addMessageToChatbox("ChatGPT: " + data.answer, "bot-message");
        }
        else{
            addMessageToChatbox("Tapahtui virhe. Yritä myöhemmin uudelleen.", "bot-message");
        }
    
}

function addMessageToChatbox(message, className){
    console.log('viesti lisätään chatboxiin');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.innerText = message;
    console.log(messageElement);
    document.getElementById('chatbox').appendChild(messageElement);


}

async function sendImages(){
    const imageInput = document.getElementById('image-files');
    const files = imageInput.files;
  
    if (files.length === 0) {
      alert('Valitse kuvia ensin.');
      return;
    }  

    console.log(files);

    const formData = new FormData();

    for (const file of files) {
        formData.append('images', file);
    }
    
    console.log(formData);
    //logataan että nähdään tiedostot
    console.log(formData.getAll('images'));

    const response = await fetch('/upload-images', {
        method: 'POST',
        body: formData
    })

    if(response.status === 200){
        const data = await response.json();
        console.log(data.message);
    }
    else{
        const data = await response.json();
        console.log(data);
        alert(data.error);
    }

  }
  
    