import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ userID, empID }) => {
  const combinedValue = `${userID}/${empID}`;

  return <QRCode value={combinedValue} />;
};

export default QRCodeGenerator;
