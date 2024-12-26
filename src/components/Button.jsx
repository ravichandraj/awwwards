
const Button = ({title, id, leftIcon, rightIcon, containerClass , redirect}) => {

    const handleRedirect = () => {
        if (redirect) {
            window.open(redirect, '_blank');
        }
    }

    return (
        <button id={id}
                onClick={handleRedirect}
                className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black transition-colors duration-500 ease-in-out hover:bg-yellow-300 ${containerClass}`}>
            {leftIcon}
            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                <div>{title}</div>
            </span>

            {rightIcon}
        </button>
    );
};

export default Button;