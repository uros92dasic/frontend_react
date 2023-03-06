import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/product";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(()=>{
        (
            async () => {
                const {data} = await axios.get(`products?page=${page}`);

                // console.log(data);
                setProducts(data.data);
                setLastPage(data.meta.lastPage);
            }
        )();
    }, [page]);

    const handleDelete = async (id: number) => {
        if(window.confirm("Are you sure you want to delete this record?")){
            await axios.delete(`/products/${id}`);
        }

        setProducts(products.filter((p: Product) => p.id !== id));
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/products/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Product)=>{
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img alt={`product-${product.id}`} src={product.image} width="50"/></td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/products/${product.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(product.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                </table>
            </div>

            <Paginator page={page} lastPage={lastPage} pageChanged={page => setPage(page)}/>
        </Wrapper>
    );
}

export default Products;