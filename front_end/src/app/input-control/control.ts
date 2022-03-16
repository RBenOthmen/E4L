export function passwordControl(password : string, username : string, first_name : string , last_name : string, email : string) : string{
    let attributes = [username, first_name, last_name, email];
    let min_length = 8;
    if (password.length < min_length)
        return `Password must be at least ${min_length} caracters`;

    let intPwd = parseInt(password);
    if (isNaN(intPwd) == false)
        return `Your password can't be entirely numeric.`;

    for (let i = 0 ; i<attributes.length ; i++) {
        
    }

    return "";
}