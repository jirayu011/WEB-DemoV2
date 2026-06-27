class Storage {


static save(key,value){

Storage.save(
"theme",
"dark"
);

}


static get(key){

return JSON.parse(
localStorage.getItem(key)
);

}


static remove(key){

localStorage.removeItem(key);

}


}