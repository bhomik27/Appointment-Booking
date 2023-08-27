function saveToLocalStorage(event) {
    event.preventDefault();
    

    let name = event.target.name.value;
    let number = event.target.num.value;
    let email = event.target.email.value;


    let Appointment = {
      name ,
      email,
      number
  }
  
  axios.post("https://crudcrud.com/api/8069d71141b74fca863ded888f7893c5/appointmentData", Appointment)
    .then((response) => {
      printAppointment(response.data)
      console.log(response);
    })
    .catch((err) => {
    console.error(err);
  })

    // localStorage.setItem(name, JSON.stringify(Appointment));

    // printAppointment(Appointment);
}

window.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/8069d71141b74fca863ded888f7893c5/appointmentData")
    .then((response) => {
      console.log(response)

      for (var i = 0; i < response.data.length; i++){
        printAppointment(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error)})
    })

function printAppointment(Appointment){
    const parentElement = document.getElementById('Appointment');
    const childElement = document.createElement('li');
    

    childElement.innerHTML = `name:${Appointment.name} <br> number: ${Appointment.number} <br> email: ${Appointment.email} <br>`;


  const deleteButton = document.createElement('input');
  deleteButton.id = 'delete';
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
  deleteButton.style.fontWeight = 'bold';
    deleteButton.onclick = (_id) => {
        axios.delete(`https://crudcrud.com/api/8069d71141b74fca863ded888f7893c5/appointmentData/${Appointment._id}`)
            .then(() => {
                parentElement.removeChild(childElement);
            })
            .catch((error) => {
                console.log(error);
            });
    };

  const editButton = document.createElement('input');
  editButton.id = 'edit';
  editButton.type = 'button';
  editButton.value = 'Edit';
  editButton.style.fontWeight = 'bold';
  editButton.onclick =  (_id) => {
    document.getElementById('name').value = Appointment.name;
    document.getElementById('email').value = Appointment.email;
    document.getElementById('num').value = Appointment.number;

    axios.delete(`https://crudcrud.com/api/8069d71141b74fca863ded888f7893c5/appointmentData/${Appointment._id}`)
            .then(() => {
                parentElement.removeChild(childElement);
            })
            .catch((error) => {
                console.log(error);
            });

};

    
    parentElement.appendChild(childElement);
    childElement.appendChild(deleteButton);
    childElement.appendChild(editButton);
    
}

