const Avatar = ({ icon, className, style, onClick }) => {
    return (
        <div className={`avatar ${className || ''}`} style={style || {}} onClick={onClick}>
            {icon}
        </div>
    )
}

export default Avatar