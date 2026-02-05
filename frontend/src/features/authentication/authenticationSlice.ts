import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_NAME } from "../../constants";


const initialState = {
    loading:false,
    user:null,
    token:localStorage.getItem(TOKEN_NAME),
    error:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

    }
})



export default authSlice.reducer