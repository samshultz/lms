import { createSlice } from "@reduxjs/toolkit";


export const layoutSlice = createSlice({
    name: "layout",
    initialState: {
        mobileNavOpened: false, 
        sidebarOpened: true, 
        subMenuToShow: "",
        activeMenu: ""
    },
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
        },
        toggleSubmenu: (state, { payload }) => {
            if(state.subMenuToShow === payload){
                state.subMenuToShow = ""
            } else {
                state.subMenuToShow = payload
            }
        },
        highlightActiveMenu: (state, { payload }) => {
            state.activeMenu = payload
        }
    }
})

export  const { 
    toggleMobileNav, 
    toggleSidebar, 
    toggleSubmenu, 
    highlightActiveMenu
} = layoutSlice.actions
export default layoutSlice.reducer