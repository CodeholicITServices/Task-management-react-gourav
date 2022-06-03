import Notes from './Notes';
import { Link } from 'react-router-dom';

export const Home = () => {

    return (
        <div className='my-5 text-center'> 
            <Link className="btn btn-primary btn-lg m-5" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary btn-lg m-5" to="/signup" role="button">Signup</Link>
        </div>
    )
}