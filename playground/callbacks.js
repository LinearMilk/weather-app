var getUser = (id, callback) => {
  var user = {
    id: id,
    name: "Tom"
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(31, user => {
  console.log(user);
});
