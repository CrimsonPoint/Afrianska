const modal_btn = document.querySelector('.talk_btn');
const modal = document.querySelector('.modal');
const modal_close_btn = document.querySelector('.modal__closebtn');
const body = document.querySelector('body');
const popup = document.querySelector('.popupForModal');
const popup_close_btn = document.querySelector('.popupForModal');


modal_btn.addEventListener('click', function(){
    modal.classList.add('open');
    body.classList.add('modal-block');
});

popup_close_btn.addEventListener('click', function(){
    popup.classList.remove('open');
    body.classList.remove('modal-block');
});

modal_close_btn.addEventListener('click', function(){
    modal.classList.remove('open');
    body.classList.remove('modal-block');
});

modal.addEventListener('click', event => {
    if(event.target.classList == 'modal open')
    {
        modal.classList.remove('open');
        body.classList.remove('modal-block');
    }
})

popup.addEventListener('click', event => {
    if(event.target.classList == 'popupForModal open')
    {
        popup.classList.remove('open');
        body.classList.remove('modal-block');
    }
})

/* валидация */

const userName = document.getElementById('user_name');
const userEmail = document.getElementById('user_email');
const userMessage = document.getElementById('user_message');

const messageErrorElement = document.getElementById('user_message__errorMessage');
const usernameErrorElement = document.getElementById('user_name__errorMessage');
const emailErrorElement = document.getElementById('user_email__errorMessage');

const form = document.getElementById('form');
const validateElements = [userName,userEmail,userMessage];
const errorElements = [usernameErrorElement,emailErrorElement,messageErrorElement];
const regularStringForValidate = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu; 


userName.addEventListener('input', event => {
    if(userName.value.trim() == ''){
        userName.classList.add('validateRejected');
    }
    else{
        userName.classList.remove('validateRejected');
    }
})


for (let i = 0; i < validateElements.length; i++) {
    validateElements[i].addEventListener('input', event => {3
        let email = userEmail.value.trim();
        if(validateElements[i].value.trim() == ''){
            validateElements[i].classList.add('validateRejected');
            errorElements[i].classList.add('errMessageVisible');
        }
        else{
            if(i == 1 && !regularStringForValidate.test(userEmail.value.trim())){
                validateElements[i].classList.add('validateRejected');
                console.log(!regularStringForValidate.test(email));
                emailErrorElement.classList.add('errMessageVisible');
                return;
            }
            validateElements[i].classList.remove('validateRejected');
            errorElements[i].classList.remove('errMessageVisible');
            
        }
    })
}


form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log('!!!')
    if(validate())
    {
        const formData = new FormData(form);
      fetch('local', {
        method: 'POST',
        body: formData
      })
      .then(() => {

        modal.classList.remove('open');
        body.classList.remove('modal-block');
        popup.classList.add('open');
        validateElements.forEach(element => {
            element.value = '';
        });
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
    }
});



function validate(){
    let flag = true;

    let name = userName.value.trim();
    if(name === ''){
        flag = false;
        userName.classList.add('validateRejected');
        usernameErrorElement.classList.add('errMessageVisible');
    }
    
    let email = userEmail.value.trim();
    if(email == '' || !regularStringForValidate.test(email)){
        flag = false;
        userEmail.classList.add('validateRejected');
        emailErrorElement.classList.add('errMessageVisible');
    }

    let message = userMessage.value.trim();
    if(message === '')
    {
        flag = false;
        userMessage.classList.add('validateRejected');
        messageErrorElement.classList.add('errMessageVisible');
    }

    return flag;
}


