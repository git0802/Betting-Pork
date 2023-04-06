module.exports = {
  mode: "jit",
  important: true,
  content: [
    "./pages/**/*.{htmljs,js,ts,jsx,tsx}",
    "./components/**/*.{htmljs,js,ts,jsx,tsx}",
    "./**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackDefault: {
          100: "#1C1702",
        },
        whiteDefault: {
          100: "#D3F2FF",
          80: "rgba(211,242,255,0.8)",
          70: "rgba(211,242,255,0.7)",
          60: "#D3F2FF99",
          50: "#D3F2FF80",
          40: "#D3F2FF66",
          20: "#D3F2FF33",
          15: "rgba(255,255,255,0.15)",
          10: "rgba(211,242,255,0.1)",
          5: "rgba(211,242,255,0.05)",
        },
        success: "#21D980",
        failed: "#FF5C5F",
        disturbance: "#CA8C04",
        grayDefault: {
          100: "#E1EDFF",
          60: "rgba(225, 237, 255, 0.6)",
          50: "rgba(225, 237, 255, 0.5)",
        },
        CadetGrey: {
          100: "#899EB3",
        },
        waterDefault: {
          100: "#DCECFF",
          50: "rgba(220, 236, 255, 0.5)",
          26: "rgba(220, 236, 255, 0.26)",
          20: "rgba(220, 236, 255, 0.2)",
          16: "rgba(220, 236, 255, 0.16)",
          14: "rgba(220, 236, 255, 0.14)",
          5: "rgba(220, 236, 255, 0.05)",
        },
        blueDefault: {
          100: "#22374E",
          45: "rgba(34, 55, 78, 0.45)",
        },
        bluePrimary: "#1AA9E7",
        yellowPrimary: "#FFA900",
        primaryContent: "#092E49",
        darkBlue: {
          100: "#0D2538",
        },

        lightBlue: {
          100: "#2D4C64",
        },
        maastrichtBlue: {
          100: "#04202D",
        },
        inputColor: {
          100: "#001625",
        },
        nileBlue: {
          100: "#153853",
        },
        borderDefault: {
          100: "#2C516A",
        },
        borderHover: {
          100: "#0099ff",
        },
        backgroundDefault: {
          100: "#0B2C44",
        },
        bgPrimary: {
          100: "#0C2D46",
        },
        bgMobile: "#07243a8e",
        rupiah: "#466379",
        divideStyle: "#4a71a06e",
        success: "#21D980",
        onProcess: "#FFA800",
        failed: "#FF5C5F",
      },
      aspectRatio: {
        "3/4": "3 / 4",
        "165/151": "165 / 151",
        "165/195": "165 / 195",
        "123/165": "123 / 165",
        "225/206": "225 / 206",
        "225/168": "225 / 168",
        "225/266": "225 / 266",
        "468/168": "468 / 168",
      },
      animation: {
        transationNormal: "transition duration-200 ease-in-out",
        transationAll: "transition-all duration-200 ease-in-out",
        marquee: "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
        wiggle: "wiggle 200ms ease-in-out",
        spincostume: "spincostume 1s ease-in-out",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        spincostume: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      borderRadius: {
        10: "10px",
      },
      dropShadow: {
        image: '0px 4px 6px rgba(0,0,0,0.25)'
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1064px",
      xl: "1320px",
      "2xl": "1480px",
    },
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1064px",
        xl: "1320px",
        "2xl": "1480px",
      },
      padding: {
        DEFAULT: '0px',
        sm: '10px',
        lg: '20px',
        xl: '20px',
        "2xl": "20px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    fontFamily: true,
  },
};
