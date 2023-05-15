interface User {
    name: string
    age: number
}


function saveUserToDatabase(user: User) {
    // save
    console.log(user)
}

saveUserToDatabase({
    name: "David Hombe",
    age: 25
});