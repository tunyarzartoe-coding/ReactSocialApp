import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, getUserError, getUserStatus, getAllUsers } from './userSlice';
import $ from 'jquery';
// import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';

const UserTable = () => {
    const dispatch = useDispatch();
    const status = useSelector(getUserStatus);
    const error = useSelector(getUserError);
    const users = useSelector(fetchAllUsers);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllUsers());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (status === 'success') {
            $('#userTable').DataTable();
        }
    }, [users, status]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'fail') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container text-white user-table mt-1 p-3 table-responsive">
            <h4>User List</h4>
            <table id="userTable" className="display text-white">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.website}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
