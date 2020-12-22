// Authorization Routes

export const registerAccount = async (username, password) => {
  const response = await fetch('http://localhost:3333/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const json = await response.json();
  return json.jwt;
}

export const login = async (username, password) => {
  const response = await fetch('http://localhost:3333/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const json = await response.json();
  return json.jwt;
}

// Conversations

export const getConversations = async (userId) => {
  const jwt = localStorage.getItem('jwt');
  const response = await fetch(`http://localhost:3333/user/${userId}/conversations`, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  });
  return response.json();
}

// Messages

export const getMessages = async (conversationId) => {
  const jwt = localStorage.getItem('jwt');
  const response = await fetch(`http://localhost:3333/conversation/${conversationId}/messages`, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  });
  return response.json();
}