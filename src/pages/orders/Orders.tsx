import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import Paginator from "../../components/Paginator";
import axios from 'axios';
import {Order} from "../../models/order";
import {OrderItem} from "../../models/orderItem";

const hide = {
    maxHeight: 0,
    transition: '250ms ease-in'
}

const show = {
    maxHeight: '150px',
    transition: '250ms ease-out'
}

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`orders?page=${page}`);

                setOrders(data.data);
                setLastPage(data.meta.lastPage);
            }
        )();
    }, [page]);

    const handleSelect = (id: number) => {
        setSelected(selected !== id ? id : 0);
    }

    const handleExport = async () => {
        // const {data} = await axios.post('export', {}, {responseType: 'blob'});
        // const blob = new Blob([data], {type: 'text/csv'});
        // const url = window.URL.createObjectURL(data);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'orders.csv';
        // link.click();
        console.log("Export file...");
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <button className="btn btn-sm btn-outline-secondary" onClick={handleExport}>Export</button>
            </div>

            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                    <tr key={(Math.floor(Math.random() * 1000))}>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order: Order) => {
                        return (
                            <React.Fragment key={order.id}>
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.total}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-secondary"
                                           onClick={() => handleSelect(order.id)}
                                        >View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5}>
                                        <div className="overflow-hidden" style={selected === order.id ? show : hide}>
                                            <table className="table table-sm">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product Title</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order.orderItems.map((oItem: OrderItem) => {
                                                    return (
                                                        <tr key={oItem.id}>
                                                            <td>{oItem.id}</td>
                                                            <td>{oItem.productTitle}</td>
                                                            <td>{oItem.quantity}</td>
                                                            <td>{oItem.price}</td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
        </Wrapper>
    );
};

export default Orders;