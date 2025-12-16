
const authFn = (req,res,next)=>{
    console.log("auth called")
    if(req.query.password === "1234"){
        next()
    }else{
        res.status(401).send("unauthorised request")
    }
    
}

module.exports = authFn;