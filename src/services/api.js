import axios from 'axios';


const UPLOAD_IMG_URL = 'http://localhost:3000/api/expenses/action/uploadDoc'
const PROFILE_URL = 'http://localhost:3000/api/users/profile'

export const getUserProfile = async () => {
    try {
      const response = await axios.get(PROFILE_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to load profile. Please log in again.');
    }
};

export const uploadImage = async (selectedFile, expenseId, docTypeId) => {
  const formData = new FormData();
  formData.append('image', selectedFile);
  formData.append('expenseId', expenseId);
  formData.append('docTypeId', docTypeId);
  try {
    await axios.post(UPLOAD_IMG_URL, formData, { withCredentials: true });
    return 'Image uploaded successfully!';
  } catch (error) {
    console.log(error)
    throw new Error('Failed to upload image.');
  }
};


export const fetchExpenses = async (ticketId) => {
  try {
    const response = await fetch(`/api/tickets/info/expenses?ticketId=${ticketId}`, 
      {method: 'GET', credentials: 'include'});
    return response.json()
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load tickets.');
  }
};

export const fetchExpense = async (expenseId) => {
  try {
    const response = await fetch(`/api/expenses/crud?expenseId=${expenseId}`,
      {method: 'GET', credentials: 'include'});
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load expense.');
  }
}

export const createTicket = async () => {
  try {
    const response = await fetch('/api/tickets/crud', {
      method: 'POST',
      credentials: 'include'
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create ticket.');
  }
}

export const createExpense = async (id) => {
  try{
    const response = await fetch('/api/expenses/crud', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"ticketId": id}),
      credentials: 'include'
    });
    
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create ticket.');
  }
}

export const deleteExpense = async (expenseId) => {
  try {

      const response = await fetch(`/api/expenses/crud?expenseId=${expenseId}`, {
          method: 'DELETE',
      });
      if (response.status !== 200) {
          throw new Error('Error deleting Expense');
      }
  } catch (error) {
      console.error('Error deleting expense:', error);
  }
};

export const updateExpense = async (expenseId, data) => {
  try {
    const response = await fetch(`/api/expenses/crud?expenseId=${expenseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update expense.');
  }
}

export const fetchCategories = async () => {
  try {
    const response = await fetch('/api/expenses/categories', 
      {method: 'GET', credentials: 'include'});
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load categories.');
  }
}

export const fetchRequestedDocs = async (categoryId) => {
  try {
    const response = await fetch(`/api/categories/docs?categoryId=${categoryId}`, 
      {method: 'GET', credentials: 'include'});
    response.status === 404 && console.log('No docs requested for this category');
    response.status === 500 && console.log('Server error');
    response.status === 200 && console.log('Docs requested');
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load docs.');
  }
}

export const sendTicket = async (ticketId) => {
  try {
    const response = await fetch(`/api/tickets/action/send?ticketId=${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ticketId: ticketId }),
      credentials: 'include'
    });
    if (response.status === 400){
      const error = await response.json();
      console.log(error.missingDocTypes)
      throw new Error('Failed to send ticket. ' + error.message +" "+ (error.missingDocTypes?.join(', ')?? ""));
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export const fetchTicketsInfo = async (params) => {
  try {
    const response = await fetch("/api/tickets/info?" + new URLSearchParams(params), 
      {method: 'GET', credentials: 'include'});
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load tickets.');
  }
}

export const fetchExecutives = async () => {
  try {
    const response = await fetch('/api/executives', 
      {method: 'GET', credentials: 'include'});
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load executives.');
  }
}

export const assignTickets = async (executiveId, tickets) => {
  try {
    console.log(executiveId, tickets)
    const response = await fetch('/api/executives/action/assignTickets', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ executiveId, tickets, notify: true }),
      credentials: 'include'
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to assign tickets.');
  }
}

export const removeTicket = async (tickets, executiveId) => {
  try {
    const response = await fetch(`/api/executives/action/removeTickets`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ executiveId, tickets, notify: true }),
      credentials: 'include'
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove ticket.');
  }
}

export const fetchPartner = async (partnerId) => {
  try {
    const response = await fetch(`/api/partners/crud?partnerId=${partnerId}`, 
      {method: 'GET', credentials: 'include'});
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load partner.');
  }
}

export const declineExpense = async (expenseId, comments) => {
  const response = await fetch(`/api/expenses/action/decline`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ expenseId, comments }),
    credentials: 'include'
  });
  return response.json();
}

export const acceptExpense = async (expenseId, payment) => {
  console.log(payment)
  const response = await fetch(`/api/expenses/action/accept`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ expenseId, payment }),
    credentials: 'include'
  });
  return response.json();
}

export const getArancel = async () => {
  
  try {
    const response = await fetch('/api/partners/crud',
    {method: 'GET', credentials: 'include'});
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }

}

