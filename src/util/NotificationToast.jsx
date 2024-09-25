import { CToast, CToastBody, CToastClose } from "@coreui/react";

// Original Format used on the Page
// function exampleToast(color, message) {
//   return (
//     <CToast
//       autohide={true}
//       visible={true}
//       className="text-white align-items-center"
//       color={`${color}`}
//       delay={5000}
//     >
//       <div className="d-flex">
//         <CToastBody className="fs-4 p-4">{`${message}`}</CToastBody>
//         <CToastClose className="me-2 m-auto" white />
//       </div>
//     </CToast>
//   );
// }

function NotificationToast({ color, message }) {
  return (
    <CToast
      autohide={true}
      visible={true}
      className="text-white align-items-center"
      color={`${color}`}
      delay={5000}
    >
      <div className="d-flex">
        <CToastBody className="fs-4 p-4">{`${message}`}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  );
}

export default NotificationToast;
