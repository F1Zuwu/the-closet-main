module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
    ],
    theme: {
        extend: {
            margin: {
                320: '320px',
            },
            width: {
                190: '190px',
                275: '275px',
                300: '300px',
                340: '340px',
                350: '350px',
                656: '656px',
                880: '880px',
                508: '508px',
            },
            height: {
                80: '80px',
                340: '340px',
                370: '370px',
                420: '420px',
                510: '510px',
                600: '600px',
                685: '685px',
                800: '800px',
                '90vh': '90vh',
            },
            flex: {
                0.7: '0.7 1 0%',
            },
            maxHeight: {
                370: '370px',
            },
            minWidth: {
                210: '210px',
                350: '350px',
                620: '620px',
            },
            textColor: {
                primary: '#352F2C',
                UnSelPrimary: '#555555',
            },
            backgroundColor: {
                backgroundColor: '#F5EBE0',
                TagsBackground: '#E3D5CA',
                btnOnTagsBg: '#e8dcd3',
                FooterColor: '#D6CCC2',
                lightBtn: '#f0e4da'
            },
            outlineColor: {},
            borderColor: {},
            keyframes: {
                'slide-in': {
                    '0%': {
                        '-webkit-transform': 'translateX(-200px)',
                        transform: 'translateX(-200px)',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0px)',
                        transform: 'translateX(0px)',
                    },
                },

                'slide-fwd': {
                    '0%': {
                        '-webkit-transform': 'translateZ(0px)',
                        transform: 'translateZ(0px)',
                    },
                    '100%': {
                        '-webkit-transform': 'translateZ(160px)',
                        transform: 'translateZ(160px)',
                    },
                },
            },
            animation: {
                'slide-in': 'slide-in 0.5s ease-out',
                'slide-fwd': ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
            },
            transitionProperty: {
                height: 'height',
            },
        },
        cursor: {
            'zoom-in': 'zoom-in',
            pointer: 'pointer',
        },
    },
    variants: {
        // backgroundColor: ['active'],
        extend: {},
    },
    plugins: [],
};