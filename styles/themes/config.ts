import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";

export const get_config = [
  {
    theme: 1,
    header: 1,
    mobile_navbar: 1,
    primary_color: "#0a273e",
    secondary_color: "#01111d",
    bg_input_pin: "#001625",
    card_item_game_type: "blur",
    card_togel_divive_x_color: "rgb(44,81,106)",
    card_togel_border_y_color: "rgb(44,81,106)",
  },
  {
    theme: 2,
    header: 2,
    mobile_navbar: 2,
    primary_color: "#FF3D57",
    secondary_color: "#2D3035",
    color3: "#1C1E22",
    color4: "#24262B",
    input_border: "#FF3D57",
    bg_input_pin: "#1C1E22",
    card_item_game_type: "blur",
    marquee_blur: "[23, 64, 82]",
    card_togel_divive_x_color: "rgba(185,214,255,0.1)",
    card_togel_border_y_color: "rgba(185,214,255,0.1)",
  },
  {
    theme: 3,
    header: 3,
    mobile_navbar: 3,
    primary_color: "#FF3D57",
    secondary_color: "#2D3035",
    color3: "#1C1E22",
    color4: "#24262B",
    input_border: "#FF3D57",
    bg_input_pin: "#1C1E22",
    card_item_game_type: "blur",
    marquee_blur: "[39, 31, 49]",
    card_togel_divive_x_color: "rgba(185,214,255,0.1)",
    card_togel_border_y_color: "rgba(185,214,255,0.1)",
  },
  {
    theme: 4,
    header: 4,
    mobile_navbar: 3,
    primary_color: "#0a273e",
    secondary_color: "#01111d",
    bg_input_pin: "#001625",
    card_item_game_type: "blur",
    card_togel_divive_x_color: "#2c516a",
    card_togel_border_y_color: "#2c516a",
    banner: [
      {
        url: "/images/theme/4/banner/a.png",
      },
      {
        url: "/images/theme/4/banner/b.png",
      },
      {
        url: "/images/theme/4/banner/c.png",
      },
    ],
  },
];

export const theme_config = (template:number) => {
  return get_config.find((item) => item.theme == template);
};
