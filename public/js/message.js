import axios from "axios";
import Swal from "sweetalert2";

export const sendMessage = async (name, email, message) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/message/sendMessage",
      data: {
        name,
        email,
        message,
      },
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Xəta",
      text: "Xəta baş verdi.Yenidən cəhd edin!",
    });
  }
};
export const deleteMessage = async id => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/message/${id}`,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Uğurla silindi!",
      showConfirmButton: false,
      timer: 2500,
    }).then(
      window.setTimeout(() => {
        location.assign("/manageMessages");
      }, 1200)
    );
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Xəta",
      text: "Xəta baş verdi.Yenidən cəhd edin!",
    });
  }
};
