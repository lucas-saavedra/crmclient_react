import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USER } from "../graphql/queries/user.queries";
import Loading from "./Loading";



const Header = () => {
    const navigate = useNavigate();
    const { data, loading, errror } = useQuery(GET_USER);
    if (loading) { return <Loading /> }
    const { getUser } = data;
    if (!getUser) return navigate('/login')
    const { name, lastname } = getUser;
    const logOut = async () => {
        await localStorage.removeItem('token');
        return navigate('/login');
    }
    return (
        <div className='sm:flex justify-between mb-6'>
            <p className='mr-2 mb-5 lg:mb0'>Hello {name} {lastname} </p>
            <button
                onClick={() => logOut()}
                className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs text-white rounded py-1 px-2 shadow-md' type='button' >Logout</button>
        </div>
    )
}

export default Header;