/* eslint-disable react/prop-types */
function ContactSVG({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_11_177)">
                <path
                    d="M15 25H0V20.625C0 17.625 1.625 15 4 13.625C3.125 12.75 2.5 11.5 2.5 10.125C2.5 7.375 4.75 5.125 7.5 5.125C10.25 5.125 12.5 7.375 12.5 10.125C12.5 11.5 12 12.75 11 13.625C13.375 15 15 17.75 15 20.625V25ZM2.5 22.5H12.5V20.625C12.5 17.625 10.25 15 7.5 15C4.875 15 2.5 17.625 2.5 20.625V22.5ZM7.5 7.5C6.125 7.5 5 8.625 5 10C5 11.375 6.125 12.5 7.5 12.5C8.875 12.5 10 11.375 10 10C10 8.625 8.875 7.5 7.5 7.5ZM30 21.25H17.5V18.75H30V21.25ZM26.25 16.25H17.5V13.75H26.25V16.25ZM30 11.25H17.5V8.75H30V11.25Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_11_177">
                    <rect width="30" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default ContactSVG;
