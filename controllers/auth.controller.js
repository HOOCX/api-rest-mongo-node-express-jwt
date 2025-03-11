
export const register = (req, res) => {
    // Register logic here
    //res.send('Registration successful');
    res.json({success: true});
    console.log(req.body);
}
export const login = (req, res) => {
    // Login logic here
    //res.send('Login successful');
    res.json({success: true});
}
