import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
    return (
        <div  className='flex  flex-col min-h-screen ' data-theme="light">
             <Helmet>
             
             <title>Error | MediCamp </title>
            
         </Helmet>
           
          <div className='flex flex-col justify-center items-center '>
          <h1 className=" lg:text-[400px] text-[#007EFF] text-[100px] font-bold text-background">
    Oops!
</h1>
<p className="text-4xl uppercase font-bold my-4">404 - page not Found</p>
<p className="text-xl w-2/4 text-center font-semibold mb-4">The page you are looking for might have been removed had its name changed or is temporary unavailable</p>

          <Link  className='btn flex text-white bg-[#007EFF] text-lg items-center w-72 justify-center border-white border btn-ghost'  to={'/'}> Back to home</Link>
          </div>
        </div>
    );
};

export default ErrorPage;