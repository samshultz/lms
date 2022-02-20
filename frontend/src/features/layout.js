import { createSlice } from "@reduxjs/toolkit";


export const layoutSlice = createSlice({
    name: "layout",
    initialState: { mobileNavOpened: false, sidebarOpened: true },
    reducers: {
        toggleMobileNav: (state, action) => {
            state.mobileNavOpened = action.payload
            if(action.payload) {
                console.log(action.payload)
                state.sidebarOpened = true
            }
        },
        toggleSidebar: (state, action) => {
            state.sidebarOpened = action.payload
        }
    }
})

export  const { toggleMobileNav, toggleSidebar } = layoutSlice.actions
export default layoutSlice.reducer