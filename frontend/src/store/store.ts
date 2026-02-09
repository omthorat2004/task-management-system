import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authentication/authenticationSlice'
import taskReducer from '../features/task/taskSlice'
export const store  = configureStore({
    reducer:{
        auth:authReducer,
        task:taskReducer
    }
})


export type  RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




