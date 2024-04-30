//promising function

const asynchandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) =>next(err)
    );
  };
};
export { asynchandler };







//using higher order function
// const asynchandler=()=>{}
// const asynchandler=(func)=>()=>{}
// const asynchandler =(fn)=>(()=>{})
// const asynchandler =(fn)=>async ()=>{}

// const asynchandler =(fn)=>async(req,res,next)=>{
//     try {
// await fn (req,res,next)
//     } catch (error) {
//         console.log("Error aye hai dekhiye:",error);
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })

//     }
// }
