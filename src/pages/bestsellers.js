
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import { BEST_SELLERS } from '../graphql/queries/admin.queries';



const Bestsellers = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_SELLERS);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])
    if (loading) return null;

    const { bestSellers } = data;
    const sellerGraphic = [];
    bestSellers.map((seller, index) => {
        sellerGraphic[index] = { ...seller.seller[0], total: seller.total }
    })
    return (
        <Layout>

            <ResponsiveContainer className='h-full' height={550} width={"99%"} >
                <BarChart
                    className={"mt-10"}
                    width={600}
                    height={500}
                    data={sellerGraphic}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />

                </BarChart>
            </ResponsiveContainer>


        </Layout>

    );
}
export default Bestsellers