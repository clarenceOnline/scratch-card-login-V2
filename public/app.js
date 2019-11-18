const codeInput = document.getElementById('code_input'),

alert = document.getElementById('server-response'),

    btn = document.getElementById('btn');

// (function validate() {
//     'use strict';
//     window.addEventListener('load', function () {
//         const forms = document.getElementsByClassName('needs-validation')
//         const validation = Array.prototype.filter.call(forms, function (form) {
//             btn.addEventListener('click', function (e) {
//                 if (form.checkValidity() === false) {
//                     e.preventDefault();
//                     e.stopPropagation();
//                 }
//                 form.classList.add('was-validated');
//             }, false)
//         });
//     }, false);
// })();


btn.addEventListener('click', (e) => {
    e.preventDefault()

    if (codeInput.value === '') {
        showAlert('Please Enter The Correct Code', 'alert-danger');
        return;
    }

    btn.innerHTML = '<i class="fas fa-circle-notch fa-lg fa-spin"></i>';

    // setTimeout(() => {
        async function getResponse() {

            const code = codeInput.value;

            const serverResponse = await fetch(`https://scratch-card-login.herokuapp.com/api/codes/${code}`, {
                method: "delete",
                headers: {
                    "Content-type": "application/json"
                }
            });


            codeInput.value = '';
            return serverResponse;
        }


        getResponse()
        .then(res => {
            if (res.status === 200) {
                showAlert("Success", 'alert-success')

                btn.innerHTML = '';
                btn.textContent = "Submit";
            }
            else if (res.status === 404) {

                showAlert("Invalid Code", 'alert-danger')
                btn.innerHTML = '';
                btn.textContent = "Submit"
            }
           
        }).catch(err => {
            if (err) {
                showAlert(`${err.message}: Please Check Your Network Connection`, 'alert-warning');
                btn.innerHTML = '';
                btn.textContent = "Submit";
            }
        })
    // }, 2000);







});



function showAlert(message, className) {
    alert.style.display = '';
    alert.classList.add(className);
    alert.textContent = message;

    setTimeout(() => {
        alert.style.display = 'none';
        alert.classList.remove(className);
    }, 5000);
}