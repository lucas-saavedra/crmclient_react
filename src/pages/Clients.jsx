import Dashboard from "../components/Dashboard";
import { useQuery } from "@apollo/client";
import Client from "../components/Client";
import Loading from "../components/Loading";
import { GET_CLIENTS_SELLER } from "../graphql/queries/client.queries";
import { NavLink } from "react-router-dom";


const Clients = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER)
  if (loading === true) return <Loading />
  const { getClientsSeller } = data;

  return (
    <Dashboard>
      <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
      <NavLink to="/newclient" className="inline-block bg-blue-800 rounded py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold">
        New Client
      </NavLink>
      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white ">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Organization</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Edit</th>
              <th className="w-1/5 py-2">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {!data ? < p > No clients registered</p> :
              getClientsSeller.map((client, index) => (
                <Client key={client.id} client={client} />
              ))}
          </tbody>
        </table>
      </div>

    </Dashboard >
  )
}

export default Clients