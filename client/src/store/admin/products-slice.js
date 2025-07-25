import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
const initialState ={
    isLoading : false,
    productList: []
}

export const addNewProduct = createAsyncThunk("/products/addnewproduct", async(formData)=>{
    const result =await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData,{
        headers:{
            'Content-Type': 'application/json',
        }
    }
      
    )
    return result?.data;
})
export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts", async()=>{
    const result =await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`,{
       
    }
      
    )
    return result?.data;
})
export const EditProduct = createAsyncThunk("/products/edit", async({id,formData})=>{
    const result =await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData,{
        headers:{
            'Content-Type': 'application/json',
        }
    }
      
    )
    return result?.data;
})
export const DeleteProduct = createAsyncThunk("/products/delete", async(id)=>{
    const result =await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
      
    )
    return result?.data;
})

const AdminProductSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.isLoading = true;

        }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
            
            state.isLoading = false;
            state.productList = action.payload;
        }).addCase(fetchAllProducts.rejected,(state,action)=>{
            
            state.isLoading = false;
            state.productList = [];
        })
    }
})

export default AdminProductSlice.reducer;