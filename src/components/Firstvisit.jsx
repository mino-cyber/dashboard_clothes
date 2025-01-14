import React, { useEffect, useState } from 'react'
import "./hidden.css"
import * as main_category from '../api/product_category'
import * as sub_category from '../api/subcategory'
import * as product from '../api/product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Firstvisit() {
    const [categories, setCategories] = useState([])
    const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

    const [subCategories, setSubCategories] = useState([])
    const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");

    const [products, setProducts] = useState([])

    const handleSelectCategory = (event) => {
        setSelectedCategoryValue(event.target.value);
        getSubCategory(event.target.value)
    };

    const handleSelectSuCategory = (event) => {
        setSelectedSubCategoryValue(event.target.value);
        getProducts(event.target.value)
    };

    useEffect(() => {
        const getCategory = async () => {
            await main_category.all_product_category().then(e => {
                setCategories(e.response)
                setSelectedCategoryValue(e.response[0]._id)
                getSubCategory(e.response[0]._id)
            })
        }
        getCategory()
    }, [])

    const getSubCategory = async (id) => {
        await sub_category.all_sub_category(id).then(e => {
            setSubCategories(e.response)
            if (e.response.length !== 0) {
                setSelectedSubCategoryValue(e.response[0]._id)
                getProducts(e.response[0]._id)
            } else {
                setProducts([])
            }
        })
    }

    const getProducts = async (id) => {
        await product.get_product_by_category(id).then(e => {
            setProducts(e.response)
            console.log(e.response)
        })
    }
  return (
    <div>
            <div className='hidden bg-light mx-5 '>
                <h1 className='col-12 ' style={{ borderBottom: "1px solid gray", textAlign: "center" }} >First visit products</h1>

                <form className='col-12  m-2'>
                    <div
                        className="d-flex flex-wrap "
                    >
                        <div className="col-12 m-2 ">
                            <label className="w-50" htmlFor="description">
                                Category
                            </label>
                            <select
                                value={selectedCategoryValue}
                                style={{ width: "50%" }}
                                onChange={handleSelectCategory}
                            >
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id} >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 m-2 ">
                            <label className="w-50" htmlFor="description">
                                Sub category
                            </label>
                            <select
                                value={selectedSubCategoryValue}
                                style={{ width: "50%" }}
                                onChange={handleSelectSuCategory}
                            >
                                {subCategories.map((subCategory) => (
                                    <option key={subCategory._id} value={subCategory._id} >
                                        {subCategory.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>index</th>
                                    <th>Name</th>
                                    <th>selection</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product1, index) => (
                                    <FirstProduct key={index} index={index + 1} product={product1} />
                                ))}
                                
                            </tbody>
                        </table>
                        
                    </div>
                </form>
                <div className='w-100 m-5 d-flex justify-content-center' >
                    <button className='btn w-50 btn-outline-secondary' 
                    // onClick={}
                    >add as First visit </button>
                </div>
            </div>
            </div>
    )
}



function FirstProduct(props) {

    const [visited, setvisited] = useState(false)
    const first = async (id) => {
        // await product.update_visited_product(id, !visited).then(res => {
          
        //     setvisited(!visited)
          
        //     if (visited ===true){
        //         toast.error("The product is hidden ", {
        //             position: toast.POSITION.TOP_RIGHT
        //           }) 
               
        //     }else{
        //         toast.success("The product is visiteded ", {
        //             position: toast.POSITION.TOP_RIGHT
        //           }) 
        //     }
        // })
    }

    return (
        <tr>
            <td>{props.index}</td>
            <td>{props.product.name}</td>
            <td><input type="checkbox" checked={visited} onChange={() => { first(props.product._id)  }} style={{ height: "18px", width: "18px" }} /></td>
         <ToastContainer />
        </tr>
       
    )
}

export { FirstProduct }
