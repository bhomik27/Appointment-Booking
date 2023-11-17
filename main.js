async function addUser(event) {
  try {
    event.preventDefault();

    let name = event.target.name.value;
    let number = event.target.num.value;
    let email = event.target.email.value;

    let User = {
      name,
      email,
      number
    };

    const response = await axios.post("http://localhost:3000/user/add-user", User);
    printUser(response.data);
    
    // Clear input fields after successful submission
    event.target.name.value = '';
    event.target.num.value = '';
    event.target.email.value = '';

    console.log(response);
  } catch (err) {
    console.error('Error:', err.message);
  }
}


window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/users");
    console.log(response);

    for (var i = 0; i < response.data.length; i++) {
      printUser(response.data[i]);
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
});

async function printUser(User) {
  const parentElement = document.getElementById('users');
  const childElement = document.createElement('li');

  childElement.innerHTML = `name:${User.name} <br> number: ${User.number} <br> email: ${User.email} <br>`;

  const deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  deleteButton.style.fontWeight = 'bold';

deleteButton.onclick = async () => {
  try {
    await axios.delete(`http://localhost:3000/user/delete-user/${User.id}`);
    // Assuming the delete request is successful, remove the user from the frontend
    parentElement.removeChild(childElement);
  } catch (error) {
    console.log('Error deleting user:', error.message);
    // Handle the error gracefully, e.g., display an error message to the user
    // You might want to add a more user-friendly error handling mechanism here
  }
};


const editButton = document.createElement('input');
editButton.type = 'button';
editButton.value = 'Edit';
editButton.style.fontWeight = 'bold';

editButton.onclick = async () => {
  // Assuming you have input fields with ids 'name', 'email', and 'num'
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const numInput = document.getElementById('num');

  // Set input values to the current user's details
  nameInput.value = User.name;
  emailInput.value = User.email;
  numInput.value = User.number;



  parentElement.removeChild(childElement);

  const updateButton = document.createElement('input');
  updateButton.type = 'button';
  updateButton.value = 'Update';
  updateButton.style.fontWeight = 'bold';

  updateButton.onclick = async () => {
    const updatedUserData = {
      name: nameInput.value,
      email: emailInput.value,
      number: numInput.value
    };

    try {
      await axios.put(`http://localhost:3000/user/edit-user/${User.id}`, updatedUserData);
      // Assuming the above request is successful, you may want to update the displayed user details
      // by adding a new child element with the updated information.
      printUser(updatedUserData);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  childElement.appendChild(updateButton);
};

  parentElement.appendChild(childElement);
  childElement.appendChild(deleteButton);
  childElement.appendChild(editButton);
}
