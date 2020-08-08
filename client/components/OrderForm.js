import React from "react";
import { connect } from "react-redux";

import { auth } from "../store";

const OrderForm = (props) => {
  return (
    <div>
      {/* <h1>{formDisplayName}</h1> */}
      <form className="order-form" name="order">
        <label>
          Ticker
          <input type="text" name="ticker" required />
        </label>
        <label>
          Quantity
          <input type="number" name="quantity" required />
        </label>
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     authFormName: "signup",
//     formDisplayName: "Sign Up",
//     error: state.user.error,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleSubmit(event) {
//       event.preventDefault;
//       const authFormName = event.target.name;
//       const email = event.target.email.value;
//       const password = event.target.password.value;
//       authFormName === "signup"
//         ? dispatch(
//             auth(
//               email,
//               password,
//               authFormName,
//               event.target.firstName.value,
//               event.target.lastName.value
//             )
//           )
//         : dispatch(auth(email, password, authFormName));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);

export default OrderForm;
