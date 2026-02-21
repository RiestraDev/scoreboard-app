

function Button({ onClick, label, variant = "default" }) {

    return (
        <button
            className={`btn ${variant}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;