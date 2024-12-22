
function customResponse(res,message,data=null, statusCode=400,  success=false) {
    return res.status(statusCode).json({
      success: success,
      message: message,
      data: data,
    });
  }
 
  export default customResponse;