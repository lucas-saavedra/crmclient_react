
import Header from './Header'
import Sidebar from './Sidebar'


const Dashboard = ({ children }) => {

    return (
        <>
            <div className='sm:flex '>
                <Sidebar />
                <main className="sm:w-full xl:w-4/5 sm:min-h-screen  p-5" >
                    <Header />
                    {children}
                </main>

            </div>
        </>
    )
}

export default Dashboard;