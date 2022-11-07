/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                main: '#A18A68',
                my_darkGray: '#707070',
                my_gray: '#D8D8D8',
                my_lightGray: '#EFEFEF',
                my_errors: '#D82700',
            },
            fontSize: {
                h1: [
                    '33px',
                    {
                        fontWeight: '500',
                    },
                ],
                h2: [
                    '26px',
                    {
                        fontWeight: '400',
                        lineHeight: '35px',
                    },
                ],
                h3: [
                    '20px',
                    {
                        fontWeight: '400',
                        lineHeight: '26px',
                    },
                ],
                h4: [
                    '20px',
                    {
                        fontWeight: '500',
                        lineHeight: '20px',
                    },
                ],
                h5: [
                    '16px',
                    {
                        fontWeight: '400',
                        lineHeight: '16px',
                        // letterSpacing: '10px',
                    },
                ],
                Bl: [
                    '16px',
                    {
                        fontWeight: '700',
                    },
                ],
                Bm: [
                    '14px',
                    {
                        fontWeight: '400',
                    },
                ],
                Bs: [
                    '12px',
                    {
                        fontWeight: '400',
                        lineHeight: '20px',
                        letterSpacing: '10px',
                    },
                ],
            },
        },
    },
    plugins: [],
};
