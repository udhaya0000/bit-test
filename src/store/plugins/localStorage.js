var TOKEN = 'obmedia-token';

var initToken = localStorage[TOKEN];

var plugin = store => {
  store.subscribe(mutation => {
    switch (mutation.type) {
      case 'auth/setToken':
        localStorage[TOKEN] = mutation.payload;
        break;
      case 'auth/resetToken':
        localStorage.removeItem(TOKEN);
        break;
    }
  });
};

export default plugin;
export { initToken };
