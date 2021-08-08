import axios from "axios";
import Swal from "sweetalert2";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/users/login",
      data: {
        email,
        password,
      },
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Uğurla daxil olundu",
      showConfirmButton: false,
      timer: 2500,
    });
    window.setTimeout(() => {
      location.assign("/manageMessages");
    }, 1500);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Xəta",
      text: "Email və ya şifrə səhvdir",
    });

    window.setTimeout(() => {
      location.assign("/login");
    }, 1500);
  }
};
