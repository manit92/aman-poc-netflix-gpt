export  const checkValidData = (email, password, name = null) => {
    
    const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    

    
    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is not valid";

    if (name !== null) { // Check if the name parameter is provided
        const isNameEmpty = name.trim().length > 0;
        const isNameValid = /^[A-Z][a-zA-Z]*([ '-][A-Z][a-zA-Z]*)*$/.test(name);
        if (!isNameEmpty) return "Name cannot be empty";
        if(!isNameValid) return "Name is not valid";
    }
    

    return null;
};

