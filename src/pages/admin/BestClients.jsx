
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Dashboard from '../../components/Dashboard';
import { BEST_CLIENTS } from '../../graphql/queries/admin.queries';


const BestClients = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_CLIENTS);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])
    if (loading) return null;

    const { bestClients } = data;
    const clientsGraphic = [];
    bestClients.map((client, index) => {
        clientsGraphic[index] = { ...client.client[0], total: client.total }
    })

    return (
        <Dashboard>

            <ResponsiveContainer className='h-full' height={550} width={"99%"} >
                <BarChart
                    className={"mt-10"}
                    width={600}
                    height={500}
                    data={clientsGraphic}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lastname" f />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />

                </BarChart>
            </ResponsiveContainer>


        </Dashboard>

    );
}
export default BestClients