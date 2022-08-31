let sendButton = document.getElementById("submitButton");

sendButton.onclick = sendMail;

function sendMail() {
  let params = {
    subject: document.getElementById("seleccione").value,
    from_name: document.getElementById("nombre").value,
    email_id: document.getElementById("email").value,
    message: document.getElementById("mensaje").value,
  };
  if (params.from_name != "" && params.email_id != "" && params.message != "") {
    emailjs.send("service_aq7mtds", "template_hl2k34u", params).then((res) => {
        Swal.fire({
            icon: 'success',
            title: 'Ya recibimos tu mensaje!',
            showConfirmButton: false,
            timer: 1600
          });
    }, (error)=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',
            footer: 'Error: '+error.status,
            showConfirmButton: false,
            timer: 1600
          })
    });
  } else {
    Swal.fire({
        icon: 'warning',
        title: 'Necesitamos que completes todos los campos',
        showConfirmButton: false,
        timer: 1600
      });
  }
}
