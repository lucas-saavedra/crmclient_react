import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { GET_USER } from "../../graphql/queries/user.queries";
import { UserContext } from "./userContext";


const UserProvider = ({ children }) => {
    const { data, loading, error, startPolling, stopPolling } = useQuery(GET_USER, { fetchPolicy: 'network-only' });

    useEffect(() => {
        startPolling(1000)

        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])
    if (loading) {
        return <Loading />
    }
    const { getUser } = data;

    return (
        <UserContext.Provider
            value={{ user: getUser }}
        >
            {children}
        </UserContext.Provider >
    )
}
export default UserProvider




