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
  
  axios.post("https://crudcrud.com/api/277eadb9e3d94b8fa73efb94302f591a/appointmentData", Appointment)
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
  axios.get("https://crudcrud.com/api/277eadb9e3d94b8fa73efb94302f591a/appointmentData")
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
  deleteButton.style.backgroundColor = 'red';
    deleteButton.onclick = () => {
        localStorage.removeItem(Appointment.name)
        parentElement.removeChild(childElement)
    };

  const editButton = document.createElement('input');
  editButton.id = 'edit';
  editButton.type = 'button';
  editButton.value = 'Edit';
  editButton.style.fontWeight = 'bold';
  editButton.style.backgroundColor = 'green';
  editButton.onclick = () => {
    document.getElementById('name').value = Appointment.name;
    document.getElementById('num').value = Appointment.number;
    document.getElementById('email').value = Appointment.email;
  };

    
    parentElement.appendChild(childElement);
    childElement.appendChild(deleteButton);
    childElement.appendChild(editButton);
    
}

