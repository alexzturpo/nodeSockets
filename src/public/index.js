const socket = io() 
const username = document.getElementById('username')
const write_message = document.getElementById('write_message')
const newUser = document.getElementById('newUser')
const escribiendoUser = document.getElementById('escribiendoUser')

write_message.addEventListener('keyup',(e)=>{
    if(e.code == 'Enter'){
        if(username.value != '' && write_message.value != ''){
            // console.log(write_message.value)
            socket.emit('message', {
                username : username.value,
                message : write_message.value.slice(0,-1)
            })
            write_message.value = ''
        }else{
            console.log('Completas los campos') 
        }
    }
})
write_message.addEventListener('keydown',(e)=>{
    if(username.value != ''){
        socket.emit('escribiendo',username.value)
    }
})
socket.on('userEscribiendo', user =>{
    escribiendoUser.innerHTML = `${user} escribiendo...`
    setTimeout(()=>{
        escribiendoUser.innerHTML = ''
    },1000)
    console.log(sms)
})
socket.on('new_user',(sms)=>{
    newUser.innerHTML = sms
    setTimeout(()=>{
        newUser.innerHTML = ''
    },5000)
    console.log(sms)
})
socket.on('messages',(messages)=>{
    const $all_messages = document.getElementById('all-messages')
    $all_messages.textContent = ''
    $fragment = document.createDocumentFragment();
    console.log('mensajes',messages)
        messages.forEach(el => {
            const $sms = document.createElement("p");
            $sms.textContent = `${el.username}: ${el.message}`;
            
            $fragment.appendChild($sms); //insertando todas las iteraciones en el fragmente para no consumir muchos recursos
        });

    $all_messages.appendChild($fragment);
    $all_messages.scrollTop = $all_messages.scrollHeight;
})