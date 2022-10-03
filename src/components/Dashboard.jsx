
import Header from './Header'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';

const Dashboard = ({ children }) => {

    return (
        <>
            <div className='container-fluid  bg-dark text-white'>
                <div className="row">
                    <div className="col-md-4 col-sm-6">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5" >
                            <Header />
                            {children}
                        </main>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Dashboard;