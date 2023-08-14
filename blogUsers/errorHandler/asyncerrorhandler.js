module.exports.asyncErrorhandler = function(fn){
    return async function(req, res, next){
        try{
            await fn(req, res, next)
        }catch(err){
            console.log("error caught", err)
            res.json({data: null, success: false, message: err.message})
        }
    }
}