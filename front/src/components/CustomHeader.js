import { useState } from "react"
import Avatar from "./Avatar"
import { getUserData } from "../router/auth";
import Popover from '@mui/material/Popover'
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { configs } from "../config/configs";

const CustomHeader = (props) => {
    const userData = getUserData();

    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
  
    const [anchorEl, setAnchorEl] = useState(null)
  
    const handleClick = (e) => setAnchorEl(e.currentTarget)
  
    const handleClose = () => setAnchorEl(null)
  
    const open = Boolean(anchorEl)
    const id = open ? 'user-menu-popover' : undefined
  
    const handleLogout = () => {
        dispatch(logout())
    }

    const handleResetPassword = () => {
        navigate("/redefinir-senha")
    }

    const authRoutes = ['/login', '/registrar']
    const isAuthRoute = authRoutes.includes(location.pathname)
    
    return (
        <>
            {!isAuthRoute && (
                <header>
                    <div className="title-header-container">
                        <img src={configs.appIcon} alt="Users" width={30}/>
                        <span>{configs.appName}</span>
                    </div>
                    <div>
                        <Avatar
                            icon={userData?.name?.charAt(0)}
                            className="user-avatar"
                            onClick={handleClick}
                        /> 
                        {anchorEl && (
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'  
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                style={{ left: '20px'}}
                            >
                                <Button style={{textTransform: 'capitalize'}} size='sm' color='flat-primary' onClick={e => handleResetPassword()}>
                                    <i>Alterar senha</i>
                                </Button>
                                <Button style={{textTransform: 'capitalize'}} size='sm' color='flat-primary' onClick={handleLogout}>
                                    <i>Sair</i>
                                </Button>
                            </Popover>
                        )}
                    </div>
                </header>
            )}
        </>
    )
}

export default CustomHeader
  