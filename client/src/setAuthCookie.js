const setAuthToken = token => {
  if(token)
  {
      document.cookie = `x-auth-cookie=${token};`
  }
  else if(!token)
  {
    document.cookie = 'x-auth-cookie=;'
  }
}

export default setAuthToken;